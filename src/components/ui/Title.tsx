import { ITitleProps } from "../models";

const Title = ({ title, className }: ITitleProps) => {
  return <h1 className={className}>{title}</h1>;
};

export default Title;
