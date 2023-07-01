import styled from "@emotion/styled";

type ListChatProps = {
    clickEvent: (id:number) => void;
    nickname: string;
    LastMsg: string;
    date: string;
    id: number;
    active?: boolean;
}


export const ChatBox = ({ clickEvent, nickname, LastMsg, date, id, active = false }:ListChatProps) => {

    console.log(id)

    return (
        <ListWrapper onClick={()=>clickEvent(id)}>
        {active ? <ChatActive /> : null}
        <Title>{nickname}</Title>
        <SubTitle>{LastMsg}</SubTitle>
        <MainDate>{date}</MainDate>
      </ListWrapper>
    );
}

const ListWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 18px 90px 18px 42px;
  width: 100vw;
  max-height: 80px;
  background-color: #FFF;

  &:hover{
    cursor: pointer;
    background-color: #f2f2f2;
  }
`;

const MainDate = styled.div`
  position: absolute;
  right: 40px;
  font-weight: 400;
  font-size: 10px;
  color: #858585;
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 12px;
    margin-bottom: 8px;
`

const SubTitle = styled.div`
  font-weight: 400;
  font-size: 12px;
  overflow-y: hidden;
  height: 13px;
`;

const SubDate = styled.div`
  font-weight: 600;
  font-size: 12px;
  color: #a6a6a6;
`;

const ChatActive = styled.div`
    position: absolute;
    height: 8px;
    width: 8px;
    left: 18px;
    bottom: 32px;
    border-radius: 50%;
    background-color: #4579DF;
`
