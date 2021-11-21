import { SpinnerCircular } from "spinners-react";
import popupMan from "../../assets/icons/delete-popup-icon.svg";
import { IRemovePostPopupProps } from "../models";
import Button from "../ui/Button";
import Text from "../ui/Text";
import Title from "../ui/Title";

const RemovePostPopup = ({
  deletePostPopupClose,
  handleDeletePost,
  loading,
  id,
}: IRemovePostPopupProps) => {
  return (
    <div className="remove-popup">
      <div className="remove-popup__image">
        <img src={popupMan} alt="popup-man" />
      </div>
      <div className="remove-popup__title">
        <Title title="Удалить пост?" />
        <Text text="Пост пропадет из ленты instagram, восстановить его будет невозможно." />
      </div>
      <div className="remove-popup__buttons">
        <Button
          onClick={handleDeletePost}
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
              "Удалить"
            )
          }
          loading={loading}
        />
        <Button buttonText="Отмена" onClick={deletePostPopupClose} />
      </div>
    </div>
  );
};

export default RemovePostPopup;
