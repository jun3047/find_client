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
import { SimpleUserType } from "../../types/user.type";
import { getFilteredPost } from "../../utils/getFitteredPost";



const Home = () => {
    
    
    const {userInfo, setUserInfo} = useUserInfo<UseUserType>(setUserInfo => setUserInfo);    
    const {posts, setPosts} = usePost<UsePostType>(setPosts => setPosts);

    const [otherUserInfo, setOtherUserInfo] = useState<SimpleUserType>();
    const [postInfo, setPostInfo] = useState<PostType>();

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
            <MarginBox top={10}/>
            <SimpleCard
                setPostInfo={setPostInfo}
                setOtherUserInfo={setOtherUserInfo}
                setDB={setPosts}
                db={posts}
            />
            <MarginBox top={8} />
            <MarginBox top={10} />
            <AlignBox direction="row" align="center">
                <SubBtn onClick={()=>{                    
                    let result = window.confirm("FIND 일림을 보내시겠어요?");
                    if (!result) return

                    if(!(otherUserInfo && postInfo && userInfo)) return;

                    if(userInfo._id === otherUserInfo._id) return alert ('자기 자신에게는 FIND를 신청할 수 없어요!');
                    if(userInfo.find_post.includes(postInfo._id)) return alert ('이미 FIND를 신청한 사람이에요!');   
                    
                    setUserInfo({
                        ...userInfo,
                        find_count: userInfo.find_count + 1,
                        find_post: [...userInfo.find_post, otherUserInfo._id]
                        }
                    )

                    userInfo.find_post.push(postInfo._id);


                    sendAlarm(userInfo, otherUserInfo, postInfo, "find")

                    alert("FIND 일림을 보냈습니다 ☺️ \n상대가 대화하기를 눌르면 방이 만들어져요!")
                }} theme={"find"} />
            </AlignBox>
        </AlignBox>
    </PaddingBox>
    )
}


export default Home;