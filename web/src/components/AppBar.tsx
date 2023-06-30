import styled from "@emotion/styled"
import { AlignBox } from "../styles/atom"

export const AppBar = () => (<>
    <AlignBox align="center" justify="center">
        <AppBarContainer meun={"home"}/>
    </AlignBox>
</>)

interface AppBarContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    meun?: string
}

const AppBarContainer = styled.div<AppBarContainerProps>`
    width: 100vw;
    height: 42px;
`