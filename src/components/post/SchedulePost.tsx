import Text from "../ui/Text";
import Title from "../ui/Title";
import { ChangeEvent, useState } from "react";
import UploadImage from "./UploadImage";
import ScheduleText from "./ScheduleText";

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

  const { image } = scheduleData;
  return (
    <div className="schedule">
      <div className="schedule__title-block">
        <Title title="Запланировать пост" />
        <Text text="Выберите фотографию, добавьте текстовое сопровождение и укажите время. Пост будет опубликован автоматически :)" />
      </div>
      <div className="schedule__content">
        {/*  <AddText/> */}
        <div className="schedule__content--upload">
          <UploadImage handleImageSelect={handleImageSelect} image={image} />
        </div>
        <div className="schedule__content--text">
          <ScheduleText />
        </div>
      </div>
    </div>
  );
};

export default SchedulePost;
