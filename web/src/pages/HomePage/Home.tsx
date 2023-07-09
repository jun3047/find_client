import { AlignBox, EmtpyBox, MarginBox, PaddingBox, SubBtn, Text } from "../../styles/atom";
import { Dropdown } from '../../components/Dropdown';
import { useEffect, useState } from "react";
import { getPosts } from "../../apis/post";
import { PostType } from "../../types/post.type";
import Advanced from "../../components/SwipeCard/SwipeCard";
import { questionList } from "../../contants/question";
import { sendAlarm } from "../../apis/socket";
import { UsePostType, usePost } from "../../store/post";
import { UseUserType, useUserInfo } from "../../store/userInfo";




const Home = () => {
    
    const {posts, setPosts} = usePost<UsePostType>(setPosts => setPosts);
    const {userInfo} = useUserInfo<UseUserType>(setUserInfo => setUserInfo);
    const [otherUserInfo, setOtherUserInfo] = useState({});
    const [postInfo, setPostInfo] = useState({_id: 1});
    const [alarmList, setAlarmList] = useState([0]);

    // const [filteredPosts, setFilteredPosts] = useState<PostType[]>(posts)
    // const [question, setQuestion] = useState<string>("모든 질문")

    // useEffect(() => {

    //     if(question === "모든 질문"){
    //         console.log("모든 질문", [...posts]);

    //         setFilteredPosts([...posts])
    //         return;
    //     }

    //     const _filteredPosts = posts.filter((post: PostType) => post.question === question);
    //     setFilteredPosts([..._filteredPosts])
    // }, [question])

    
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
            {/* <Dropdown
                list={questionList}
                value={question}
                setValue={setQuestion}
            /> */}
            {posts.length}
            <Advanced
                setPostInfo={setPostInfo}
                setOtherUserInfo={setOtherUserInfo}
                setDB={setPosts}
                db={posts}
                SwipeLeft={() => {
                    if (postInfo === undefined) return;

                    if (!alarmList.includes(postInfo._id)) {
                        sendAlarm(userInfo, otherUserInfo, postInfo, "pass")
                        alarmList.push(postInfo._id);
                    }
                }}
                SwipeRight={() => {
                    if (postInfo === undefined) return;

                    if (!alarmList.includes(postInfo._id)) {
                        sendAlarm(userInfo, otherUserInfo, postInfo, "find")
                        alarmList.push(postInfo._id);
                    }
                }}
            />
            <MarginBox top={8} />
            <MarginBox top={10} />
            <AlignBox direction="row">
                <SubBtn onClick={()=>{}} theme={"pass"} />
                <EmtpyBox width={13} />
                <SubBtn onClick={()=>{}} theme={"warn"} />
                <EmtpyBox width={13} />
                <SubBtn onClick={()=>{}} theme={"find"} />
            </AlignBox>
        </AlignBox>
    </PaddingBox>
    )
}


export default Home;