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
import RemovePostPopup from "./RemovePostPopup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  publishSchedule,
  updateSchedule,
} from "../../redux/features/publishScheduleSlice";
import { SpinnerCircular } from "spinners-react";
import { RootState } from "../../redux/store";
import moment from "moment";

const Scheduled = ({
  account,
  id,
  image,
  publish_at,
  text,
  handleDeletePost,
  scheduledLoading,
  isDeletePopupOpen,
  deletePostPopupClose,
  handleSetId,
  scheduledModalType,
}: TSchedulePosts) => {
  const { isOpen, togglePopupClose, togglePopupOpen } = usePopup();

  const dispatch = useDispatch();

  const { loading } = useSelector(
    ({ publish }: RootState) => ({
      loading: publish.loading,
    }),
    shallowEqual
  );

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
    const formattedDate = moment(selectedDate).format("YYYY-M-D");
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

  const formattedDate = `${moment(date).format("LL").split(" ")[0]} ${
    moment(date).format("LL").split(" ")[1]
  }`;

  const parsedDate = moment(date).toDate();

  const publishCreatedSchedule = () => {
    const dateNow = moment(new Date()).format("YYYY-M-D HH:mm:ss");

    dispatch(
      publishSchedule(id, { ...editedScheduleData, publish_at: dateNow })
    );
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
            <Text text={`${formattedDate} в ${time}`} />
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
            onClick={publishCreatedSchedule}
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
                "Опубликовать сейчас"
              )
            }
            loading={loading}
          />
          <div>
            <img src={trashIcon} alt="trash" onClick={() => handleSetId(id)} />
          </div>
        </div>
      </div>
      <div className="scheduled__removePost-popup">
        {isDeletePopupOpen && scheduledModalType === "delete" && (
          <Popup togglePopupClose={deletePostPopupClose}>
            <RemovePostPopup
              deletePostPopupClose={deletePostPopupClose}
              handleDeletePost={handleDeletePost}
              loading={scheduledLoading}
            />
          </Popup>
        )}
      </div>
    </div>
  );
};

export default Scheduled;
