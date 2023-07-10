import { useEffect } from "react"
import { UsePostType, usePost } from "../store/post";
import { getPosts } from "../apis/post";
import { useRoomInfo, useRoomInfoType } from "../store/room";
import { getRoomsInfo } from "../apis/room";
import { UseUserType, useUserInfo } from "../store/userInfo";


export const InitData = () => {
    
    const {posts, setPosts} = usePost<UsePostType>(setPosts => setPosts);
    const {roomInfo, setRoomInfo} = useRoomInfo<useRoomInfoType>(setRoomInfo => setRoomInfo);
    const {userInfo, setUserInfo} = useUserInfo<UseUserType>(setUserInfo => setUserInfo);

    const fetchPostData = async (lastPostId: number) => {
        const _posts = await getPosts(lastPostId)

        if(_posts.length === 0) {
            console.log("더 이상 포스트가 없습니다.");
            return;
        }

        setPosts([..._posts, ...posts])
        console.log("fetchPostData", _posts);
    }

    const fetchRoomData = async (idList: number[]) => {
        const _rooms = await getRoomsInfo(idList)
        setRoomInfo(_rooms)
        console.log("fetchRoomData", _rooms);
    }

    useEffect(() => {

        console.log("roomInfo:", roomInfo);    
        fetchRoomData(userInfo.room)

    }, [userInfo.room])

    useEffect(() => {
        if (posts.length < 4) {

            console.log("포스트 재 충전!");
            
            const lastPostId = posts[posts.length - 1]?._id || 0
            fetchPostData(lastPostId)
        }
    }, [posts])

    return null
}