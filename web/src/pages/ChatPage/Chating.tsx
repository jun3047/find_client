import styled from "@emotion/styled";
import { StatusType, useStatus } from "../../store/status";
import { EmtpyBox, PaddingBox, Text } from "../../styles/atom";
import { useParams } from 'react-router-dom';


const Chating = () => {
    const {status, setStatus} = useStatus<StatusType>(setStatus => setStatus);
<<<<<<< HEAD
    const { roomNum } = useParams();
=======
    const {roomId} = useParams();
>>>>>>> origin/main

    return (
        <>
            <EmtpyBox height={2} />
            <ChatBar
                active={true}
                onKeyDownHandler={()=>{console.log("onKeyDownHandler")}}
                sendBtnHandler={()=>console.log("sendBtnHandler")}
                onChangeHandler={()=>console.log("onChangeHandler")}
                msg={"msg"}
                inputRef={()=>{}}
            />
        </>
    )
}

type ChatBarProps = {
    active: boolean,
    onKeyDownHandler: (e: any) => void,
    sendBtnHandler: () => void,
    onChangeHandler: (e: any) => void,
    msg: string,
    inputRef: any
}

const ChatBar = ({active, sendBtnHandler, onKeyDownHandler, onChangeHandler, msg, inputRef}:ChatBarProps) => {

  return (<>
    <QuestionHeader>질문</QuestionHeader>
    <ChatFieldLayout>
      <ChatQuestionImg
        onClick={() => {console.log("ChatQuestionImg")}}
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


const QuestionHeader = styled.div`
  position: fixed;
  top: 48px;
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


//   const NickName = styled.div`
//     font-weight: 700;
//     font-size: 12px;
//     line-height: 14px;
//     letter-spacing: -0.3px;
//     width: fit-content;

//     color: #000000;
//   `;

//   const ChatBubble = styled.div`
//     width: fit-content;
//     padding: 10px 13px;
//     background-color: #4579df;
//     position: relative;

//     font-weight: 400;
//     font-size: 12px;
//     color: white;

//     border-radius: 15px;
//     margin-top: 13px;
//   `;

//   const ChatDate = styled.div`
//     position: absolute;
//     bottom: 6px;

//     left: ${(props) => (props.me ? "-80px" : "")};
//     right: ${(props) => (props.me ? "" : "-80px")};

//     font-weight: 400;
//     font-size: 10px;

//     color: #858585;
//   `;



export default Chating;