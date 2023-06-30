import styled from "@emotion/styled";



type TextProps = {
    fontsize: 60 | 40 | 24 | 20 | 16 | 14 | 10 | 9;
    content: string
    color?: "#2400FF" | "#000" | "#FFF" | "#466FFF" | "#707070";
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

type MarginBoxProps = {
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

type PaddingBoxProps = {
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

type AlignBoxProps = {
    justify?: "top" | "bottom" | "center";
    align?: "left" | "right" | "center";
};

export const AlignBox = styled.div<AlignBoxProps>`
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