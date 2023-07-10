import { AlignBox, EmtpyBox, MarginBox, PaddingBox, SubBtn, Text } from "../../styles/atom";
import { Dropdown } from '../../components/Dropdown';
import { useEffect, useState } from "react";
import { getPosts } from "../../apis/post";
import { PostType } from "../../types/post.type";
import Advanced, { SimpleCard } from "../../components/SwipeCard/SwipeCard";
import { questionList } from "../../contants/question";
import { sendAlarm } from "../../apis/socket";
import { UsePostType, usePost } from "../../store/post";
import { UseUserType, useUserInfo } from "../../store/userInfo";




const Home = () => {
    

    // const {userInfo} = useUserInfo<UseUserType>(setUserInfo => setUserInfo);
    // const [otherUserInfo, setOtherUserInfo] = useState({});
    // const [alarmList, setAlarmList] = useState([0]);
    // //실제 posts
    // const [postInfo, setPostInfo] = useState({_id: 1});

    //예삐 posts
    const {posts, setPosts} = usePost<UsePostType>(setPosts => setPosts);
    
    
    useEffect(() => {
        console.log(posts);
    }, [])

    
    return (
    <PaddingBox left={2} right={2}>
        <AlignBox align="center">
            <MarginBox top={2}/>
            <AlignBox align="left" direction="row">
                <Text
                    content={`대화하고 싶은 사람에게`}
                    fontsize={24}
                    color="#000"
                    weight={700}
                />
                <Text
                    content={`, FIND`}
                    fontsize={24}
                    color="#2400FF"
                    weight={700}
                />
            </AlignBox>
            <MarginBox top={1}/>
            {posts.length}
            <SimpleCard
                setDB={setPosts}
                db={posts}
            />
            <MarginBox top={8} />
            <MarginBox top={10} />
            <AlignBox direction="row" align="center">
                {/* <SubBtn onClick={()=>{}} theme={"pass"} />
                <EmtpyBox width={13} />
                <SubBtn onClick={()=>{}} theme={"warn"} />
                <EmtpyBox width={13} /> */}
                <SubBtn onClick={()=>{}} theme={"find"} />
            </AlignBox>
        </AlignBox>
    </PaddingBox>
    )
}


export default Home;