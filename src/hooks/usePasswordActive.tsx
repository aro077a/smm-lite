import { useState } from "react";

const usePasswordActive = () => {
  const [isPassActive, setIsPassActive] = useState(false);

  const toggleActive = () => {
    setIsPassActive(!isPassActive);
  };

  return {
    isPassActive,
    toggleActive,
  };
};

export default usePasswordActive;
