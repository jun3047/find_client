import { useState } from "react";
import { useNavigate } from "react-router"
import { AlignBox } from "../../styles/atom";
import { 초기화면, 휴대폰인증, 인증번호입력, 학과선택, 학번선택, 아이디선택, 입장 } from "./화면";


const Login = () => {
    
    type RegisterPage = "초기화면"|"휴대폰인증"|"인증번호입력"|"학과선택"|"학번선택"|"아이디선택"|"입장"
    
    const navigate = useNavigate()
    const [step, setStep] = useState<RegisterPage>("초기화면")
    const [registerData, setResgisterData] = useState({"school":"인하대"})

    return (
        <AlignBox>
            {step == "초기화면" && <초기화면 onNext={()=>{
                setStep("휴대폰인증")
            }}/>}
            {step == "휴대폰인증" && <휴대폰인증 onNext={(data)=>{
                setResgisterData(prev => ({...prev, "phone": data}))
                setStep("인증번호입력")
            }}/>}
            {step == "인증번호입력" && <인증번호입력 onNext={()=>{
                //인증번호와 일치하는지 확인
                setStep("학과선택")
            }}/>}
            {step == "학과선택" && <학과선택 onNext={(data)=>{
                setResgisterData(prev => ({...prev, "major": data}))
                console.log(data)
                setStep("학번선택")
            }}/>}
            {step == "학번선택" && <학번선택 onNext={(data)=>{
                setResgisterData(prev => ({...prev, "class": data}))
                console.log(data)
                setStep("아이디선택")
            }}/>}
            {step == "아이디선택" && <아이디선택 onNext={(data)=>{
                //중복확인
                setResgisterData(prev => ({...prev, "id": data}))
                console.log(data)
                setStep("입장")
            }}/>}
            {step == "입장" && <입장 onNext={()=>{
                console.log(registerData)
                //회원가입 or 로그인
                navigate("/home")
            }}/>}
        </AlignBox>
    )
}


export default Login;