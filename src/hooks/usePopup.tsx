import { useState } from "react";

const usePasswordActive = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopupOpen = () => {
    setIsOpen(true);
  };

  const togglePopupClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    togglePopupOpen,
    togglePopupClose,
  };
};

export default usePasswordActive;
