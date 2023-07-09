import { useState } from "react";
import { useNavigate } from "react-router"
import { AlignBox } from "../../styles/atom";
import { 초기화면, 휴대폰인증, 인증번호입력, 학과선택, 학번선택, 아이디선택, 입장 } from "./화면";
import { sendAuthMsg } from "../../apis/sendAuthMsg";
import { registerUser } from "../../apis/user";


const Login = () => {
    
    type RegisterPage = "초기화면"|"휴대폰인증"|"인증번호입력"|"학과선택"|"학번선택"|"아이디선택"|"입장"
    
    const navigate = useNavigate()
    const [step, setStep] = useState<RegisterPage>("초기화면")
    const [registerData, setResgisterData] = useState({"school":"인하대"})
    const [authCode, setAuthCode] = useState<number>(0)

    return (
        <AlignBox>
            {step == "초기화면" && <초기화면 onNext={()=>{
                setStep("휴대폰인증")
            }}/>}
            {step == "휴대폰인증" && <휴대폰인증 onNext={ async (data: string)=>{
                setResgisterData(prev => ({...prev, "phone": data}))
                const _authCode = await sendAuthMsg(data)
                setAuthCode(_authCode)
                setStep("인증번호입력")
            }}/>}
            {step == "인증번호입력" && <인증번호입력 onNext={(data: string)=>{
                
                authCode.toString() === data ? setStep("학과선택") : alert("인증번호가 일치하지 않습니다 😭")
                //인증번호와 일치하는지 확인
            }}/>}
            {step == "학과선택" && <학과선택 onNext={(data: string)=>{
                setResgisterData(prev => ({...prev, "major": data}))
                console.log(data)
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
                console.log(data)
                setStep("입장")
            }}/>}
            {step == "입장" && <입장 onNext={async ()=>{
                console.log(registerData)

                await registerUser(registerData)
                //회원가입 or 로그인
                navigate("/home")
            }}/>}
        </AlignBox>
    )
}


export default Login;