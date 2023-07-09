import { postAPI } from "../hooks/useAPI"

export const getRoomsInfo = async (roomIdList: number[]) => {
    const res = await postAPI('rooms', {roomIdList: roomIdList})
    
    console.log(res)
}

export const makeRoom = async (users: object[]) => {
    const res = await postAPI('makeRoom', {users: users})
    
    console.log(res)
}