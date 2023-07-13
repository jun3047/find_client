import { io } from "socket.io-client";
import { postAPI } from "./useAPI";
import { ChatType } from "../types/room.type";
import { AlamrUserType, AlarmType } from "../types/alarm.type";
import { SimpleUserType } from "../types/user.type";
import { PostType } from "../types/post.type";

export const server_url: string = process.env.REACT_APP_HOST || "";

console.log("server_url:", server_url);
export const socket = io(server_url);
  
interface socketListenerProps {
    pushChatInfoById: (roomId: number, chat: ChatType) => void,
    setQuestion: (question: string) => void,
}


export const socketListener = ({ pushChatInfoById, setQuestion}: socketListenerProps) => {

    socket.on('send_message', ({ roomId, msg, nickname, date }) => {

        console.log('get send message', msg, nickname, date);

        const newChat : ChatType = {msg: msg, nickname: nickname, date: date};
        
        pushChatInfoById(roomId, newChat);
    });
    
    socket.on('send_question', ({ roomId, question }) => {
        console.log('send_question', question);
        
        setQuestion(question);
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
        setTimeout(() => {
            socket.connect();
        }, 5000);
    });
}

interface socketAlarmListenerProps {
    setAlarms?: (chats: AlarmType[]) => void,
    alarms?: AlarmType[],
}

export const socketAlarmListener = ({ setAlarms, alarms}: socketAlarmListenerProps) => {

    socket.on('send_alarm', ({ userInfo, _id, question, date }) => {
        console.log('send_alarm from', userInfo.nickname, 'to me question:', question, 'date:', date, '_id:', _id);

        const newAlarm: AlarmType = {
            userInfo: userInfo,
            question: question,
            _id: 0,
            date: new Date()
        }

        if(setAlarms && alarms) setAlarms([...alarms, newAlarm]);
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
    console.log("send to server");
    socket.emit('send_message', { roomId: roomId, msg: msg, nickname: nickname });
};

export const sendQuestion = (roomId: number, question: string) => {
    socket.emit('send_question', { roomId: roomId, question: question });
};

export const sendAlarm = (
    userInfo: AlamrUserType,
    otherUserInfo: SimpleUserType,
    postInfo: PostType,
    expression: string
    ) => {

    console.log('sendAlarm to', otherUserInfo.nickname, 'from', userInfo.nickname, 'postInfo:', postInfo, 'expression:', expression);

    socket.emit(
        'send_alarm',
        {
            userInfo: userInfo,
            otherUserInfo: otherUserInfo, 
            postInfo: postInfo,
            expression: expression,
        });
};