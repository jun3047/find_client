import { AlarmBox } from "../../components/AlarmBox";
import { PaddingBox } from "../../styles/atom";

const userInfo = {
    id: "이런거",
    grade: "22",
    school: "인하대학교",
    major: "인종기능공학과",
}

const list = [0,1,2,3,4,5,6,7,8,9,10]

const Alarm = () => {
    return <PaddingBox top={0.5} left={2} right={2}>
        {
            list.map((item, index) =>
                <AlarmBox
                    userInfo={userInfo}
                    question="질문임"
                />
            )
        }       
        <AlarmBox
            userInfo={userInfo}
            question="질문임"
        />
        <AlarmBox
            userInfo={userInfo}
            question="질문임"
        />
        <AlarmBox
            userInfo={userInfo}
            question="질문임"
        />
    </PaddingBox>
    
}

export default Alarm;