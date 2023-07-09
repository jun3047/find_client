import { SimpleUserType } from "./user.type"


type ChatType = {
    msg: string,
    nickname: string
    date: Date
}

export type RoomType = {
    _id: number
    chats: ChatType[]
    members: SimpleUserType[]
}