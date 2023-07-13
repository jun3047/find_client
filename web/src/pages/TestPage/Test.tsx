import styled from "@emotion/styled";

import { useEffect } from "react";
import Advanced from "../../components/SwipeCard/SwipeCard";
import { joinRoom, sendAlarm, sendChatBubble, sendQuestion } from "../../apis/socket";
import { sendAuthMsg } from "../../apis/sendAuthMsg";
import { getPosts, writePost } from "../../apis/post";
import { getRoomsInfo, makeRoom } from "../../apis/room";
import { getUserInfo, registerUser } from "../../apis/user";


    // 예시 데이터

    const userInfo = {
        nickname: "닉네임1",
        _id: 1,
        school: "학교",
        major: "전공",
        grade: 22,
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
            userInfo: {_id: 1, nickname: "닉네임"}
        }]

//소켓 세팅

  
export const Test = () => {
    
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
            {/* <Btn onClick={() => sendAlarm(userInfo, otherUserInfo, posts[0], "find")}>socket alarm(find)</Btn>
            <Btn onClick={() => sendAlarm(userInfo, otherUserInfo, posts[0], "pass")}>socket alarm(pass)</Btn>
            <Btn onClick={() => sendAlarm(userInfo, otherUserInfo, posts[0], "warn")}>socket alarm(warn)</Btn> */}
            <Btn onClick={() => sendAuthMsg("01075601770")}>sendAuthMsg</Btn>

            <Advanced
                setDB={() => {} }
                db={posts}
                SwipeLeft={() => { console.log("left"); } }
                SwipeRight={() => { console.log("right"); } } 
                setPostInfo={()=>{}}
                setOtherUserInfo={()=>{}}/>
        </>
    );
};


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