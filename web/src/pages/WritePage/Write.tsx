import { useState } from 'react';
import { Dropdown } from '../../components/Dropdown';
import { WritePost } from '../../components/Post';
import { AlignBox, EmtpyBox, MarginBox, PaddingBox, SubBtn } from '../../styles/atom';
import { questionList } from '../../contants/question';
import { writePost } from '../../apis/post';
import { useNavigate } from 'react-router';
import { useUserInfo } from '../../store/userInfo';


const Write = () => {

    const [question, setQuestion] = useState<string>(questionList[0])
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
            <EmtpyBox height={25} />
            <WritePost
                setValue={setContent}
                value={content}
                question={question}
                writer={userInfo.nickname}
            />
            <EmtpyBox height={20} />
            <SubBtn
                onClick={async () => {

                    let result = window.confirm("글을 등록하시겠습니까?");
                    if (!result) return
                    
                    const {_id} = await writePost(
                        {
                            question: question,
                            content: content,
                            userInfo: _userInfo
                        }
                    )

                    setUserInfo({...userInfo, ...{post: [...userInfo.post, _id]}})

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