import styled from "@emotion/styled";
import { Text, MarginBox } from "../styles/atom";
import { useDropdown } from "../hooks/useDropdown";


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
  z-index: 99;
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
    lable?: string;
    placeholder?: string;
    value?: string;
}

export const Dropdown = ({
  setValue,
  list,
  lable,
  placeholder,
  value,
}: DropdownProps) => {
  const {
    value: dropdownValue,
    isMenuOpen,
    handleButtonClick,
    handleMenuItemClick,
  } = useDropdown(value);

  const handleDropdownMenuItemClick = (department: string) => {
    setValue(department);
    handleMenuItemClick(department);
  };

  return (
    <>
      {lable && (
        <Text fontsize={16} content={lable} weight={700} color="#707070" />
      )}
      <MarginBox top={1} />
      <DropdownContainer>
        <DropdownButton onClick={handleButtonClick}>
          {dropdownValue || placeholder}
        </DropdownButton>
        {isMenuOpen && (
          <DropdownMenu>
            {list.map((department) => (
              <DropdownMenuItem
                key={department}
                onClick={() => handleDropdownMenuItemClick(department)}
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