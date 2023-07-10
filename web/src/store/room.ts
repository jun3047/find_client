import {create} from 'zustand'
import { RoomType } from '../types/room.type';



const roomInfo = [{
    _id: 1,
    chats: [],
    members: [],
}]

export type Status = {
    roomInfo: RoomType[]
};

export type Actions = {
    setRoomInfo: (newRoomInfo: RoomType[]) => void;
};

export type useRoomInfoType = Status & Actions;

export const useRoomInfo = create<useRoomInfoType> ((set) => ({
    roomInfo: roomInfo,
    setRoomInfo: (newRoomInfo: RoomType[]) => {
        set((state) => ({
            roomInfo: newRoomInfo,
        }));
    },
}));

// 2. 유저 정보에서 roomList를 불러오고, getRoom으로 roomInfo를 가져옴
// 3. 그렇게 가져온 roomList는 RoomInfo 에 저장
// 4. room 페이지 가면, RoomInfo에서 뿌려주기