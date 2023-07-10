import { postAPI } from "./useAPI";

export const sendAuthMsg = async (phone: string) => {

    const {authCode, userInfo} = await postAPI("sendAuthMsg", {phone: phone})
    
    return {authCode: authCode, userInfo: userInfo};
}