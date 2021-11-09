import RightArrowIcon from "../icon-components/RightArrowIcon";
import instaSquare from "../../assets/images/instagram_square.png";
import Text from "../ui/Text";
import Title from "../ui/Title";

const InstagramAuth = ({ handleOpenForm, handleOpenAPIAuth }: any) => {
  return (
    <div className="insta-auth">
      <div className="insta-auth__title-block">
        <Title title="Выберите" />
        <Title title="тип подключения" />
      </div>
      <div className="insta-auth__content">
        <div className="insta-auth__content__block" onClick={handleOpenForm}>
          <div>
            <img src={instaSquare} alt="instagram" />
            <Text text="С помощью логина и пароля" />
          </div>
          <RightArrowIcon />
        </div>
        <div className="insta-auth__content__block" onClick={handleOpenAPIAuth}>
          <div>
            <img src={instaSquare} alt="instagram" />
            <Text text="Через официальный API" />
          </div>
          <RightArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default InstagramAuth;
