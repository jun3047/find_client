import {create} from 'zustand'
import { PostType } from '../types/post.type';


export type Post = {
    posts: PostType[];
};

export type Actions = {
    setPosts: (posts: PostType[]) => void ;
};

export type UsePostType = Post & Actions;


export const usePost = create<UsePostType>()((set) => ({
    posts: [],
    setPosts: (posts) => {
        set((state) => ({
            posts: posts,
        }))
    },
}));