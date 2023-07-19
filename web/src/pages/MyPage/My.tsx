import styled from "@emotion/styled";
import { Post } from "../../components/Post";
import { AlignBox, EmtpyBox, MarginBox, Text } from "../../styles/atom";
import { UseUserType, useUserInfo } from "../../store/userInfo";
import Advanced, { SimpleCard } from "../../components/SwipeCard/SwipeCard";
import { getPosts, getPostsById } from "../../apis/post";
import { useEffect, useState } from "react";
import { PostType } from "../../types/post.type";

const My = () => {
    
    const {userInfo} = useUserInfo<UseUserType>(setUserInfo => setUserInfo);
    const [userPosts, setUserPosts] = useState<PostType[]>([])


    useEffect(() => {
        const getUserPosts = async () => {
          const _userPosts = await getPostsById(userInfo.post);
          setUserPosts(_userPosts);
        };
      
        if (userInfo) getUserPosts();
      }, [userInfo]);

          return (<>
        <AlignBox align="center" justify="top">
            <EmtpyBox height={10} />
            <Profile />
            <EmtpyBox height={5} />
            <Text
                content="익명"
                fontsize={20}
            />
            <EmtpyBox height={1} />
            <Text
                content={"@" + userInfo.nickname}
                fontsize={12}
                color="#707070"
            />
            <EmtpyBox height={10} />
            <AlignBox direction="row" style={{}}>
                <FeedInfo num={userInfo.post.length} title="글"/>
                <FeedInfo num={userInfo.find_count} title="파인드"/>
            </AlignBox>
            <EmtpyBox height={10} />
            <PostInfo />
            <SimpleCard
                passHandler={() => {}}
                setOtherUserInfo={() => { }}
                setPostInfo={() => {}}
                db={userPosts}
                setDB={setUserPosts}
            />
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
                    content="내가 쓴 글"
                    fontsize={16}
                    color="#000"
                    weight={700}
                />
            </MarginBox>
        </AlignBox>
    )
}


export default My;

