import { FC } from "react";
import Header from "./Header";

const HomeLayout: FC = ({ children }) => {
  return (
    <div className="home-layout">
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
