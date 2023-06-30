import { useState } from "react";

export const useDropdown = (initialValue?: string) => {
    const [value, setValue] = useState(initialValue);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const handleButtonClick = () => {
      setIsMenuOpen((prev) => !prev);
    };
  
    const handleMenuItemClick = (department: string) => {
      setValue(department);
      setIsMenuOpen(false);
    };
  
    return {
      value,
      isMenuOpen,
      handleButtonClick,
      handleMenuItemClick,
    };
  };
  