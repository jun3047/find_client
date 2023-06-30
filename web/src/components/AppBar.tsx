import styled from "@emotion/styled"
import { AlignBox, Text } from "../styles/atom"
import { useStatus, StatusType, Status, Actions } from '../store/status';

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
    
    const {status} = useStatus<StatusType>(setStatus => setStatus);

    const nowMeun = meun.find(item => item.meun === status) || meun[0];
    console.log("nowMeun:", nowMeun);

    return (
    <AppBarContainer>
            <AlignBox align="center" justify="center">
                <Text content={nowMeun?.content} fontsize={16} weight={700}/>
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