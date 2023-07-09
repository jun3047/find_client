import { useNavigate } from "react-router";
import { AlarmBox } from "../../components/AlarmBox";
import { StatusType, useStatus } from "../../store/status";
import { PaddingBox } from "../../styles/atom";

const userInfo = {
    _id: 1,
    grade: "22",
    school: "인하대학교",
    major: "인종기능공학과",
    nickname: "닉네임",
}

const list = [0,1,2,3,4,5,6,7,8,9,10]

const Alarm = () => {

    const {status, setStatus} = useStatus<StatusType>(setStatus => setStatus);
    const naviagte = useNavigate();

    const {_id} = userInfo

    return <PaddingBox top={0.5} left={2} right={2}>
        {
            list.map(() =>
                <AlarmBox
                    user={userInfo}
                    question="질문임"
                    onClick={() => {
                        setStatus({status: "profile"})
                        naviagte(`/profile/${_id}`)
                    }}
                />
            )
        }
    </PaddingBox>
    
}

export default Alarm;