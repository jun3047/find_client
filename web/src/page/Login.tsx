import { useState } from "react";
import { useNavigate } from "react-router";
import styled from 'styled-components';


type onNextType = {
    onNext: (data?: string) => void; 
};

type NavFunction = (onNext: onNextType) => JSX.Element;


type TextProps = {
    fontsize: 60 | 40 | 24 | 20 | 16 | 14 | 10 | 9;
    content: string
    color?: "#2400FF" | "#000" | "#FFF" | "#466FFF" | "#707070";
    weight?: 700 | 400;
};

const Text = ({ fontsize, color = "#000", weight=400, content }:TextProps): JSX.Element => {
    const style: React.CSSProperties = {
        fontSize: fontsize + "px",
        color: color,
        fontWeight: weight,
    };

    return <span style={style}>{content}</span>;
};

type MarginBoxProps = {
    right?: number;
    top?: number;
    left?: number;
    bottom?: number;
  };


const MarginBox = styled.div<MarginBoxProps>`
  width: 100%;
  height: 100%;
  margin-right: ${({ right }) => (right ? `${right}vw` : "0")};
  margin-top: ${({ top }) => (top ? `${top}vh` : "0")};
  margin-left: ${({ left }) => (left ? `${left}vw` : "0")};
  margin-bottom: ${({ bottom }) => (bottom ? `${bottom}vh` : "0")};
`;

type PaddingBoxProps = {
    right?: number;
    top?: number;
    left?: number;
    bottom?: number;
};

const PaddingBox = styled.div<PaddingBoxProps>`
    padding-right: ${({ right }) => (right ? `${right}vw` : "0")};
    padding-top: ${({ top }) => (top ? `${top}vh` : "0")};
    padding-left: ${({ left }) => (left ? `${left}vw` : "0")};
    padding-bottom: ${({ bottom }) => (bottom ? `${bottom}vh` : "0")};
`;

type AlignBoxProps = {
    justify?: "top" | "bottom" | "center";
    align?: "left" | "right" | "center";
};

const AlignBox = styled.div<AlignBoxProps>`
    width: 100%;
    height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) =>
        justify === "top"
            ? "flex-start"
            : justify === "bottom"
                ? "flex-end"
                : "center"};
  align-items: ${({ align }) =>
        align === "left"
            ? "flex-start"
            : align === "right"
                ? "flex-end"
                : "center"};
  text-align: ${({ align }) =>
        align === "left"
            ? "left"
            : align === "right"
                ? "right"
                : "center"};
`;




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
                console.log(data)
                setStep("인증번호입력")
            }}/>}
            {step == "인증번호입력" && <인증번호입력 onNext={()=>{
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
                setResgisterData(prev => ({...prev, "id": data}))
                console.log(data)
                setStep("입장")
            }}/>}
            {step == "입장" && <입장 onNext={()=>{
                console.log(registerData)
                navigate("/")
            }}/>}
        </AlignBox>
    )
}


const BigIcon = styled.div`
    font-size: 100px;
    height: 10vh;
`

const MainBtn = styled.div`
    width: 81vw;
    height: 6vh;
    background: #466FFF;
    box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    color: white;
    
    display: flex;
    align-items: center;
    justify-content: center;
`




const 초기화면: NavFunction = ({onNext}:onNextType) => {
    return (
        <AlignBox align="center">
            <MarginBox top={28}/>
            <Text fontsize={20} content="대학 친구를 짧은 글에서 발견하세요" weight={700}/>
            <MarginBox top={1}/>
            <BigIcon>🕶</BigIcon>
            <MarginBox top={3}/>
            <Text fontsize={60} content="FIND" weight={700} color="#2400FF"/>
            <MarginBox top={185/815*100}/>
            <MainBtn onClick={()=>{onNext()}}>시작하기</MainBtn>
        </AlignBox>
    )
}

type InputFieldProps = {
    type?: string;
    min?: string;
    max?: string;
    defaultValue?: string
    value?: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  };

