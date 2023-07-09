import { postAPI } from "../hooks/useAPI"

export const getUserInfo = async (userId: number, field: object) => {
    const res = await postAPI('userInfo', {userId: userId, field: field})

    return res
}

export const registerUser = async (userInfo: object) => {
    const res = await postAPI('register', {userInfo: userInfo})

    return res
}

