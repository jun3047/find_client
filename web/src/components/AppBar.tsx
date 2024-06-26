import styled from "@emotion/styled"
import { AlignBox, Text, BackBtn, MarginBox, EmtpyBox } from "../styles/atom"
import { useStatus, StatusType, Status, Actions } from '../store/status';
import { useLocation, useNavigate } from "react-router";
import { UseUserType, useUserInfo } from "../store/userInfo";

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
    const {userInfo, setUserInfo} = useUserInfo<UseUserType>(setStatus => setStatus);
    
    const nowMeun = meun.find(item => item.meun === status) || meun[0];

    const navigate = useNavigate();

    const location = useLocation();
    const members = location.state?.nowRoomInfo.members;

    const isDetail = (status === "room" || status === "profile" || status === "terms")
    const detailTitle = members? members.find((member:any) => member._id !== userInfo._id)?.nickname: ""
    const title = isDetail ? detailTitle : nowMeun?.content;
    
    const backBtn = () => navigate(-1)
    
    return (
    <AppBarContainer>
        <AlignBox align="center" justify="center" direction="row" style={{height: "100%"}}>
            {
                isDetail && <BackBtn onClick={backBtn} />
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
    z-index: 1000;
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 42px;
    background-color: #FFFFFF;
`