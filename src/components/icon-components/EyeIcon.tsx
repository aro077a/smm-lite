import { IconProps } from "../models";

const EyeIcon = ({ onClick, className }: IconProps) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M19.4 15C19.4 17.4301 17.4301 19.4 15 19.4C12.5699 19.4 10.6 17.4301 10.6 15C10.6 12.5699 12.5699 10.6 15 10.6C17.4301 10.6 19.4 12.5699 19.4 15Z"
        stroke="#C7C9D9"
        strokeWidth="1.2"
      />
      <path
        d="M25.4469 13.9287C25.8314 14.4088 26.0237 14.6489 26.0237 15C26.0237 15.3511 25.8314 15.5912 25.4469 16.0713C23.7871 18.1438 19.7352 22.5 15 22.5C10.2648 22.5 6.21291 18.1438 4.55311 16.0713C4.16856 15.5912 3.97629 15.3511 3.97629 15C3.97629 14.6489 4.16856 14.4088 4.55311 13.9287C6.21291 11.8562 10.2648 7.5 15 7.5C19.7352 7.5 23.7871 11.8562 25.4469 13.9287Z"
        stroke="#C7C9D9"
        strokeWidth="1.2"
      />
    </svg>
  );
};

export default EyeIcon;
