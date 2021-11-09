import Button from "../../components/ui/Button";
import Text from "../../components/ui/Text";
import Title from "../../components/ui/Title";

const Home = () => {
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
        <Button buttonText="Запланировать пост" />
      </div>
    </div>
  );
};

export default Home;
