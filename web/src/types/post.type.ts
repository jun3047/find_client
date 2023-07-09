export type PostUserType = {
    _id: number,
    nickname: string
}

export type PostType = {
    _id: number,
    userInfo: PostUserType
    content: string,
    question: string,
    date: Date,
    warn: number,
    find: number,
    pass: number,
}