import {create} from 'zustand'
import { UserType } from '../types/user.type';



const userInfo = {
    _id: 1,
    nickname: "겁나긴닉네임",
    phone: "번호임",
    school: "학교임",
    major: "전공임",
    grade: 22,
    post: [1,2,3,4,5],
    pass_count: 0,
    find_count: 20,
    warn_count: 0,
    pass_post: [],
    find_post: [],
    warn_post: [],
    alarm: []
}

export type Status = {
    userInfo: UserType
};

export type Actions = {
    setUserInfo: (userInfo: UserType) => void;
};

export type UseUserType = Status & Actions;

export const useUserInfo = create<UseUserType> ((set) => ({
    userInfo: userInfo,
    setUserInfo: (newUserInfo: UserType) => {
        set((state) => ({
          userInfo: newUserInfo,
        }));
    },
}));