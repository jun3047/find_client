import { useState } from 'react';
import { Dropdown } from '../../components/Dropdown';
import { WritePost } from '../../components/Post';
import { AlignBox, EmtpyBox, MarginBox, PaddingBox, SubBtn } from '../../styles/atom';
import { questionList } from '../../contants/question';
import { writePost } from '../../apis/post';
import { useNavigate } from 'react-router';
import { useUserInfo } from '../../store/userInfo';
import { trackEvent } from '../../apis/amplitude';


const Write = () => {

    const [question, setQuestion] = useState<string>("여길 눌러서 질문을 골라봐요")
    const [content, setContent] = useState<string>("")
    const {userInfo, setUserInfo} = useUserInfo()

    const navigate = useNavigate()

    const _userInfo = {
        _id: userInfo._id,
        nickname: userInfo.nickname,
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
            <EmtpyBox height={17} />
            <WritePost
                setValue={setContent}
                value={content}
                question={
                    question === "여길 눌러서 질문을 골라봐요" ? "위에서 질문을 골라봐요" : question
                }
                writer={userInfo.nickname}
            />
            <EmtpyBox height={20} />
            <SubBtn
                onClick={async () => {

                    if(question === '여길 눌러서 질문을 골라봐요') return alert("질문을 골라주세요")
                    if(content === '') return alert("내용을 입력해주세요")

                    let result = window.confirm("글을 등록하시겠습니까? \n등록 후에는 수정이 불가능합니다.");
                    if (!result) return
                    
                    trackEvent(`write post`)

                    const {_id} = await writePost(
                        {
                            question: question,
                            content: content,
                            userInfo: _userInfo
                        }
                    )

                    setUserInfo({...userInfo, ...{post: [...userInfo.post, _id]}})

                    alert("글이 등록되었습니다 ☺️ \n더 많은 글을 쓰면 더 FIND가 잘 올거에요!")

                    setContent("")
                    navigate("/home")
                }}
                theme={"send"} />
        </AlignBox>
        </PaddingBox>
        )
}

export default Write;