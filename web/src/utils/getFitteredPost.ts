import { PostType } from "../types/post.type";

export const getFilteredPost = (EntirePost: PostType[], blockPosts: number[]) => {
    const filteredPost = EntirePost.filter((post) => {
        return !blockPosts.includes(post._id);
    });
    return filteredPost;
}