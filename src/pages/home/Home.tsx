import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import NewPost from "../../components/post/NewPost";
import ScheduledPosts from "../../components/scheduled-posts/ScheduledPosts";
import Button from "../../components/ui/Button";
import Popup from "../../components/ui/Popup";
import Text from "../../components/ui/Text";
import Title from "../../components/ui/Title";
import { togglePopup } from "../../redux/features/popupSlice";
import { getSchedule } from "../../redux/features/postScheduleSlice";
import { RootState } from "../../redux/store";

const Home = () => {
  const dispatch = useDispatch();

  const { account } = useSelector(
    ({ user }: RootState) => ({
      account: user.account,
    }),
    shallowEqual
  );

  const { scheduledPosts } = useSelector(
    ({ schedule }: RootState) => ({
      scheduledPosts: schedule.scheduledPosts,
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

  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);

  const handleOpenPopup = () => {
    dispatch(togglePopup({ modalIsOpen: true, modalType: "post" }));
  };
  const handleClosePopup = () => {
    dispatch(togglePopup({ modalIsOpen: false, modalType: "post" }));
  };

  return (
    <div className="home">
      <div className="home__title-block">
        {scheduledPosts?.length !== 0 ? (
          <>
            <div className="home__title-block--buttons">
              <Button
                buttonText="Запланировать пост"
                onClick={handleOpenPopup}
              />
              <Button buttonText="Удалить все" />
            </div>
            <ScheduledPosts scheduledPosts={scheduledPosts} />
          </>
        ) : (
          <>
            <Title
              title="Запланированные посты"
              className="home__title-block--title"
            />
            <Text
              text="У вас пока нет запланированных постов. Но когда вы создадите свой первый пост, он появятся на этом экране."
              className="home__title-block--description"
            />
            <Button
              buttonText="Запланировать пост"
              onClick={handleOpenPopup}
              buttonType={account && account[0]?.username ? false : true}
            />
          </>
        )}
      </div>
      {modalIsOpen && modalType === "post" && (
        <Popup togglePopupClose={handleClosePopup}>
          <NewPost togglePopupClose={handleClosePopup} />
        </Popup>
      )}
    </div>
  );
};

export default Home;
