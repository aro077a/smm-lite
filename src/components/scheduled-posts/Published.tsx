import { TPublished } from "../models";
import Text from "../ui/Text";
import doneIcon from "../../assets/icons/done.svg";
import trashIcon from "../../assets/icons/trash-icon.svg";
import Popup from "../ui/Popup";
import RemovePostPopup from "./RemovePostPopup";
import moment from "moment";

const Published = ({
  account,
  id,
  image,
  publish_at,
  text,
  handleDeletePost,
  publishedLoading,
  isDeletePopupOpen,
  deletePostPopupClose,
  handleSetId,
  scheduledModalType,
}: TPublished) => {
  let date = publish_at?.substr(0, publish_at.indexOf(" "));
  date = `${moment(date).format("LL").split(" ")[0]} ${
    moment(date).format("LL").split(" ")[1]
  }`;

  const time = publish_at?.split(" ")[1].slice(0, 5);

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
            <Text text={`${date} в ${time}`} />
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
        {isDeletePopupOpen && scheduledModalType === "delete" && (
          <Popup togglePopupClose={deletePostPopupClose}>
            <RemovePostPopup
              deletePostPopupClose={deletePostPopupClose}
              handleDeletePost={handleDeletePost}
              loading={publishedLoading}
            />
          </Popup>
        )}
      </div>
    </div>
  );
};

export default Published;
