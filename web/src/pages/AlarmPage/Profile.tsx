import styled from "@emotion/styled";
import { Post } from "../../components/Post";
import { AlignBox, EmtpyBox, MainBtn, MarginBox, Text } from "../../styles/atom";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../apis/user";
import { SimpleCard } from '../../components/SwipeCard/SwipeCard';
import { getPostsById } from "../../apis/post";
import { PostType } from "../../types/post.type";
import { ReportHandler } from 'web-vitals';
import { UseUserType, setUserInfoType, useUserInfo } from "../../store/userInfo";
import { RoomUserInfo, makeRoom } from "../../apis/room";
import { UserType } from "../../types/user.type";
import { UseRoomInfoType, useRoomInfo } from "../../store/room";
import { RoomType } from "../../types/room.type";


type OtherUserInfoType = {
    post: number[],
    nickname: string,
    find_count: number,
}

const Other = () => {

    const nav = useNavigate()

    const parseId = useParams()._id
    const _id = parseId ? parseInt(parseId) : 0;

    const {userInfo, setUserInfo} = useUserInfo<UseUserType>(setUserInfo => setUserInfo);
    const {roomInfo, setRoomInfo} = useRoomInfo<UseRoomInfoType>(setUserInfo => setUserInfo);


    const [otherUserInfo, setOtherUserInfo] = useState<OtherUserInfoType>({
        post: [],
        nickname: "",
        find_count: 0,
    })
    const [otherUserPost, setOtherUserPost] = useState<PostType[]>([])


    const fetchData = async () => {
        const _otherUserInfo = await fetchOtherUserInfo();
        await fetchOtherUserPost(_otherUserInfo);
    }

    type OtherUserInfoType = {
        post: number[],
        nickname: string,
        find_count: number,
    }

    const fetchOtherUserPost = async (otherUserInfo : OtherUserInfoType) => {

        const _userPosts = await getPostsById(otherUserInfo.post);

        setOtherUserPost(_userPosts);            
    }

    const fetchOtherUserInfo = async () => {
        if (!_id) return;

        const otherUserId = _id;
        const field = { post: 1, nickname: 1, find_count: 1 };

        const _otherUserInfo = await getUserInfo(otherUserId, field);

        setOtherUserInfo(_otherUserInfo);

        return _otherUserInfo;
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
                setOtherUserInfo={()=>{}}
                setPostInfo={()=>{}}
                db={otherUserPost}
                setDB={()=>{}}
            />
            <EmtpyBox height={20} />
            <MainBtn
                onClick={()=>{

                    const otherRoomInfo = {
                        _id: _id,
                        nickname: otherUserInfo.nickname,
                    }

                    MainBtnHandler([userInfo, otherRoomInfo], nav, userInfo, setUserInfo, roomInfo)
                }}
            >
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

const MainBtnHandler = (
    members: RoomUserInfo[],
    nav: any,
    userInfo: UserType,
    setUserInfo: setUserInfoType,
    roomInfo: RoomType[]
    ) => {

    let result = window.confirm("대화방을 만드시겠습니까?");
    
    if (!result) return

    const isExist = roomInfo.filter(room => {
        return room.members.every(member => {
            return members.some(m => m._id === member._id)
        })
    })

    if(isExist.length > 0){
        alert("이미 대화방이 존재합니다!")
    }else{
        makeRoom(members)
        alert("대화방이 만들어졌습니다!")
    }

    nav("/chat")
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

