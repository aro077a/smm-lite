import topLeft from "../../assets/icons/top-left.svg";
import leftMiddle from "../../assets/icons/middle-left.svg";
import topRight from "../../assets/icons/top-right.svg";
import rightMiddle from "../../assets/icons/right-middle.svg";
import rightBottom from "../../assets/icons/right-bottom.svg";
import { FC } from "react";
import Logo from "../icon-components/Logo";

const AuthLayout: FC = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout--logo">
        <Logo fill="#000000" />
        {/* <img src={authLogo} alt="top-right" /> */}
      </div>
      <div className="auth-layout__left-images">
        <div className="auth-layout__left-images--top">
          <img src={topLeft} alt="top-left" />
        </div>
        <div className="auth-layout__left-images--middle">
          <img src={leftMiddle} alt="middle-left" />
        </div>
      </div>
      <div className="auth-layout__right-images">
        <div className="auth-layout__right-images--top">
          <img src={topRight} alt="top-right" />
        </div>
        <div className="auth-layout__right-images--middle">
          <img src={rightMiddle} alt="right-middle" />
        </div>
        <div className="auth-layout__right-images--bottom">
          <img src={rightBottom} alt="right-bottom" />
        </div>
      </div>
      <div className="auth-layout__container">{children}</div>
    </div>
  );
};

export default AuthLayout;
