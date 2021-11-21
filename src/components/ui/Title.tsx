import { ITitleProps } from "../models";

const Title = ({ title, className, onClick }: ITitleProps) => {
  return (
    <h1 className={className} onClick={onClick}>
      {title}
    </h1>
  );
};

export default Title;
