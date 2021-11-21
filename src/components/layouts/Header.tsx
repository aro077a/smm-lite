import Logo from "../icon-components/Logo";
import headerLeft from "../../assets/icons/header-left.svg";
import headerRight from "../../assets/icons/header-right.svg";
import instaIcon from "../../assets/images/instagram.png";
import rusFlag from "../../assets/icons/rus_flag.svg";
import Text from "../ui/Text";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import ToolTip from "../ui/ToolTip";
import Popup from "../ui/Popup";
import usePopup from "../../hooks/usePopup";
import InstagramAuthContainer from "../instagram-auth/InstagramAuthContainer";
import { useEffect } from "react";
import { getUser } from "../../redux/features/getAccountSlice";
import { RootState } from "../../redux/store";
import { TUserAccount } from "../../redux/features/models";

const Header = () => {
  const { isOpen, togglePopupClose, togglePopupOpen } = usePopup();

  const { account } = useSelector(
    ({ user }: RootState) => ({
      account: user.account,
    }),
    shallowEqual
  );

  const { success } = useSelector(
    ({ instagramAuth }: RootState) => ({
      success: instagramAuth.success,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleLogout = () => {
    const token = localStorage.getItem("token") as any;
    dispatch(logout(token));
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

          {account?.length === 0 ? (
            <ToolTip
              theme="dark"
              position="bottom"
              title="Подключите аккаунт instagram,
                    чтобы пользоваться сервисом"
            >
              <Text
                text="Подключить instagram"
                className="header__left-block__user--info"
                onClick={togglePopupOpen}
              />
            </ToolTip>
          ) : (
            account?.map((user: TUserAccount) => {
              return (
                <Text
                  key={user.id}
                  text={user.username}
                  className="header__left-block__user--name"
                />
              );
            })
          )}
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
      {!success && isOpen && (
        <Popup togglePopupClose={togglePopupClose}>
          <InstagramAuthContainer />
        </Popup>
      )}
    </header>
  );
};

export default Header;
