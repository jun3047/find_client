import {create} from 'zustand'


export type Status = {
    status: "login" | "register" | "home" | "chat" | "write" | "alarm" | "my";
};

export type Actions = {
    setStatus: (status: Status) => void ;
};

export type StatusType = Status & Actions;

export const useStatus = create<StatusType> ((set) => ({
    status: 'login',
    setStatus: (status: Status) => set(status),
}));