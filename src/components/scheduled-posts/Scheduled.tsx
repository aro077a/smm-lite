import { TSchedulePosts } from "../models";
import Button from "../ui/Button";
import Text from "../ui/Text";
import editIcon from "../../assets/icons/edit-icon.svg";
import trashIcon from "../../assets/icons/trash-icon.svg";
import usePopup from "../../hooks/usePopup";
import Popup from "../ui/Popup";
import Title from "../ui/Title";
import Calendar from "react-calendar";
import TimeField from "react-simple-timefield";
import { ChangeEvent, useState } from "react";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import RemovePostPopup from "./RemovePostPopup";
import { useDispatch } from "react-redux";
import {
  publishSchedule,
  updateSchedule,
} from "../../redux/features/publishSchedule";

const Scheduled = ({
  account,
  id,
  image,
  publish_at,
  text,
  handleDeletePost,
  loading,
  isDeletePopupOpen,
  deletePostPopupClose,
  handleSetId,
}: TSchedulePosts) => {
  const { isOpen, togglePopupClose, togglePopupOpen } = usePopup();

  const dispatch = useDispatch();

  const [editDate, setEditDate] = useState<any>({
    date: publish_at?.substr(0, publish_at.indexOf(" ")),
    time: publish_at?.split(" ")[1].slice(0, 5),
  });
  const [editedScheduleData, setEditedScheduleData] = useState<any>({
    publish_at: editDate,
    image,
    text,
  });

  const saveEditedDate = async () => {
    dispatch(updateSchedule(id, editedScheduleData));
    togglePopupClose();
  };

  const handleDateChange = (selectedDate: any) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    setEditDate({ ...editDate, date: formattedDate });
    setEditedScheduleData({
      ...editedScheduleData,
      publish_at: `${date} ${time}`,
    });
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>, time: string) => {
    setEditDate({ ...editDate, time });
    setEditedScheduleData({
      ...editedScheduleData,
      publish_at: `${date} ${time}`,
    });
  };

  const { date, time } = editDate;

  const parsedDate = parseISO(date);

  //TODO: need to be changed to {ru} locale  correct month name

  // let day = format(parseISO(date), "dd LLLL", {
  //   locale: ru,
  // }).split(" ")[0];

  // let month = format(parseISO(date), "dd LLLL", {
  //   locale: ru,
  // }).split(" ")[1];

  // if (month.slice(-1) === "ь") {
  //   month = `${day} ${month.replace(/.$/, "я")}`;
  // }

  const publishCreatedSchedule = () => {
    setEditedScheduleData({
      ...editedScheduleData,
      publish_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    });
    dispatch(publishSchedule(id, editedScheduleData));
    togglePopupClose();
  };

  return (
    <div className="scheduled">
      <div className="scheduled--image">
        <img src={image} alt="insta-img" />
      </div>
      <div className="scheduled__text">
        <span>{account}</span>&nbsp;
        <Text text={text} />
      </div>
      <div className="scheduled__content">
        <div className="scheduled__content__date">
          <Text
            text="Будет опубликовано"
            className="scheduled__content__date--name"
          />
          <div className="scheduled__content__date--time">
            <Text
              text={`${format(parseISO(date), "dd LLLL", {
                locale: ru,
              })} в ${time}`}
            />
            <img src={editIcon} alt="edit" onClick={togglePopupOpen} />
          </div>
        </div>
        <div className="new-post__date__content__calendar">
          {isOpen && (
            <Popup togglePopupClose={togglePopupClose}>
              <Title title="Выберите день публикации" />
              <Calendar onChange={handleDateChange} value={parsedDate} />
              <Title title="Укажите время" />
              <TimeField
                value={time}
                onChange={(e: ChangeEvent<HTMLInputElement>, value: string) =>
                  handleTimeChange(e, value)
                }
              />
              <div className="new-post__date__content__calendar--buttons">
                <Button buttonText="Сохранить" onClick={saveEditedDate} />
                <Button buttonText="Отмена" onClick={togglePopupClose} />
              </div>
            </Popup>
          )}
        </div>
        <div className="scheduled__content__buttons">
          <Button
            buttonText="Опубликовать сейчас"
            onClick={publishCreatedSchedule}
          />
          <div>
            <img src={trashIcon} alt="trash" onClick={() => handleSetId(id)} />
          </div>
        </div>
      </div>
      <div className="scheduled__removePost-popup">
        {isDeletePopupOpen && (
          <Popup togglePopupClose={deletePostPopupClose}>
            <RemovePostPopup
              deletePostPopupClose={deletePostPopupClose}
              handleDeletePost={handleDeletePost}
              loading={loading}
            />
          </Popup>
        )}
      </div>
    </div>
  );
};

export default Scheduled;
