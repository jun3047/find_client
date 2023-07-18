import styled from "@emotion/styled";
import { ChatBox } from "../../components/ChatBox";
import { AlignBox, EmtpyBox, PaddingBox, Text } from "../../styles/atom";
import { useNavigate } from "react-router";
import { StatusType, useStatus } from "../../store/status";
import { UseUserType, useUserInfo } from "../../store/userInfo";
import { useEffect, useState } from "react";
import { RoomType } from "../../types/room.type";
import { useRoomInfo, UseRoomInfoType } from "../../store/room";
import { getChatTime } from "../../utils/getChatTime";
import { socket } from "../../apis/socket";

const Chat = () => {
    
    const navigate = useNavigate();
    const {roomInfo} = useRoomInfo<UseRoomInfoType>(setStatus => setStatus);
    const {userInfo} = useUserInfo<UseUserType>(setStatus => setStatus);

    const [orderedRoomInfo, setOrderedRoomInfo] = useState<RoomType[]>([]);

    const goDetail = (_roomInfo: RoomType) => {
        navigate(`/chat/${_roomInfo._id}`, { state: { nowRoomInfo: _roomInfo } });
    }

    useEffect(()=>{
        const _orderedRoomInfo = roomInfo.sort((a: RoomType, b: RoomType) => {
            const aDate = a.chats[a.chats.length - 1]?.date;
            const bDate = b.chats[b.chats.length - 1]?.date;
            if(aDate === undefined || bDate === undefined) return 0;
            return (aDate > bDate) ? -1 : (aDate < bDate) ? 1 : 0;
        })

        setOrderedRoomInfo(_orderedRoomInfo);
    }, [roomInfo])

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
        orderedRoomInfo.length === 0 ?
        <AlignBox align="center" justify="center">
            <PaddingBox top={30} left={2} right={2}>
                <Text 
                    content="아직 대화가 없어요 😭"
                    fontsize={20}
                />
            </PaddingBox>
        </AlignBox>
        : 
        orderedRoomInfo.map((room: RoomType) => {

            const lastChat = room.chats[room.chats.length - 1];

            const {msg, date} = lastChat || {msg: undefined, date: undefined};

            const otherNickname = room.members.filter((member) => member._id !== userInfo._id)[0].nickname;

            if(typeof date !== "string" && date !== undefined) return;

            const chatDate = (date === undefined) ? "새로운 채팅" : getChatTime(date);

            return (
                <ChatBox
                    id={room._id}
                    key={room._id}
                    nickname={otherNickname}
                    date={chatDate}
                    LastMsg={msg}
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



