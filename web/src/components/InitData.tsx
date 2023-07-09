import { useEffect } from "react"
import { UsePostType, usePost } from "../store/post";
import { getPosts } from "../apis/post";


export const InitData = () => {
    
    const {posts, setPosts} = usePost<UsePostType>(setPosts => setPosts);

    const fetchData = async (lastPostId: number) => {
        const _posts = await getPosts(lastPostId)
        setPosts([..._posts])
    }

    useEffect(() => {
        if(posts.length < 20){
            //첫 업데이트 중
            const lastPostId = posts[posts.length - 1]?._id || 0
            fetchData(lastPostId)
        }
    }, [])

    return null
}