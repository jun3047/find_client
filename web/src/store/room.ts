import {create} from 'zustand'
import { UserType } from '../types/user.type';



const userInfo = {
    _id: 1,
    chats: [],
    members: [],
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