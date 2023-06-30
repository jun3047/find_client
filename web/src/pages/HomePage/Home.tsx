import { AlignBox, MarginBox, PaddingBox, Text } from "../../styles/atom";
import { Dropdown } from '../../components/Dropdown';
import { useState } from "react";
import { Post } from "../../components/Post";


const questionList = [
    "모든 질문",
    "취업",
    "취업준비",
    "취업준비생",
]

const postList = [
    {questino: "취업", post: {}},
    {questino: "취업", post: {}},
    {questino: "취업", post: {}},
    {questino: "취업", post: {}},
    {questino: "취업", post: {}},
]

const Home = () => {

    const [question, setQuestion] = useState<string>("모든 질문")
    return (
    <PaddingBox left={2} right={2}>
        <AlignBox align="center">
            <AlignBox align="left">
                <Text
                content={"대화하고 싶은 사람에게 FIND"}
                fontsize={20}
                color="#000"
                weight={700}
                />
            </AlignBox>
            <MarginBox top={1}/>
            <Dropdown
                list={questionList}
                value={question}
                setValue={setQuestion}
            />
            <MarginBox top={13}/>
            <Post
                question={"Q. 오늘 하루는 어때"}
                content={"A.lorem ipsum dolor sit amet, con\nsectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit"}

                writer="김민수"
            />
        </AlignBox>
    </PaddingBox>
    )
}

export default Home;