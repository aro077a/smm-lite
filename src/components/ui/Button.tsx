import { IButtonProps } from "../models";

const Button = ({
  buttonText,
  className,
  buttonType,
  type,
  loading,
  onClick,
}: IButtonProps) => {
  return (
    <button
      type={type}
      className={
        buttonType ? "button-disabled" : loading ? "button-loading" : "button"
      }
      onClick={onClick}
      disabled={buttonType}
    >
      {buttonText}
    </button>
  );
};

export default Button;
