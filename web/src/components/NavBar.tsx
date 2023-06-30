import styled from "@emotion/styled"
import { AlignBox, Text } from "../styles/atom"
import { useNavigate } from "react-router"



const meun = [
    {meun: "home", content: "홈"},
    {meun: "chat", content: "대화"},
    {meun: "write", content: "글쓰기"},
    {meun: "alarm", content: "알림"},
    {meun: "my", content: "마이"},
]

export const NavBar = () => {

    return (<nav>
        <NavBarContainer>
            <AlignBox direction={"row"}>
                {
                    meun.map((item, index) => {
                        return <NavBarContent 
                        key={index} 
                        meun={item.meun} 
                        content={item.content} />
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
}

const NavBarContent = ({ meun, content }: NavBarContentProps) => {

    const navigate = useNavigate();

    return <NavBarLi onClick={()=>{navigate(`/${meun}`)}}>
        <AlignBox direction={"column"}>
            <img src={process.env.PUBLIC_URL + `/icons/${meun}.svg`} alt="icon" />
            <Text fontsize={10} color = "#D9D9D9" content={content}/>
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