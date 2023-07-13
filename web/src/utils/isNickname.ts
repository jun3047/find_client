export const isNickname = (nickname: string) => {
    const nicknameReg = /^[가-힣a-zA-Z0-9^-\_\.]{2,10}$/;
    return nicknameReg.test(nickname);
}