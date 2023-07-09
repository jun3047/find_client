import { postAPI } from "../hooks/useAPI";

export const sendAuthMsg = async (phone: string) => {

    const authCode = await postAPI("sendAuthMsg", {phone: phone})

    console.log(phone, authCode);

    return authCode;
}
