import { useEffect } from "react"
import { UsePostType, usePost } from "../store/post";
import { getPosts } from "../apis/post";
import { useRoomInfo, UseRoomInfoType } from "../store/room";
import { getRoomsInfo } from "../apis/room";
import { UseUserType, useUserInfo } from "../store/userInfo";
import { socket, socketAlarmListener, socketListener } from "../apis/socket";
import { useLocation } from "react-router";
import { useAlarms } from "../store/alarm";
import { useQuestion } from "../store/question";
import { getUserInfo } from "../apis/user";
import { getFilteredPost } from "../utils/getFitteredPost";
import { PostType } from "../types/post.type";


export const InitData = () => {
    
    const {posts, setPosts} = usePost<UsePostType>(setPosts => setPosts);
    const {setRoomInfo, pushChatInfoById} = useRoomInfo<UseRoomInfoType>(setRoomInfo => setRoomInfo);
    const {userInfo, setUserInfo} = useUserInfo<UseUserType>(setUserInfo => setUserInfo);
    const {alarms, setAlarms} = useAlarms(setAlarms => setAlarms);
    const {setQuestion} = useQuestion(setQuestion => setQuestion);
    
    const location = useLocation();
    let isInit = false;

    useEffect(()=>{

        if(isInit) return

        console.log('Turn on Listener');
        isInit = true;
        
        socketListener({
            pushChatInfoById: pushChatInfoById,
            setQuestion: setQuestion
        });

        socketAlarmListener({
            setAlarms: setAlarms,
            alarms: alarms,
        });

        setAlarms(userInfo.alarm)
        
        socket.emit('join_room', {roomId: userInfo.nickname})

        userInfo?.room?.map(roomId => socket.emit('join_room', {roomId: roomId}))
    }, [])
    
    useEffect(() => {fetchRoomData(userInfo.room)}, [userInfo.room])
    useEffect(() => {setAlarmInUserInfo()}, [alarms])
    

    useEffect(() => {
        location.pathname === "/home" && fetchPostData()
        location.pathname === "/chat" && updateUserRoomInfo()
    }, [location.pathname])

    const updateUserRoomInfo = async () => {
        const userRoomInfo = await getUserInfo(userInfo._id, {room: 1})
        
        setUserInfo({
            ...userInfo,
            room: userRoomInfo.room
        })
    }

    const setAlarmInUserInfo = () => {
        setUserInfo({
            ...userInfo,
            alarm: alarms
        })
    }

    const fetchPostData = async () => {

        if (posts.length > 1) return;
        
        const lastPostId = posts[posts.length - 1]?._id || 0
        const _posts = await getPosts(lastPostId)
        const filteredPost = getFilterPosts(_posts)

        if(_posts.length === 0) {
            console.log("더 이상 포스트가 없습니다.");
            return;
        }

        setPosts([...filteredPost, ...posts])
    }

    const getFilterPosts = (_posts: PostType[]) => {
        const filterPosts = [...userInfo.find_post, ...userInfo.post]
        return getFilteredPost(_posts, filterPosts)
    }


    const fetchRoomData = async (idList: number[]) => {
        const _rooms = await getRoomsInfo(idList)
        setRoomInfo(_rooms)
        idList.map(roomId => socket.emit('join_room', {roomId: roomId}))
    }

    return null
}