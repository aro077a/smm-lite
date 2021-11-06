import { ITextProps } from "../models";

const Text = ({ text, className, onClick }: ITextProps) => {
  return (
    <p className={className} onClick={onClick}>
      {text}
    </p>
  );
};

export default Text;