const InputField = styled.input<InputFieldProps>`
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 70vw;
  padding: 8px;
  transition: border-color 0.3s ease-in-out;
  font-size: 16px;
  color: #000;

  &:focus {
    color: #466fff;
    outline: none;
    border-color: #466fff;
  }
`;

type InputBoxProps = {
    setValue: (phone:string) => void,
    value?: string,
    lableText: string,
    defaultValue?: string,
    type?: string
}

const InputBox = ({setValue, lableText, defaultValue, value, type}:InputBoxProps) => {

    const handleOnChange = (value: string) => {

        if(defaultValue === "@" && !value.startsWith(defaultValue)){

            if(value.includes("@")) {
                value = value.replace("@", "")
            }
            
            setValue("@" + value)

        }else{
            setValue(value)
        }

    }

    return (<>
        <Text fontsize={16} content={lableText} weight={700} color={"#707070"} />
        <MarginBox top={1} />
        <InputField
            value={value}
            defaultValue={defaultValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e.target.value)}
            type={type} />
        <MarginBox top={3}/>
    </>)
}

const 휴대폰인증: NavFunction = ({onNext}:onNextType) => {

    const [phone, setPhone] = useState<string>("")

    return (<PaddingBox left={9} right={9}>
        <AlignBox align="left" justify="top">
            <MarginBox top={20} />
            <Text fontsize={24} content={"휴대폰 번호를 입력해주세요"} weight={700} />
            <MarginBox top={1} />
            <Text fontsize={14} content={"본인확인을 위해서 필요합니다"} />
            <MarginBox top={4} />
            <InputBox setValue={setPhone} lableText="휴대폰 번호" />
        </AlignBox>
        <AlignBox align="center">
            <MainBtn onClick={()=>{onNext(phone)}}>다음</MainBtn>
        </AlignBox>
        </PaddingBox>
    )
}

const 인증번호입력: NavFunction = ({onNext}:onNextType) => {

    const [인증번호, set인증번호] = useState<string>("")

    return (<PaddingBox left={9} right={9}>
        <AlignBox align="left" justify="top">
            <MarginBox top={20} />
            <Text fontsize={24} content={"인증번호를 입력해주세요"} weight={700} />
            <MarginBox top={1} />
            <Text fontsize={14} content={"본인확인을 위해서 필요합니다"} />
            <MarginBox top={4} />
            <InputBox setValue={set인증번호} lableText="인증번호"/>
        </AlignBox>
        <AlignBox align="center">
            <MainBtn onClick={()=>{onNext()}}>다음</MainBtn>
        </AlignBox>
        </PaddingBox>)
}



type Department = string;

const departments: Department[] = [
  "전자공학과",
  "컴퓨터공학과",
  "화학공학과",
  "전자공학과",
  "컴퓨터공학과",
  "화학공학과",
  "전자공학과",
  "컴퓨터공학과",
  "전자공학과",
  "컴퓨터공학과",
  "화학공학과",
];

const DropdownContainer = styled.div`
  position: relative;
  width: 70vw;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  color: #000;
  background-color: white;
  cursor: pointer;

  &:focus{
    color : #466fff;
  }

  &:hover{
    color : #466fff;
  }
`;


const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 30vh; /* 최대 높이 설정 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 허용 */
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-top: none;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const DropdownMenuItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

type DropdownProps = {
    setValue: (value: string) => void;
    list: string[];
    lable: string;
    placeholder: string;
    value: string;
}

const Dropdown = ({setValue, list, lable, placeholder, value}: DropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuItemClick = (department: Department) => {
    setValue(department);
    setIsMenuOpen(false);
  };

  return (
    <>
      <Text fontsize={16} content={lable} weight={700} color="#707070" />
      <MarginBox top={1} />
      <DropdownContainer>
        <DropdownButton onClick={handleButtonClick}>
          {value || placeholder}
          {/* <Icon name={isMenuOpen ? "chevron-up" : "chevron-down"} size={16} /> */}
        </DropdownButton>
        {isMenuOpen && (
          <DropdownMenu>
            {list.map((department) => (
              <DropdownMenuItem
                key={department}
                onClick={() => handleMenuItemClick(department)}
              >
                {department}
              </DropdownMenuItem>
            ))}
          </DropdownMenu>
        )}
      </DropdownContainer>
    </>
  );
};
  

