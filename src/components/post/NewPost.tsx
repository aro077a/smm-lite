import Text from "../ui/Text";
import Title from "../ui/Title";
import { ChangeEvent, useCallback, useState } from "react";
import UploadImage from "./UploadImage";
import ScheduleText from "./ScheduleText";
import Button from "../ui/Button";
import editIcon from "../../assets/icons/edit-icon.svg";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import usePopup from "../../hooks/usePopup";
import Popup from "../ui/Popup";
import Calendar from "react-calendar";
import TimeField from "react-simple-timefield";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { postSchedule } from "../../redux/features/postScheduleSlice";
import { SpinnerCircular } from "spinners-react";
import { RootState } from "../../redux/store";
import { TScheduleError } from "../../redux/features/models";
import { convertBase64 } from "../../utils/helpers";

const NewPost = ({ togglePopupClose }: any) => {
  const {
    isOpen: isDateOpen,
    togglePopupOpen: openDatePopup,
    togglePopupClose: closeDatePopup,
  }: any = usePopup();

  const { loading, errors } = useSelector(
    ({ schedule }: RootState) => ({
      loading: schedule.loading,
      errors: schedule.errors,
    }),
    shallowEqual
  );

  const [letterCount, setLetterCount] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("12:00");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [postDate, setPostDate] = useState({
    date: new Date(),
    time: "12:00",
  });

  const [scheduleData, setScheduleData] = useState<any>({
    publish_at: null,
    image: "",
    text: "",
  });

  const dispatch = useDispatch();

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>, time: string) => {
    setCurrentTime(time);
  };

  const saveDate = () => {
    setPostDate({
      ...postDate,
      date: currentDate,
      time: currentTime,
    });
    setScheduleData({
      ...scheduleData,
      publish_at: `${format(currentDate, "yyyy-MM-dd")} ${currentTime}`,
    });
    closeDatePopup();
  };
  const saveCreatedSchedule = useCallback(() => {
    dispatch(postSchedule(scheduleData));
    // if (errors?.length === 0) {
    //   togglePopupClose();
    // }
  }, [dispatch, scheduleData]);

  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement> | any) => {
    const image = e.target.files[0];
    setCurrentImage(image);
    const base64 = (await convertBase64(image)) as any;
    const convertToBase64 = base64?.replace("data:image/jpeg;base64,", "");
    setScheduleData({
      ...scheduleData,
      image: {
        name: image.name,
        content: convertToBase64,
      },
    });
  };

  const handleTextChange = (e: any) => {
    setLetterCount(e.target.value.length);
    const postText = e.target.value;
    setScheduleData({ ...scheduleData, text: postText });
  };

  const { date, time } = postDate;
  return (
    <div className="new-post">
      <div className="new-post__title-block">
        <Title title="Запланировать пост" />
        <Text text="Выберите фотографию, добавьте текстовое сопровождение и укажите время. Пост будет опубликован автоматически :)" />
      </div>
      <div className="new-post__content">
        <div className="new-post__content--upload">
          <UploadImage
            handleImageSelect={handleImageSelect}
            currentImage={currentImage}
          />
        </div>
        <div className="new-post__content--text">
          <ScheduleText
            handleTextChange={handleTextChange}
            letterCount={letterCount}
          />
        </div>
      </div>
      {errors.length !== 0 ? (
        errors.map((error: TScheduleError) => {
          return (
            <div className="new-post--errors">
              <Text text={error.message} />;
            </div>
          );
        })
      ) : (
        <></>
      )}
      <div className="new-post__date">
        <div className="new-post__date__content">
          <div className="new-post__date__content--notify">
            <Text text="Уведомить о публикации по email" />
            <input type="checkbox" />
          </div>
          <Text
            text="Будет опубликовано"
            className="new-post__date__content--info"
          />
          <div
            className="new-post__date__content--time"
            onClick={openDatePopup}
          >
            <Text
              text={`${format(date, "dd LLLL", { locale: ru })} в ${time}`}
            />
            <img src={editIcon} alt="edit" onClick={openDatePopup} />
          </div>
          <div className="new-post__date__content__calendar">
            {isDateOpen && (
              <Popup togglePopupClose={closeDatePopup}>
                <Title title="Выберите день публикации" />
                <Calendar onChange={handleDateChange} value={currentDate} />
                <Title title="Укажите время" />
                <TimeField
                  value={currentTime}
                  onChange={(e: ChangeEvent<HTMLInputElement>, value: string) =>
                    handleTimeChange(e, value)
                  }
                />
                <div className="new-post__date__content__calendar--buttons">
                  <Button buttonText="Сохранить" onClick={saveDate} />
                  <Button buttonText="Отмена" onClick={closeDatePopup} />
                </div>
              </Popup>
            )}
          </div>
        </div>
        <div className="new-post__date__buttons">
          <Button
            onClick={saveCreatedSchedule}
            buttonText={
              loading ? (
                <SpinnerCircular
                  size={23}
                  thickness={148}
                  speed={137}
                  color="rgba(255, 255, 255, 0.94)"
                  secondaryColor="rgba(57, 172, 112, 0)"
                />
              ) : (
                "Запланировать"
              )
            }
            loading={loading}
          />
          <Button buttonText="Отменить" onClick={togglePopupClose} />
        </div>
      </div>
    </div>
  );
};

export default NewPost;
