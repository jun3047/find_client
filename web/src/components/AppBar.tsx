import styled from "@emotion/styled"
import { AlignBox, Text } from "../styles/atom"

export const AppBar = () => (
    <AppBarContainer>
        <AlignBox align="center" justify="center">
            <Text 
            fontsize={16} 
            weight={700} 
            content={"대화"} 
            />
        </AlignBox>
    </AppBarContainer>
)

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