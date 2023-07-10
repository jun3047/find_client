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
        setPosts([..._posts])
    }

    const fetchRoomData = async (idList: number[]) => {
        const _rooms = await getRoomsInfo(idList)
        setRoomInfo(_rooms)
    }

    useEffect(() => {

        fetchRoomData(userInfo.room)

        if(posts.length < 20){
            const lastPostId = posts[posts.length - 1]?._id || 0
            fetchPostData(lastPostId)
        }
    }, [])

    return null
}