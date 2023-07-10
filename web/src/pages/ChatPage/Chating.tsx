import styled from "@emotion/styled";
import { StatusType, useStatus } from "../../store/status";
import { EmtpyBox, PaddingBox, Text } from "../../styles/atom";
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { ChatType } from "../../types/room.type";
import { UseUserType, useUserInfo } from "../../store/userInfo";
import { socket, socketListener } from "../../apis/socket";
import { questionList } from "../../contants/question";


const Chating = () => {
  
  
  const {userInfo, setUserInfo} = useUserInfo<UseUserType>(setStatus => setStatus);
  
  const [keyboardValue, setKeyboardValue] = useState<string>("");
  const [question, setQuestion] = useState<string>("?로 질문을 해봐요");
  const [chats, setChats] = useState<ChatType[]>([
    {
      nickname: userInfo.nickname,
      msg: "안녕하세요",
    }
  ]);
  
  
    useEffect(() => {
  
      console.log("useEffect");
  
      socket.on('connect', () => {
          console.log('Connected to the server');
          socketListener({
            setChats: setChats,
            chats: chats
          });
        });
      
  }, [socket])
  
  
  return (
    <ChatWarrper>
      <EmtpyBox height={2} />
      {
        chats.map((chat, i) => {
          const isMyNickname = chat.nickname === userInfo.nickname;
          const isLastChatNickname = i > 0 && chats[i-1].nickname == chat.nickname;
          const isNextNameSame = i < chats.length - 1 && chats[i+1].nickname == chat.nickname;
          const formattedDate = new Date().toLocaleString("ko-KR", {
            hour12: false,
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });    

          return (
            <ChatBubbleWrapper me={isMyNickname} key={i}>
              {isLastChatNickname || 
                <NickName>
                  {chat.nickname}
                </NickName> 
              } 
              <ChatBubble key={i}>
                {chat.msg}
              {isNextNameSame ||
                <ChatDate me={isMyNickname}>
                  {formattedDate}
                </ChatDate>
              }
              </ChatBubble>
            </ChatBubbleWrapper>
          );
        })
      }
      <ChatBar
        active={true}
        onKeyDownHandler={(e) => { setKeyboardValue(e.target.value) }}
        sendBtnHandler={() => { 
          sendMsg({ 
            setChats: setChats,
            chats: chats,
            setMsg: setKeyboardValue,
            msg: keyboardValue
          })}}
        onChangeHandler={(e) => { setKeyboardValue(e.target.value) }}
        msg={keyboardValue}
        inputRef={() => {}}
        question={question}
        setQuestion={setQuestion}
      />
    </ChatWarrper>
  )
}

interface SendMsgProps {
  msg: string,
  chats: ChatType[],
  setChats: (chats: ChatType[]) => void,
  setMsg: (msg: string) => void
}

const sendMsg = ({msg, setMsg, chats, setChats}: SendMsgProps) => {
  
  if (msg === "") return;
  
  const newMsg: ChatType = {
    nickname: "test",
    msg: msg,
    date: new Date()
  }
  
  setMsg("");
}

type ChatBarProps = {
    active: boolean,
    question: string,
    setQuestion: (question: string) => void,
    onKeyDownHandler: (e: any) => void,
    sendBtnHandler: () => void,
    onChangeHandler: (e: any) => void,
    msg: string,
    inputRef: any
}

const ChatBar = ({ 
  active, 
  sendBtnHandler, 
  onKeyDownHandler, 
  onChangeHandler, 
  msg,
  question,
  setQuestion,
  inputRef
}: ChatBarProps) => {

  return (<>
    <QuestionHeader>{question}</QuestionHeader>
    <ChatFieldLayout>
      <ChatQuestionImg
        onClick={() => {
          const randomIndex = Math.floor(Math.random() * questionList.length);
          const _question = questionList[randomIndex];
                  
          setQuestion(_question);
        }}
        src={`${process.env.PUBLIC_URL}/icons/questionMark.png`}
      />
      <ChatField
        ref={inputRef}
        onKeyDown={onKeyDownHandler}
        value={msg}
        onChange={onChangeHandler}
      />
      <ChatSendBtn
        active={active}
        onClick={chatSendBtnHandler}
      />
    </ChatFieldLayout>
    </>);

  function chatSendBtnHandler() {
    sendBtnHandler();
  }
};

const ChatWarrper = styled.div`
  padding-top: 60px;
`


const QuestionHeader = styled.div`
  position: fixed;
  top: 42.5px;
  z-index: 1;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;
  border-width: 0.5px 0px;
  border-style: solid;
  border-color: #000000;
  color: #4579DF;

  width: 100vw;
  height: 38px;

  font-weight: 900;
  font-size: 12px;
  line-height: 14px;
`;


const ChatSendBtn = styled.div<{active: boolean}>`
  position: fixed;
  width: 36px;
  height: 36px;
  color: white;
  bottom: 23px;
  right: 13px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;

  background-color: ${(props)=>(props.active ? "#4579DF" : "#9e9e9e")};
  border-radius: 18px;

  &:hover {
    cursor: pointer;
  }

  &::before {
    content: "↑";
  }
`;

const ChatField = styled.input`
  box-sizing: border-box;

  position: fixed;
  bottom: 0;
  left: 40px;
  min-height: 48px;
  width: calc(100vw - 51px);
  padding: 0 50px 0 14px;
  font-size: 16px;

  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 24px;
  overflow-x: scroll;

  margin: 17px 7px;

  &:focus {
    outline: none;
    border: 1px solid black;
  }
`;

const ChatFieldLayout = styled.div`
  z-index: 1;
  width: 100vw;
  position: fixed;
  background-color: white;
  height: 70px;
  bottom: 0;
`;

const ChatQuestionImg = styled.img`
  
  position: fixed;
  
  bottom: 31px;
  left: 13px;

  height: 23px;
  width: 23px;

`


interface ChatBubbleProps {
  me: boolean;
}

const ChatBubbleWrapper = styled.div<ChatBubbleProps>`
  background-color: white;
  min-height: 50px;
  padding: 0px 31px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: ${(props) => (props.me ? "flex-end" : "flex-start")}
`

const NickName = styled.div`
  position: absolute;
  top: -24px;
  font-weight: 700;
  font-size: 12px;
  width: fit-content;

  color: #000000;
`;

const ChatBubble = styled.div`
  width: fit-content;
  padding: 10px 13px;
  background-color: #4579df;
  position: relative;
  
  font-weight: 400;
  font-size: 14px;
  color: white;
  
  border-radius: 15px;
 `;


interface ChatDateProps {
  me: boolean;
}

const ChatDate = styled.div<ChatDateProps>`
  position: absolute;
  bottom: 6px;

  left: ${(props) => (props.me ? "-90px" : "")};
  right: ${(props) => (props.me ? "" : "-90px")};

  font-weight: 400;
  font-size: 10px;

  color: #858585;
`;


export default Chating;