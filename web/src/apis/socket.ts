import { io } from "socket.io-client";
import { postAPI } from "./useAPI";
import { ChatType } from "../types/room.type";
import { AlamrUserType, AlarmType } from "../types/alarm.type";

export const server_url: string = process.env.REACT_APP_HOST || "";

console.log("server_url:", server_url);
export const socket = io(server_url);

interface socketListenerProps {
    setChats: (chats: ChatType[]) => void,
    chats: ChatType[],
}


export const socketListener = ({ setChats, chats}: socketListenerProps) => {

    socket.on('send_message', ({ roomId, msg, nickname, date }) => {

        const newChat : ChatType = {msg: msg, nickname: nickname, date: date};

        setChats([...chats, newChat])

        console.log('send_message');
        console.log(roomId, msg, nickname, date);
    });
    socket.on('send_question', ({ roomId, question }) => {
        console.log('send_question');
        console.log(roomId, question);
    });    
    socket.on('disconnect', () => {
        console.log('disconnect');
        setTimeout(() => {
            socket.connect();
        }, 5000);
    });
}

interface socketAlarmListenerProps {
    setAlarms: (chats: AlarmType[]) => void,
    alarms: AlarmType[],
}

export const socketAlarmListener = ({ setAlarms, alarms}: socketAlarmListenerProps) => {

    socket.on('send_alarm', ({ userInfo, question }) => {
        console.log('send_alarm');
        console.log(userInfo, question);

        const newAlarm: AlarmType = {
            userInfo: userInfo,
            question: question,
            _id: 0,
            date: new Date()
        }

        setAlarms([...alarms, newAlarm]);
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
        setTimeout(() => {
            socket.connect();
        }, 5000);
    });
}




export const joinRoom = (roomId: number | string) => {
    console.log('join_room');
    socket.emit('join_room', {roomId: roomId});
}

export const sendChatBubble = (roomId: number, nickname: string, msg: string) => {
    console.log("sendChatBubble");
    socket.emit('send_message', { roomId: roomId, msg: msg, nickname: nickname });
};

export const sendQuestion = (roomId: number, question: string) => {
    console.log('sendQuestion');
    socket.emit('send_question', { roomId: roomId, question: question });
};

export const sendAlarm = (
    userInfo: AlamrUserType,
    otherUserInfo: object,
    postInfo: object,
    expression: string
    ) => {

    socket.emit(
        'send_alarm',
        {
            userInfo: userInfo,
            otherUserInfo: otherUserInfo, 
            postInfo: postInfo,
            expression: expression,
        });
};