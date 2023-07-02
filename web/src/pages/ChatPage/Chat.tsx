import styled from "@emotion/styled";
import { ChatBox } from "../../components/ChatBox";
import { EmtpyBox, PaddingBox, Text } from "../../styles/atom";
import { useNavigate } from "react-router";
import { StatusType, useStatus } from "../../store/status";

const Chat = () => {
    
    const naviagte = useNavigate();
    const {status, setStatus} = useStatus<StatusType>(setStatus => setStatus);


    const goDetail = (roomId: number) => {
        setStatus({status: "room"})
        naviagte(`/chat/${roomId}`)
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
    <ChatBox
        id={2}
        key={2}
        nickname={"닉넴"}
        date={"오늘"}
        LastMsg={"얍"}
        clickEvent={(roomId:number) => goDetail(roomId)}
    />
    <ChatBox
        id={2}
        key={2}
        nickname={"닉넴"}
        date={"오늘"}
        LastMsg={"얍"}
        clickEvent={(roomId:number) => goDetail(roomId)}
    />
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



