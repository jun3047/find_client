import styled from "@emotion/styled";
import { AlignBox, EmtpyBox, PaddingBox, Text } from "../styles/atom"
import { AlamrUserType } from "../types/alarm.type";


type AlarmBoxProps = {
    question: string;
    user: AlamrUserType;
    onClick: () => void;
    theme?: "find" | "pass" | "warn" | "send";
}



export const AlarmBox = ({question, user, onClick, theme = "find"}: AlarmBoxProps) => {

    const { school, major, grade } = user

    const imgUrl = process.env.PUBLIC_URL + `/icons/${theme}.svg`

    return (
    <AlarmBoxContainer onClick={onClick}>
        <PaddingBox
            top={2}
            bottom={2}
            left={1}
            right={1}>
        <AlignBox direction="row">
            <AlignBox flex={1}>
            <PaddingBox left={2} right={2}>
                <img src={imgUrl} />
            </PaddingBox>
            </AlignBox>
            <AlignBox align="left" flex={5} direction="column">
                <PaddingBox left={1} right={1}>
                    <Text
                        fontsize={14}
                        content={`[${question}] 글을 좋아해`}
                    />
                    <EmtpyBox height={0.5} />
                    <Text
                        fontsize={12}
                        weight={700}
                        content={`${school} / ${major} / ${grade}이 보낸 `}
                    />
                    <Text
                        fontsize={12}
                        weight={700}
                        color="#466FFF"
                        content={"FIND"}
                    />
                </PaddingBox>
            </AlignBox>
        </AlignBox>
        </PaddingBox>
    </AlarmBoxContainer>
    )
}

const AlarmBoxContainer = styled.div`
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-bottom: 10px;
`