import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom';
import { AlignBox, EmtpyBox } from '../../styles/atom';
  
function Landing() {
    return <LandingPage></LandingPage>
}

function LandingPage() {

    const navigate = useNavigate();

    return (

    <>
      <Wrapper>
        <AlignBox align="center">
          <FullImage src={`${process.env.PUBLIC_URL}/img/인스타9개올릴거.jpg`}/>
        </AlignBox>
        <MarginBottom size="100px"/>
        <SubTitle>*현재는 인하대만 가능합니다.</SubTitle>
        <SubTitle>*<Blue>오른쪽 위에 버튼</Blue>을 눌러서, <b>반드시 크롬/사파리/브라우저 등에서 열어주세요</b></SubTitle>
        <MarginBottom size="30px"/>
        <AlignBox align="center">
          <Title>⬇️</Title>
        </AlignBox>
        <MarginBottom size="100px"/>
        <MarginBottom size="100px"/>
      </Wrapper>
      <Wrapper>
      <MarginBottom size="200px"/>
      
      {/* <SubTitle>인연의 시작 <Blue>FIND</Blue></SubTitle> */}
      <Title>글을 넘기다가, <br/><Blue>FIND</Blue> 보내보세요</Title>
      <Image src={`${process.env.PUBLIC_URL}/gif/글을넘기다가FIND를 보내세요.gif`}/>

      <MarginBottom size="100px"/>


      {/* <SubTitle align={"right"}>이상한 사람이 걱정되나요? 그럼 <Blue>상대의 생각도 엿봐요</Blue></SubTitle> */}
      <Title align={"right"}>기분좋은 <Blue>FIND</Blue>를 받고, <br/>대화를 시작해요</Title>
      <Right>
        <Image src={`${process.env.PUBLIC_URL}/gif/글을통해알림받고친추하세요.gif`}/>
      </Right>

      <MarginBottom size="100px"/>
      <SubTitle>무슨 말을 해야할지 모르겠나요?</SubTitle>
      <Title><Blue>랜덤 질문</Blue>을 통해 <br/>상대를 알아가요</Title>
      <Image src={`${process.env.PUBLIC_URL}/gif/연락하고질문하세요.gif`}/>

      <MarginBottom size="100px"/>

      <SubTitle align={"right"}>당신을 좋아하는 사람에게 <Blue>FIND</Blue>가 올거에요</SubTitle>
      <Title align={"right"}>질문을 택하고,<br/> 진심이 담긴 <Blue>글</Blue>을 쓰세요</Title>
      <Right>
        <Image src={`${process.env.PUBLIC_URL}/gif/질문을고르고글을쓰세요.gif`}/>
      </Right>

      <MarginBottom size="140px"/>
      <Btn onClick={() => navigate('/')}>FIND 가입하기</Btn>
      <MarginBottom size="100px"/>
      <EmtpyBox height={10}/>
      </Wrapper>
    </>
    );
}

const Btn = styled.div`

    width: 81vw;
    height: 7vh;
    background: #466FFF;
    box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    color: white;
    
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
`


const BlueTape = styled.div`
    background: #007AFE;
    width: 100%;
    height: 40px;
`

const Right = styled.div`
    text-align: right;
`

const Image = styled.img`
margin-top: 20px;
max-width: 80%;
color: inherit;
`;

const FullImage = styled.img`
max-width: 100vw;
color: inherit;
`;


const Wrapper = styled.div`
    margin: 20px 30px;
`

const Title = styled.h2`
    margin: 0;
    padding: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    letter-spacing: -0.3px;
    line-height: 165.84%;
    text-align: ${(props) => props.align};
`

const SubTitle = styled.p`
    margin: 0;
    padding: 0;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 17px;

    letter-spacing: -0.3px;
    text-align: ${(props) => props.align};
`

const Blue = styled.span`
    color: #007AFE;
`

const MarginBottom = styled.div`
    margin-bottom: ${(props) => props.size};
`

export default Landing;