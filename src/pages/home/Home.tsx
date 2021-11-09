import SchedulePost from "../../components/post/SchedulePost";
import Button from "../../components/ui/Button";
import Popup from "../../components/ui/Popup";
import Text from "../../components/ui/Text";
import Title from "../../components/ui/Title";
import usePopup from "../../hooks/usePopup";

const Home = () => {
  const { isOpen, togglePopupClose, togglePopupOpen } = usePopup();
  return (
    <div className="home">
      <div className="home__title-block">
        <Title
          title="Запланированные посты"
          className="home__title-block--title"
        />
        <Text
          text="У вас пока нет запланированных постов. Но когда вы создадите свой первый пост, он появятся на этом экране."
          className="home__title-block--description"
        />
        <Button buttonText="Запланировать пост" onClick={togglePopupOpen} />
      </div>
      {isOpen && (
        <Popup togglePopupClose={togglePopupClose}>
          <SchedulePost />
        </Popup>
      )}
    </div>
  );
};

export default Home;
