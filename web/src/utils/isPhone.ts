export const isPhone = (phone: string) => {
    const phoneReg = /010[0-9]{4}[0-9]{4}/;
    return phoneReg.test(phone);
}