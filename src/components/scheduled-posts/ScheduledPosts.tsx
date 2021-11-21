import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { deleteSchedule } from "../../redux/features/postScheduleSlice";
import { RootState } from "../../redux/store";
import { IScheduledPostsProps, TSchedulePosts } from "../models";
import usePopup from "../../hooks/usePopup";
import Title from "../ui/Title";
import Published from "./Published";
import Scheduled from "./Scheduled";

const ScheduledPosts = ({ scheduledPosts }: IScheduledPostsProps) => {
  const [tab, setTab] = useState("scheduled");
  const [popupId, setPopupId] = useState<number>();

  const {
    isOpen: isDeletePopupOpen,
    togglePopupClose: deletePostPopupClose,
    togglePopupOpen: openDeletePopup,
  } = usePopup();

  const { loading } = useSelector(
    ({ schedule }: RootState) => ({
      loading: schedule.loading,
    }),
    shallowEqual
  );

  //when API changes will be ready

  // const posted = scheduledPosts?.filter(
  //   (post: TSchedulePosts) => post.status !== "Ожидание"
  // );

  const awaitingPosts = scheduledPosts?.filter(
    (post: TSchedulePosts) => post.status !== "Опубликовано"
  );
  const dispatch = useDispatch();

  const handleSetId = (id: number) => {
    setPopupId(id);
    openDeletePopup();
  };

  const handleDeletePost = () => {
    const deletedId = scheduledPosts?.find(
      (post: TSchedulePosts) => post.id === popupId
    );
    console.log(deletedId);
    dispatch(deleteSchedule(deletedId?.id));
    deletePostPopupClose();
  };

  return (
    <div className="schedule-posts">
      <div className="schedule-posts--tabs">
        <Title
          title="Запланированные посты"
          onClick={() => setTab("scheduled")}
          className={tab === "scheduled" ? "tab-title" : "tab-active"}
        />
        <Title
          title="Опубликованные"
          onClick={() => setTab("published")}
          className={tab === "published" ? "tab-title" : "tab-active"}
        />
      </div>
      {tab === "scheduled" ? (
        <div className="schedule-posts__container">
          {awaitingPosts?.map((schedule: TSchedulePosts) => {
            const { account, id, image, publish_at, status, text } = schedule;
            return (
              <Scheduled
                account={account}
                id={id}
                key={id}
                image={image}
                publish_at={publish_at}
                status={status}
                text={text}
                handleDeletePost={handleDeletePost}
                loading={loading}
                isDeletePopupOpen={isDeletePopupOpen}
                deletePostPopupClose={deletePostPopupClose}
                handleSetId={handleSetId}
              />
            );
          })}
        </div>
      ) : tab === "published" ? (
        <Published />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ScheduledPosts;
