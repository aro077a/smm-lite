import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { deleteSchedule } from "../../redux/features/postScheduleSlice";
import { RootState } from "../../redux/store";
import { IScheduledPostsProps, TSchedulePosts } from "../models";
import Title from "../ui/Title";
import Published from "./Published";
import Scheduled from "./Scheduled";
import { togglePopup } from "../../redux/features/popupSlice";

const ScheduledPosts = ({ scheduledPosts }: IScheduledPostsProps) => {
  const [tab, setTab] = useState("scheduled");
  const [popupId, setPopupId] = useState<number>();

  const { loading } = useSelector(
    ({ schedule }: RootState) => ({
      loading: schedule.loading,
    }),
    shallowEqual
  );

  const { modalType, modalIsOpen } = useSelector(
    ({ popup }: RootState) => ({
      modalType: popup.modalType,
      modalIsOpen: popup.modalIsOpen,
    }),
    shallowEqual
  );

  const handleCloseDeletePopup = () => {
    dispatch(togglePopup({ modalIsOpen: false, modalType: "delete" }));
  };

  const posted = scheduledPosts?.filter(
    (post: TSchedulePosts) => post.status !== "Ожидание"
  );

  const awaitingPosts = scheduledPosts?.filter(
    (post: TSchedulePosts) => post.status !== "В процессе"
  );
  const dispatch = useDispatch();

  const handleSetId = (id: number) => {
    setPopupId(id);
    dispatch(togglePopup({ modalIsOpen: true, modalType: "delete" }));
  };

  const handleDeletePost = () => {
    const deletedId = scheduledPosts?.find(
      (post: TSchedulePosts) => post.id === popupId
    );
    dispatch(deleteSchedule(deletedId?.id));
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
                scheduledModalType={modalType}
                handleDeletePost={handleDeletePost}
                scheduledLoading={loading}
                isDeletePopupOpen={modalIsOpen}
                deletePostPopupClose={handleCloseDeletePopup}
                handleSetId={handleSetId}
              />
            );
          })}
        </div>
      ) : tab === "published" ? (
        <div className="schedule-posts__container">
          {posted?.map((post: TSchedulePosts) => {
            const { account, id, image, publish_at, status, text } = post;
            return (
              <Published
                account={account}
                id={id}
                key={id}
                image={image}
                publish_at={publish_at}
                status={status}
                text={text}
                scheduledModalType={modalType}
                handleDeletePost={handleDeletePost}
                publishedLoading={loading}
                isDeletePopupOpen={modalIsOpen}
                deletePostPopupClose={handleCloseDeletePopup}
                handleSetId={handleSetId}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ScheduledPosts;
