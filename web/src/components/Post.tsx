import styled from "@emotion/styled"
import { AlignBox, MarginBox, Text, EmtpyBox, PaddingBox, TextAreaInputBox } from "../styles/atom";



type PostProps = {
    question: string;
    content: string;
    writer: string;
}

export const Post = ({question, content, writer}:PostProps) => {
    
    
    return(<PostContainer>
    <EmtpyBox height={4} />
    <AlignBox align="center" justify="top">
        <Text content={question} fontsize={16} weight={700}/>
        <EmtpyBox height={4} />
        <AlignBox align="left" justify="top">
            <PaddingBox left={6} right={6}>
                <Text content={content} fontsize={14} />
            </PaddingBox>
        </AlignBox>
    </AlignBox>
    <WriterContainer>
    <Text content={"@"+writer} fontsize={14} weight={700}/>
    </WriterContainer>
    </PostContainer>)

}

type WritePostProps = {
    question: string;
    writer: string;
    setValue: (value:string) => void;
    value: string;
}

export const WritePost = ({question, writer, setValue, value}:WritePostProps) => {
    
    
    return(<PostContainer>
    <EmtpyBox height={4} />
    <AlignBox align="center" justify="top">
        <Text content={question} fontsize={16} weight={700}/>
        <EmtpyBox height={4} />
        <AlignBox align="left" justify="top">
            <PaddingBox left={6} right={6}>
            <TextAreaInputBox 
                setValue={(e)=>setValue(e.target.value)}
                lableText={""} />
            </PaddingBox>
        </AlignBox>
    </AlignBox>
    <WriterContainer>
    <Text content={"@"+writer} fontsize={14} weight={700}/>
    </WriterContainer>
    </PostContainer>)

}

const WriterContainer = styled.div`
    position: absolute;
    bottom: 10px;
    right: 14px;
`


const PostContainer = styled.div`
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.25);
    position: relative;
    min-width: 337px;
    min-height: 203px;
    max-width: 347px;
    width: 90vw;
    height: 24vh;
    background-color: #fff;
    border: 0.10px black solid;
    border-radius: 15px;
`