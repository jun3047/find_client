export type AlamrUserType = {
    _id: number,
    nickname: string,
    school: string,
    major: string,
    grade: number,
}

export type AlarmType = {
    _id: number,
    userInfo: AlamrUserType
    question: string,
    date: Date,
}