import { Dropdown } from "../../components/Dropdown";
import { PaddingBox, MarginBox, Text, AlignBox, BigIcon, MainBtn, ShortInputBox } from "../../styles/atom";
import { useState } from "react";


type onNextType = {
    onNext: (data?: string) => void; 
};

type NavFunction = (onNext: onNextType) => JSX.Element;


export const 초기화면: NavFunction = ({onNext}:onNextType) => {
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

export const 휴대폰인증: NavFunction = ({onNext}:onNextType) => {

    const [phone, setPhone] = useState<string>("")

    return (<PaddingBox left={9} right={9}>
        <AlignBox align="left" justify="top">
            <MarginBox top={20} />
            <Text fontsize={24} content={"휴대폰 번호를 입력해주세요"} weight={700} />
            <MarginBox top={1} />
            <Text fontsize={14} content={"본인확인을 위해서 필요합니다"} />
            <MarginBox top={4} />
            <ShortInputBox setValue={setPhone} lableText="휴대폰 번호" />
        </AlignBox>
        <AlignBox align="center">
            <MainBtn onClick={()=>{onNext(phone)}}>다음</MainBtn>
        </AlignBox>
        </PaddingBox>
    )
}

export const 인증번호입력: NavFunction = ({onNext}:onNextType) => {

    const [인증번호, set인증번호] = useState<string>("")

    return (<PaddingBox left={9} right={9}>
        <AlignBox align="left" justify="top">
            <MarginBox top={20} />
            <Text fontsize={24} content={"인증번호를 입력해주세요"} weight={700} />
            <MarginBox top={1} />
            <Text fontsize={14} content={"본인확인을 위해서 필요합니다"} />
            <MarginBox top={4} />
            <ShortInputBox setValue={set인증번호} lableText="인증번호"/>
        </AlignBox>
        <AlignBox align="center">
            <MainBtn onClick={()=>{onNext()}}>다음</MainBtn>
        </AlignBox>
        </PaddingBox>)
}


const departments: string[] = [
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

export const 학과선택: NavFunction = ({onNext}:onNextType) => {
    
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

export const 학번선택: NavFunction = ({onNext}:onNextType) => {

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


export const 아이디선택: NavFunction = ({onNext}:onNextType) => {

    const [id, setID] = useState<string>("@")

    return (<PaddingBox left={9} right={9}>
        <AlignBox align="left" justify="top">
            <MarginBox top={20} />
            <Text fontsize={24} content={"멋진 아이디를 만들어주세요"} weight={700} />
            <MarginBox top={1} />
            <Text fontsize={14} content={"다른 사용자에게 공개되는 아이디에요"} />
            <MarginBox top={4} />
            <ShortInputBox value={id} setValue={setID} lableText="아이디" defaultValue="@" type="text"/>
        </AlignBox>
        <AlignBox align="center">
            <MainBtn onClick={()=>{onNext(id)}}>다음</MainBtn>
        </AlignBox>
        </PaddingBox>)
}



export const 입장: NavFunction = ({onNext}:onNextType) => {

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
            <MainBtn onClick={()=>{onNext()}}>입장하기</MainBtn>
        </AlignBox>
        </PaddingBox>)
}