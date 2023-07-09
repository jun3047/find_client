import { QueryFunction } from "react-query";
import { postAPI } from "../hooks/useAPI";
import { PostType, PostUserType } from "../types/post.type";


  
export const writePost = async ({userInfo, content, question}:{
    userInfo: PostUserType,
    content: string,
    question: string
}) => {
    const res = await postAPI('writePost', {userInfo: userInfo, content: content, question: question});
    console.log(res)
}



export const getPosts = async (last_postId?: number) => {

    last_postId = last_postId ?? 0;
    
    const res = await postAPI('posts', { last_postId: last_postId });

    console.log(res);
    return res;
};

export const getPostsById = async (postIds: number[]) => {
    const res = await postAPI('posts_by_ids', { postIds: postIds });
    console.log(res);
    return res;
  };