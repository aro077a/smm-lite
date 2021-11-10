import Text from "../ui/Text";
import Title from "../ui/Title";
import { ChangeEvent, useState } from "react";
import UploadImage from "./UploadImage";
import ScheduleText from "./ScheduleText";
import Button from "../ui/Button";
import editIcon from "../../assets/icons/edit-icon.svg";

const SchedulePost = () => {
  const [scheduleData, setScheduleData] = useState<any>({
    image: "",
    text: "",
  });

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement> | any) => {
    const image = e.target.files[0];
    // const formData = new FormData();
    // formData.append("image", image, "insta-image");
    setScheduleData({ ...scheduleData, image });
  };

  const handleTextChange = (e: any) => {
    console.log(e.target.value.length);
  };

  const { image } = scheduleData;
  return (
    <div className="schedule">
      <div className="schedule__title-block">
        <Title title="Запланировать пост" />
        <Text text="Выберите фотографию, добавьте текстовое сопровождение и укажите время. Пост будет опубликован автоматически :)" />
      </div>
      <div className="schedule__content">
        <div className="schedule__content--upload">
          <UploadImage handleImageSelect={handleImageSelect} image={image} />
        </div>
        <div className="schedule__content--text">
          <ScheduleText handleTextChange={handleTextChange} />
        </div>
      </div>
      <div className="schedule__date">
        <div className="schedule__date__content">
          <div className="schedule__date__content--notify">
            <Text text="Уведомить о публикации по email" />
            <input
              type="checkbox"
              // id="remember"
              // className="signIn__remember--checkbox"
            />
          </div>
          <Text
            text="Будет опубликовано"
            className="schedule__date__content--info"
          />
          <div className="schedule__date__content--time ">
            <Text text="15 октября в 14:00" />
            <img src={editIcon} alt="edit" />
          </div>
        </div>
        <div className="schedule__date__buttons">
          <Button buttonText="Запланировать" />
          <Button buttonText="Отменить" />
        </div>
      </div>
    </div>
  );
};

export default SchedulePost;
