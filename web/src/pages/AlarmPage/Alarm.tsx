import { useNavigate } from "react-router";
import { AlarmBox } from "../../components/AlarmBox";
import { StatusType, useStatus } from "../../store/status";
import { AlignBox, EmptyPage, PaddingBox, Text } from "../../styles/atom";
import { UseUserType, useUserInfo } from "../../store/userInfo";
import { useEffect, useState } from "react";
import { AlarmType } from "../../types/alarm.type";
import { socket, socketAlarmListener } from "../../apis/socket";
import { useAlarms } from "../../store/alarm";

const Alarm = () => {

    const {status, setStatus} = useStatus<StatusType>(setStatus => setStatus);
    const {userInfo, setUserInfo} = useUserInfo<UseUserType>(setUserInfo => setUserInfo);
    const {alarms, setAlarms} = useAlarms(setAlarms => setAlarms);
    
    const naviagte = useNavigate();

    return (<>{
        alarms.length === 0 ?
        <AlignBox align="center" justify="center">
            <PaddingBox top={30} left={2} right={2}>
                <Text 
                    content="아직 알림이 없어요 😭"
                    fontsize={20}
                />
            </PaddingBox>
        </AlignBox> :
        <PaddingBox top={0.5} left={2} right={2}>
            {
                alarms.map((alarm, i) =>
                    <AlarmBox
                        key={i}
                        user={alarm.userInfo}
                        question={alarm.question}
                        onClick={() => {
                            setStatus({status: "profile"})
                            naviagte(`/profile/${alarm.userInfo._id}`)
                        }}
                    />
                )
            }
        </PaddingBox>
    }</>)
}

export default Alarm;