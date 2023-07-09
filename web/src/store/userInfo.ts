import {create} from 'zustand'
import { UserType } from '../types/user.type';



const userInfo = {
    _id: 1,
    nickname: "닉네임",
    phone: "번호임",
    school: "학교임",
    major: "전공임",
    grade: 22,
    post: [],
    pass_count: 0,
    find_count: 0,
    warn_count: 0,
    pass_post: [],
    find_post: [],
    warn_post: [],
    alarm: []
}

export type Status = {
    userInfo: object
};

export type Actions = {
    setUserInfo: (userInfo: UserType) => void;
};

export type UseUserType = Status & Actions;

export const useUserInfo = create<UseUserType> ((set) => ({
    userInfo: userInfo,
    setUserInfo: (userInfo: UserType) => {
        set((userInfo) => ({
            userInfo: userInfo,
        }))
        console.log("userInfo:", userInfo);
    },
}));