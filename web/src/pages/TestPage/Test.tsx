import styled from "@emotion/styled";
import { postAPI } from "../../hooks/useAPI";
import TinderCard from 'react-tinder-card'

import { io } from 'socket.io-client';
import { useEffect } from "react";
import { Post } from "../../components/Post";
import Advanced from "../../components/SwipeCard/SwipeCard";





    // 예시 데이터

    const userInfo = {
        nickname: "닉네임1",
        _id: 1,
    }

    const otherUserInfo = {
        nickname: "닉네임2",
        _id: 2
    }

    const registerUserInfo = {
        nickname: "닉네임",
        phone: "010-1234-1234",
        school: "학교",
        major: "전공",
        grade: 22
    }

    const roomId = 1;
    const roomIdList = [1,2,3]

    const users = [{_id: 1, nickname: "1닉네임"}, {_id: 2, nickname: "2닉네임"}]


    const posts = [
        {
            _id: 1,
            question: "질문",
            content: "내용",
            warn: 0,
            pass: 0,
            find: 0,
            user: {_id: 1, nickname: "닉네임"}
        },
        {
            _id: 1,
            question: "질문",
            content: "내용",
            warn: 0,
            pass: 0,
            find: 0,
            user: {_id: 1, nickname: "닉네임"}
        },
        {
            _id: 1,
            question: "질문",
            content: "내용",
            warn: 0,
            pass: 0,
            find: 0,
            user: {_id: 1, nickname: "닉네임"}
        },
        {
            _id: 1,
            question: "질문",
            content: "내용",
            warn: 0,
            pass: 0,
            find: 0,
            user: {_id: 1, nickname: "닉네임"}
        },
    ]
    

//소켓 세팅

const server_url: string = process.env.REACT_APP_HOST || "";

console.log("server_url:", server_url);
const socket = io(server_url);

const socketListenr = () => {
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



const joinRoom = (roomId: number | string) => {
    console.log('join_room');
    socket.emit('join_room', {roomId: roomId});
}

const sendChatBubble = (roomId: number, nickname: string, msg: string) => {
    console.log("sendChatBubble");
    socket.emit('send_message', { roomId: roomId, msg: msg, nickname: nickname });
};

const sendQuestion = (roomId: number, question: string) => {
    console.log('sendQuestion');
    socket.emit('send_question', { roomId: roomId, question: question });
};

const sendAlarm = (
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

const sendAuthMsg = async (phone: string) => {

    const res = await postAPI("sendAuthMsg", {phone: phone})

    console.log(res);
}
  
  
export const Test = () => {

    useEffect(() => {

        console.log("useEffect");
        

        socket.on('connect', () => {
            console.log('Connected to the server');
            socketListenr();
          });        
    }, [socket])
    
    return (
        <>
            <h1>테스트 페이지임둥</h1>
            <Btn onClick={() => getPosts()}>getPosts</Btn>
            <Btn onClick={() => writePost({userInfo: userInfo, content: "내용", question: "질문"})}>writePost</Btn>
            <Btn onClick={() => getUserInfo(roomId, {nickname: 1, phone: 1})}>getUser</Btn>
            <Btn onClick={() => registerUser(registerUserInfo)}>registerUser</Btn>

            <Btn onClick={() => makeRoom(users)}>makeRoom</Btn>
            <Btn onClick={() => getRoomsInfo(roomIdList)}>getRooms</Btn>
            <Btn onClick={() => joinRoom(roomId)}>socket join</Btn>
            <Btn onClick={() => joinRoom("닉네임")}>socket alarm join</Btn>
            <Btn onClick={() => sendChatBubble(roomId, "닉네임" ,"메세지")}>socket send</Btn>
            <Btn onClick={() => sendQuestion(roomId, "질문")}>socket question</Btn>
            <Btn onClick={() => sendAlarm(userInfo, otherUserInfo, posts[0], "find")}>socket alarm(find)</Btn>
            <Btn onClick={() => sendAlarm(userInfo, otherUserInfo, posts[0], "pass")}>socket alarm(pass)</Btn>
            <Btn onClick={() => sendAlarm(userInfo, otherUserInfo, posts[0], "warn")}>socket alarm(warn)</Btn>
            <Btn onClick={() => sendAuthMsg("01075601770")}>sendAuthMsg</Btn>

            <Advanced
                db={posts}
                SwipeLeft={() => {console.log("left")}}
                SwipeRight={() => {console.log("right")}}
            />
        </>
    );
};


const writePost = async ({userInfo, content, question}:{
    userInfo: object,
    content: string,
    question: string
}) => {
    const res = await postAPI('writePost', {userInfo: userInfo, content: content, question: question});
    console.log(res)
}


const getPosts = async (last_postId?: number) => {

    last_postId = last_postId ?? 0;
    
    const res = await postAPI('posts', { last_postId: last_postId });

    console.log(res);
    return res;
};

const getUserInfo = async (userId: number, field: object) => {
    const res = await postAPI('userInfo', {userId: userId, field: field})
    console.log(res)
}

const registerUser = async (userInfo: object) => {
    const res = await postAPI('register', {userInfo: userInfo})
    console.log(res)
}


const getRoomsInfo = async (roomIdList: number[]) => {
    const res = await postAPI('rooms', {roomIdList: roomIdList})
    
    console.log(res)
}

const makeRoom = async (users: object[]) => {
    const res = await postAPI('makeRoom', {users: users})
    
    console.log(res)
}

const Btn = styled.div`

    margin-bottom: 20px;

    display: flex;
    align-items: center;


    box-sizing: border-box;
    width: 100%;
    height: 50px;
    padding: 20px;

    border: 1px solid #000;
    border-radius: 10px;


    &:hover{
        cursor: pointer;
    }
`