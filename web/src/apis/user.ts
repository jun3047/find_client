import { postAPI } from "./useAPI"

export const getUserInfo = async (userId: number, field?: object) => {

    if(field === undefined) field = {
        _id: 1,
        nickname: 1,
        phone: 1,
        school: 1,
        major: 1,
        grade: 1,
        post: 1,
        room: 1,
        pass_count: 1,
        find_count: 1,
        warn_count: 1,
        pass_post: 1,
        find_post: 1,
        warn_post: 1,
        alarm: 1,
    }

    const res = await postAPI('userInfo', {userId: userId, field: field})

    return res
}

export const registerUser = async (userInfo: object) => {
    const res = await postAPI('register', {userInfo: userInfo})

    return res
}

