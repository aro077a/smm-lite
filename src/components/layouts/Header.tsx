import Logo from "../icon-components/Logo";
import headerLeft from "../../assets/icons/header-left.svg";
import headerRight from "../../assets/icons/header-right.svg";
import instaIcon from "../../assets/images/instagram.png";
import rusFlag from "../../assets/icons/rus_flag.svg";
import Text from "../ui/Text";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(localStorage.getItem("token")));
  };
  return (
    <header className="header">
      <div className="header__left-block">
        <div className="header__left-block--logo">
          <img src={headerLeft} alt="header-left" />
          <Logo fill="#ffffff" />
        </div>
        <div className="header__left-block--line"></div>
        <div className="header__left-block__user">
          <div className="header__left-block__user--icon">
            <img src={instaIcon} alt="insta-icon" />
          </div>
          <Text
            text="Подключить instagram"
            className="header__left-block__user--info"
          />
        </div>
      </div>
      <div className="header__right-block">
        <div className="header__right-block--language">
          <img src={rusFlag} alt="russian" />
        </div>
        <div className="header__right-block__logout">
          <Text
            text="Выйти"
            className="header__right-block__logout--info"
            onClick={handleLogout}
          />
        </div>
      </div>
      <img src={headerRight} alt="header-left" className="header--right-icon" />
    </header>
  );
};

export default Header;
