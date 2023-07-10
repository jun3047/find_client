import styled from "@emotion/styled";
import { ChatBox } from "../../components/ChatBox";
import { EmtpyBox, PaddingBox, Text } from "../../styles/atom";
import { useNavigate } from "react-router";
import { StatusType, useStatus } from "../../store/status";
import { UseUserType, useUserInfo } from "../../store/userInfo";
import { useEffect, useState } from "react";
import { RoomType } from "../../types/room.type";
import { useRoomInfo, useRoomInfoType } from "../../store/room";

const Chat = () => {
    
    const navigate = useNavigate();
    const {status, setStatus} = useStatus<StatusType>(setStatus => setStatus);
    const {userInfo, setUserInfo} = useUserInfo<UseUserType>(setStatus => setStatus);
    const {roomInfo, setRoomInfo} = useRoomInfo<useRoomInfoType>(setStatus => setStatus);

    const goDetail = (_roomInfo: RoomType) => {
        navigate(`/chat/${_roomInfo._id}`, { state: { nowRoomInfo: _roomInfo } });
    }

    return(
    <>
    <NoticeContainer>
        <Text content="앱은 더 빠르답니다" fontsize={14} weight={700} />
        <EmtpyBox height={1} />
            <Text content="불편한 웹에서 안 하셔도 돼요" fontsize={12} />
            <NoticeText>앱 다운로드</NoticeText>
        </NoticeContainer>
    <EmtpyBox height={2} />
    {
        roomInfo.map((room: RoomType) => {
            return (
                <ChatBox
                    id={room._id}
                    key={room._id}
                    nickname={room.members[0].nickname}
                    date={"오늘"}
                    LastMsg={"눌러서 확인"}
                    clickEvent={() => goDetail(room)}
                />
            )
        }
        )    
    }
    </>)
}



const NoticeContainer = styled.div`
position: relative;
box-sizing: border-box;
display: flex;
flex-direction: column;
padding: 15px 30px 15px 30px;
width: 100vw - 20px;
height: 75px;
background: #F3F3F3;
border-radius: 11px;
margin: 0px 10px;
`;

const NoticeText = styled.div`
    position: absolute;
    right: 40px;
    top: 27px;
    color: #007AFE;
    font-weight: 700;
`;


export default Chat;