const 학과선택: NavFunction = ({onNext}:onNextType) => {
    
    const [학과, set학과] = useState<string>("")

    return (<PaddingBox left={9} right={9}>
        <AlignBox align="left" justify="top">
            <MarginBox top={20} />
            <Text fontsize={24} content={"학과를 선택해주세요"} weight={700} />
            <MarginBox top={1} />
            <Text fontsize={14} content={"소중한 개인정보는 안전하게 보호합니다"} />
            <MarginBox top={4} />
            <Dropdown
                setValue={(value: string) => { set학과(value) }}
                list={departments}
                placeholder="학과를 찾아보세요"
                lable="학과 선택" 
                value={학과}/>
            <MarginBox top={3}/>
        </AlignBox>
        <AlignBox align="center">
            <MainBtn onClick={()=>{onNext(학과)}}>다음</MainBtn>
        </AlignBox>
    </PaddingBox>)
}

const 학번목록 = [
    "23",
    "22",
    "21",
    "20",
    "19",
    "18",
    "17",
    "16",
    "15",
    "14",
    "13",
    "12",
    "11",
    "10",
]

const 학번선택: NavFunction = ({onNext}:onNextType) => {

    const [학번, set학번] = useState<string>("")

    return (<PaddingBox left={9} right={9}>
        <AlignBox align="left" justify="top">
            <MarginBox top={20} />
            <Text fontsize={24} content={"학번을 선택해주세요"} weight={700} />
            <MarginBox top={1} />
            <Text fontsize={14} content={"사용자의 작은 정보도 소중하니까요"} />
            <MarginBox top={4} />
            <Dropdown
                setValue={(value: string) => { set학번(value) }}
                list={학번목록}
                placeholder="학번를 찾아보세요"
                lable="학번 선택"
                value={학번}/>
            <MarginBox top={3}/>
        </AlignBox>
        <AlignBox align="center">
            <MainBtn onClick={()=>{onNext(학번)}}>다음</MainBtn>
        </AlignBox>
        </PaddingBox>
    )
}


const 아이디선택: NavFunction = ({onNext}:onNextType) => {

    const [id, setID] = useState<string>("@")

    return (<PaddingBox left={9} right={9}>
        <AlignBox align="left" justify="top">
            <MarginBox top={20} />
            <Text fontsize={24} content={"멋진 아이디를 만들어주세요"} weight={700} />
            <MarginBox top={1} />
            <Text fontsize={14} content={"다른 사용자에게 공개되는 아이디에요"} />
            <MarginBox top={4} />
            <InputBox value={id} setValue={setID} lableText="아이디" defaultValue="@" type="text"/>
        </AlignBox>
        <AlignBox align="center">
            <MainBtn onClick={()=>{onNext(id)}}>다음</MainBtn>
        </AlignBox>
        </PaddingBox>)
}



const 입장: NavFunction = ({onNext}:onNextType) => {

    return (<PaddingBox left={9} right={9}>
        <AlignBox align="left" justify="top">
            <MarginBox top={20} />
            <Text fontsize={24} content={"환영합니다"} weight={700} />
            <MarginBox top={1} />
            <Text fontsize={14} content={"진심이 담긴 글을 쓰고, 멋진 친구를 만나봐요"} />
            <MarginBox top={22} />
        </AlignBox>
        <AlignBox align="center">
            <BigIcon>🥳</BigIcon>
            <MarginBox top={22} />
            <MainBtn onClick={()=>{onNext()}}>다음</MainBtn>
        </AlignBox>
        </PaddingBox>)
}


export default Login;