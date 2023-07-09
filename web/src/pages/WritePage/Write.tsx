import { useState } from 'react';
import { Dropdown } from '../../components/Dropdown';
import { WritePost } from '../../components/Post';
import { AlignBox, EmtpyBox, MarginBox, PaddingBox, SubBtn } from '../../styles/atom';
import { questionList } from '../../contants/question';
import { writePost } from '../../apis/post';
import { useNavigate } from 'react-router';


const Write = () => {

    const [question, setQuestion] = useState<string>(questionList[0])
    const [content, setContent] = useState<string>("")
    const navigate = useNavigate()

    const userInfo = {
        nickname: "jun",
        _id: 1
    }
    
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
                setValue={setContent}
                value={content}
                question={question}
                writer={'jun'}
            />
            <EmtpyBox height={20} />
            <SubBtn
                onClick={async () => {

                    console.log({question, content, userInfo});

                    var result = window.confirm("글을 등록하시겠습니까?");

                    if (!result) return
                    
                    await writePost(
                        {
                            question: question,
                            content: content,
                            userInfo: userInfo
                        }
                    )

                    alert("글이 등록되었습니다 ☺️ \n반응이 올 수도 있으니 알림에서 확인해주세요!")

                    setContent("")
                    navigate("/home")
                }}
                theme={"send"} />
        </AlignBox>
        </PaddingBox>
        )
}

export default Write;