import { postAPI } from "./useAPI"

export const getRoomsInfo = async (roomIdList: number[]) => {
    const res = await postAPI('rooms', {roomIdList: roomIdList})

    return res
}

export type RoomUserInfo = {
    _id: number,
    nickname: string,
}

export const makeRoom = async (users: RoomUserInfo[]) => {
    const res = await postAPI('makeRoom', {users: users})
}