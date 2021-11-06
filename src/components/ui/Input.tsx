import { useState } from "react";
import { IInputProps } from "../models";

const Input = ({
  htmlFor,
  label,
  icon,
  type,
  value,
  name,
  errorsMessage,
  className = "",
  onChange,
}: IInputProps) => {
  const [fieldActive, setFieldActive] = useState<boolean>(false);

  const handleBlur = (text: any) => {
    if (text === "") {
      setFieldActive(false);
    }
  };

  const handleFocus = () => {
    setFieldActive(true);
  };

  return (
    <div className="field-container">
      {icon}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={(e) => handleBlur(e.target.value)}
        onFocus={handleFocus}
        className={
          fieldActive
            ? "field-container__input-active"
            : "field-container__input"
        }
      />
      <label
        className={
          fieldActive ? "field-container__active" : "field-container__label"
        }
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {errorsMessage && (
        <div className="field-container__error">{errorsMessage}</div>
      )}
    </div>
  );
};

export default Input;
