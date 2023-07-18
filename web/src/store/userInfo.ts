import {create} from 'zustand'
import { UserType } from '../types/user.type';



const userInfo = {
    _id: 0,
    nickname: "",
    phone: "",
    school: "",
    major: "",
    grade: 0,
    post: [],
    room: [],
    pass_count: 0,
    find_count: 0,
    warn_count: 0,
    pass_post: [],
    find_post: [],
    warn_post: [],
    alarm: []
}

export type Status = {
    userInfo: UserType
};

export type setUserInfoType = (userInfo: UserType) => void;

export type Actions = {
    setUserInfo: setUserInfoType
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