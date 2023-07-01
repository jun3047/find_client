import styled from "@emotion/styled";
import { HTMLAttributes } from "react";


type TextProps = {
    fontsize: 60 | 40 | 24 | 20 | 16 | 14 | 12 | 10 | 9;
    content: string
    color?: "#2400FF" | "#000" | "#FFF" | "#466FFF" | "#707070" | "#D9D9D9";
    weight?: 700 | 400;
};

export const Text = ({ fontsize, color = "#000", weight=400, content }:TextProps): JSX.Element => {
    const style: React.CSSProperties = {
        fontSize: fontsize + "px",
        color: color,
        fontWeight: weight,
    };

    return <span style={style}>{content}</span>;
};


//기본 BOX

interface EmtpyBoxProps extends HTMLAttributes<HTMLDivElement> {
    width?: number;
    height?: number;
}

export const EmtpyBox = styled.div<EmtpyBoxProps>`
  width: ${({ width }) => (width ? `${width}vw` : "0")};;
  height: ${({ height }) => (height ? `${height}vw` : "0")};;
`

interface MarginBoxProps extends HTMLAttributes<HTMLDivElement> {
    right?: number;
    top?: number;
    left?: number;
    bottom?: number;
};

export const MarginBox = styled.div<MarginBoxProps>`
  width: 100%;
  height: 100%;
  margin-right: ${({ right }) => (right ? `${right}vw` : "0")};
  margin-top: ${({ top }) => (top ? `${top}vh` : "0")};
  margin-left: ${({ left }) => (left ? `${left}vw` : "0")};
  margin-bottom: ${({ bottom }) => (bottom ? `${bottom}vh` : "0")};
`;

interface PaddingBoxProps extends HTMLAttributes<HTMLDivElement> {
    right?: number;
    top?: number;
    left?: number;
    bottom?: number;
};

export const PaddingBox = styled.div<PaddingBoxProps>`
    padding-right: ${({ right }) => (right ? `${right}vw` : "0")};
    padding-top: ${({ top }) => (top ? `${top}vh` : "0")};
    padding-left: ${({ left }) => (left ? `${left}vw` : "0")};
    padding-bottom: ${({ bottom }) => (bottom ? `${bottom}vh` : "0")};
`;



interface AlignBoxProps extends HTMLAttributes<HTMLDivElement> {
    justify?: "top" | "bottom" | "center";
    align?: "left" | "right" | "center";
    direction?: "row" | "column";
};

export const AlignBox = styled.div<AlignBoxProps>`
    width: 100%;
    height: 100%;
  display: flex;
  flex-direction: ${({direction}) => direction || "column"};
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


//BUTTON

export const MainBtn = styled.div`
    width: 81vw;
    height: 6vh;
    background: #466FFF;
    box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    color: white;
    
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
`

type SubBtnProps = {
    theme: "find" | "pass" | "warn";
}


export const SubBtn = ({ theme }: SubBtnProps) => {

    const themeColor = theme === "find" ? "1px solid #466FFF" :
                        theme === "pass" ? "1px solid #FF7979" :
                                        "1px solid #FFE484"
    
    const SubBtnContainer = styled.div`
            width: 15vw;
            height: 15vw;
            border-radius: 50%;
            border: ${themeColor};
            display: flex;
            align-items: center;
            justify-content: center;
    `

    const imgUrl = process.env.PUBLIC_URL + `/icons/${theme}.svg`

    return(<SubBtnContainer>
        <img src={imgUrl} />
    </SubBtnContainer>)
}



type BackBtnProp = {
    onClick: () => void
}

export const BackBtn = ({onClick}:BackBtnProp) => {

    const imgUrl = process.env.PUBLIC_URL + `/icons/back.svg`

    return (
    <BackBtnContainer onClick={onClick}>
        <EmtpyBox width={1} />
        <img src={imgUrl} />
    </BackBtnContainer>
    )
}

const BackBtnContainer = styled.div`
    position: absolute;
    left: 10px;
`




//ICON
export const BigIcon = styled.div`
    font-size: 100px;
    height: 10vh;
`



//INPUT

type InputFieldProps = {
    type?: string;
    min?: string;
    max?: string;
    defaultValue?: string
    value?: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  };

export const InputField = styled.input<InputFieldProps>`
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

export const InputBox = ({setValue, lableText, defaultValue, value, type}:InputBoxProps) => {

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