import { useState } from "react";
import { useNavigate } from "react-router"
import { AlignBox } from "../../styles/atom";
import { 초기화면, 휴대폰인증, 인증번호입력, 학과선택, 학번선택, 아이디선택, 입장 } from "./화면";
import { sendAuthMsg } from "../../apis/sendAuthMsg";
import { getUserInfo, registerUser } from "../../apis/user";
import { useUserInfo } from "../../store/userInfo";
import { getUserInfoCookie, setUserInfoCookie } from "../../hooks/cookies.js";
import { UserType } from "../../types/user.type";


const Login = () => {
    
    type RegisterPage = "초기화면"|"휴대폰인증"|"인증번호입력"|"학과선택"|"학번선택"|"아이디선택"|"입장"
    
    const {userInfo, setUserInfo} = useUserInfo()
    
    const navigate = useNavigate()
    const [step, setStep] = useState<RegisterPage>("초기화면")
    const [registerData, setResgisterData] = useState({"school":"인하대"})
    const [authCode, setAuthCode] = useState<number>(0)
    const [registerUserInfo, setRegisterUserInfo] = useState<UserType>()

    return (
        <AlignBox>
            {step == "초기화면" && <초기화면 onNext={ async ()=>{

                const userCookieId = getUserInfoCookie()

                if(userCookieId !== undefined){
                    const _userInfo = await getUserInfo(userCookieId)

                    console.log(_userInfo);
                    
                    setUserInfo(_userInfo)
                    navigate("/home")
                }

                setStep("휴대폰인증")
            }}/>}
            {step == "휴대폰인증" && <휴대폰인증 onNext={ async (data: string)=>{
                setResgisterData(prev => ({...prev, "phone": data}))
                const res = await sendAuthMsg(data)

                const _authCode = res.authCode
                const _userInfo = res.userInfo

                console.log(_authCode);
                
                setRegisterUserInfo(_userInfo)
                setAuthCode(_authCode)
                setStep("인증번호입력")
            }}/>}
            {step == "인증번호입력" && <인증번호입력 onNext={(data: string)=>{

                if(authCode.toString() !== data) return alert("인증번호가 일치하지 않습니다 😭")

                console.log("registerUserInfo:", registerUserInfo);

                if(registerUserInfo === undefined) return setStep("학과선택")

                setUserInfo(registerUserInfo)
                alert("이미 가입되어있어요 🥳 \n 이전 정보로 계속할게요 🎊")
                setUserInfoCookie(registerUserInfo._id)
                navigate("/home")
                //인증번호와 일치하는지 확인
            }}/>}
            {step == "학과선택" && <학과선택 onNext={(data: string)=>{
                setResgisterData(prev => ({...prev, "major": data}))
                setStep("학번선택")
            }}/>}
            {step == "학번선택" && <학번선택 onNext={(data: string)=>{
                setResgisterData(prev => ({...prev, "grade": parseInt(data)}))
                setStep("아이디선택")
            }}/>}
            {step == "아이디선택" && <아이디선택 onNext={(data)=>{
                //중복확인
                data = data.replace(/@/g, "");
                
                setResgisterData(prev => ({...prev, "nickname": data}))
                setStep("입장")
            }}/>}
            {step == "입장" && <입장 onNext={async ()=>{

                const _userInfo = await registerUser(registerData)

                setUserInfoCookie(_userInfo._id)
                setUserInfo(_userInfo)
                navigate("/home")
            }}/>}
        </AlignBox>
    )
}


export default Login;