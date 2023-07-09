import styled from "@emotion/styled";
import { Post } from "../../components/Post";
import { AlignBox, EmtpyBox, MainBtn, MarginBox, Text } from "../../styles/atom";
import { useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../apis/user";
import { SimpleCard } from '../../components/SwipeCard/SwipeCard';
import { getPostsById } from "../../apis/post";
import { PostType } from "../../types/post.type";


type OtherUserInfoType = {
    post: number[],
    nickname: string,
    find_count: number,
}

const Other = () => {

    const parseId = useParams()._id
    const _id = parseId ? parseInt(parseId) : 0;

    const [otherUserInfo, setOtherUserInfo] = useState<OtherUserInfoType>({
        post: [],
        nickname: "",
        find_count: 0,
    })

    const [otherUserPost, setOtherUserPost] = useState<PostType[]>([])

    const fetchData = async () => {
        await fetchOtherUserInfo();
        await fetchOtherUserPost();
        
    }

    const fetchOtherUserPost = async () => {
        const _userPosts = await getPostsById(otherUserInfo.post);
        setOtherUserPost(_userPosts);            
    }

    const fetchOtherUserInfo = async () => {
        if (!_id) return;

        const otherUserId = _id;
        const field = { post: 1, nickname: 1, find_count: 1 };

        const _otherUserInfo = await getUserInfo(otherUserId, field);

        setOtherUserInfo(_otherUserInfo);

        console.log("_otherUserInfo:", _otherUserInfo);

    };

    useEffect(() => {fetchData()}, [])

    


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
                content={"@" + otherUserInfo.nickname}
                fontsize={12}
                color="#707070"
            />
            <EmtpyBox height={10} />
            <AlignBox direction="row" style={{}}>
                <FeedInfo num={otherUserPost.length} title="글"/>
                <FeedInfo num={otherUserInfo.find_count} title="파인드"/>
            </AlignBox>
            <EmtpyBox height={10} />
            <PostInfo />
            <SimpleCard
                db={otherUserPost}
                setDB={setOtherUserPost}
            />
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

