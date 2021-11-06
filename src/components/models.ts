import { ReactNode } from "react";

export interface ITitleProps {
  title?: string;
  className?: string;
}

export interface ITextProps {
  text?: string;
  className?: string;
  onClick?: () => void;
}

export interface IButtonProps {
  buttonText?: string | ReactNode | any;
  className?: string;
  buttonType?: boolean;
  loading?: boolean;
  type?: string | any;
  onClick?: () => void;
}

export interface IInputProps {
  htmlFor?: string;
  label?: string;
  type?: string;
  value?: string;
  name?: string;
  className?: string;
  errorsMessage?: string | boolean | ReactNode;
  icon?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IconProps {
  onClick?: () => void;
  className?: string;
  fill?: string;
}
