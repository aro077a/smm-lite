import { TSchedulePosts } from "../models";
import Text from "../ui/Text";
import doneIcon from "../../assets/icons/done.svg";
import trashIcon from "../../assets/icons/trash-icon.svg";
import Popup from "../ui/Popup";
import RemovePostPopup from "./RemovePostPopup";

const Published = ({
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
  return (
    <div className="published">
      <div className="published--image">
        <img src={image} alt="insta-img" />
      </div>
      <div className="published__text">
        <span>{account}</span>&nbsp;
        <Text text={text} />
      </div>
      <div className="published__content">
        <div className="published_content__date">
          <div className="published__content__date__block">
            <Text
              text="Опубликовано"
              className="published__content__date__block--name"
            />
            <img src={doneIcon} alt="done" />
          </div>
          <div className="published__content__date--time">
            <Text text={publish_at} />
          </div>
        </div>
        <div className="published__content__buttons">
          <div onClick={() => handleSetId(id)}>
            <Text text="Удалить из ленты" />
            <img src={trashIcon} alt="trash" />
          </div>
        </div>
      </div>
      <div className="published__removePost-popup">
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

export default Published;
