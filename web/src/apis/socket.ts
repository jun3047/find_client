import { io } from "socket.io-client";
import { postAPI } from "../hooks/useAPI";

export const server_url: string = process.env.REACT_APP_HOST || "";

console.log("server_url:", server_url);
export const socket = io(server_url);


export const socketListenr = () => {
    socket.on('send_message', ({ roomId, msg, nickname, date }) => {
        console.log('send_message');
        console.log(roomId, msg, nickname, date);
    });
    socket.on('send_question', ({ roomId, question }) => {
        console.log('send_question');
        console.log(roomId, question);
    });
    
    socket.on('send_alarm', ({ userInfo, question }) => {
        console.log('send_alarm');
        console.log(userInfo, question);
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
    userInfo: object,
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