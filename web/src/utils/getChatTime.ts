export const getChatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const amOrPm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 || 12;
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${amOrPm} ${formattedHours}시 ${formattedMinutes}분`;
    return formattedTime;
  }