import styled from "@emotion/styled";
import { Post } from "../../components/Post";
import { AlignBox, EmtpyBox, MainBtn, MarginBox, Text } from "../../styles/atom";

const Other = () => {

    return (<>
        <AlignBox align="center" justify="top">
            <Profile />
            <EmtpyBox height={5} />
            <Text
                content="비공개"
                fontsize={20}
                weight={700}
            />
            <EmtpyBox height={1} />
            <Text
                content="@id"
                fontsize={12}
                color="#707070"
            />
            <EmtpyBox height={10} />
            <AlignBox direction="row" style={{}}>
                <FeedInfo num={1} title="글"/>
                <FeedInfo num={1} title="파인드"/>
            </AlignBox>
            <EmtpyBox height={10} />
            <PostInfo />
            <EmtpyBox height={10} />
            <Post question={"질문"} content={"내용"} writer={"id"} />
            <EmtpyBox height={12} />
            <MainBtn>
                대화하기
            </MainBtn>
        </AlignBox>
    </>)
}

const Profile = () => {
    return (
        <AlignBox justify="top" align="center">
            <EmtpyBox width={10} />
            <ProfileCircle />
            <EmtpyBox width={10} />
        </AlignBox>
    )
}

const ProfileCircle = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #EF8080;
`


const FeedInfo = ({num, title}:{
    num: number,
    title: string
}) => {
    
    return (
        <AlignBox justify="top" align="center">
            <Text
                content={num.toString()}
                fontsize={12}
                color="#000"
                weight={700}
            />
            <EmtpyBox width={10} />
            <Text
                content={title}
                fontsize={12}
                color="#707070"
            />
            <EmtpyBox width={1} />
        </AlignBox>
    )
}

const PostInfo = () => {
    
    return (
        <AlignBox align="center" style={{borderBottom:'1px solid rgba(0, 0, 0, 0.25)'}}>
            <MarginBox bottom={2}>
                <Text
                    content="쓴 글"
                    fontsize={16}
                    color="#000"
                    weight={700}
                />
            </MarginBox>
        </AlignBox>
    )
}


export default Other;

