import styled from "@emotion/styled"
import { AlignBox, Text, BackBtn, MarginBox, EmtpyBox } from "../styles/atom"
import { useStatus, StatusType, Status, Actions } from '../store/status';
import { useNavigate } from "react-router";

const meun = [
    {meun: "login", content: ""},
    {meun: "register", content: "🕶"},
    {meun: "home", content: "🕶"},
    {meun: "chat", content: "대화"},
    {meun: "write", content: "글쓰기"},
    {meun: "alarm", content: "알림"},
    {meun: "my", content: "마이"},
]

export const AppBar = () => {
    
    const {status, setStatus} = useStatus<StatusType>(setStatus => setStatus);
    const nowMeun = meun.find(item => item.meun === status) || meun[0];

    const title = status === "detail" ? "닉네임 들어갈 곳" : nowMeun?.content;

    const navigate = useNavigate();

    const backBtn = () => {
        setStatus({status: "chat"})
        navigate("/chat")
    }
    
    return (
    <AppBarContainer>
        <AlignBox align="center" justify="center" direction="row">
            {
                status === "detail" && <BackBtn onClick={backBtn} />
            }
            <Text content={title} fontsize={16} weight={700} />
        </AlignBox>
    </AppBarContainer>
    )
}

interface AppBarContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    meun?: string
}

const AppBarContainer = styled.div<AppBarContainerProps>`
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 42px;
    background-color: #FFFFFF;
`