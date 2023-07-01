import styled from "@emotion/styled"
import { AlignBox, Text } from "../styles/atom"
import { useNavigate } from "react-router"
import { StatusType, useStatus, Status } from "../store/status"



const meun : (Status & {content: string})[]
= [
    {status: "home", content: "홈"},
    {status: "chat", content: "대화"},
    {status: "write", content: "글쓰기"},
    {status: "alarm", content: "알림"},
    {status: "my", content: "마이"},
]

export const NavBar = () => {
    
    const {status, setStatus} = useStatus<StatusType>(setStatus => setStatus);

    const nowMeun = meun.find(item => item.status === status) || meun[0];

    const navigate = useNavigate();
    

    if(status === "detail") return null

    return (<nav>
        <NavBarContainer>
            <AlignBox direction={"row"}>
                {
                    meun.map((item, index) => {
                        return <NavBarContent 
                        key={index} 
                        meun={item.status} 
                        nowMeun={nowMeun.status}
                        content={item.content}
                        onClick={() => {
                            setStatus({status: item.status})
                            navigate(`/${item.status}`)
                        }}
                        />
                    }
                )}
            </AlignBox>
        </NavBarContainer>
  </nav>)
}

const NavBarContainer = styled.ul`
    background-color: #FFFFFF;
    width: 100vw;
    height: 60px;
    position: fixed;
    bottom: 0;
    right: 0;
`

type NavBarContentProps = {
    meun: string,
    content: string,
    nowMeun: string,
    onClick: () => void,
}

const NavBarContent = ({ meun, content, nowMeun, onClick }: NavBarContentProps) => {

    const isNowMeun = nowMeun === meun

    const activeStr = isNowMeun ? "_active.svg" : ".svg"
    const imgUrl = process.env.PUBLIC_URL + `/icons/${meun}` + activeStr

    const meunColor = isNowMeun ? "#466FFF" : "#D9D9D9"

    return <NavBarLi onClick={onClick}>
        <AlignBox direction={"column"}>
            <img src={imgUrl} alt="icon" />
            <Text fontsize={10} color={meunColor} content={content}/>
        </AlignBox>
    </NavBarLi>
}

const NavBarLi = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20vw;
    height: 60px;
    margin: 0;
`