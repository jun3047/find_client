import { useState } from 'react';
import { Dropdown } from '../../components/Dropdown';
import { WritePost } from '../../components/Post';
import { AlignBox, EmtpyBox, MarginBox, PaddingBox, SubBtn } from '../../styles/atom';


const questionList :string[] = [
    "취업",
    "취업준비",
    "취업준비생",
]

const Write = () => {

    const [question, setQuestion] = useState<string>(questionList[0])
    
    return (
        <PaddingBox>
        <AlignBox align="center" justify='center'>
            <EmtpyBox height={12} />
            <Dropdown
                list={questionList}
                value={question}
                setValue={setQuestion}
            />
            <EmtpyBox height={25} />
            <WritePost
                question={"질문"}
                writer={'jun'}
            />
            <EmtpyBox height={20} />
            <SubBtn theme={"send"} />
        </AlignBox>
        </PaddingBox>
        )
}

export default Write;