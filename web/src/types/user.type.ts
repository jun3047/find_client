import { AlarmType } from "./alarm.type";

export type SimpleUserType = {
    _id: number,
    nickname: string
}

export type UserType = {
    _id: number;
    nickname: string;
    phone: string;
    school: string;
    major: string;
    grade: number;
    post: number[];
    room: number[];
    pass_count: number;
    find_count: number;
    warn_count: number;
    pass_post: number[]
    find_post: number[]
    warn_post: number[]
    alarm: AlarmType[]
}