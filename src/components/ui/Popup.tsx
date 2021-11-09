import { IPopupProps } from "../models";
import closeIcon from "../../assets/icons/close-icon.svg";

const Popup = ({ children, togglePopupClose, isOpen }: IPopupProps) => {
  return (
    <div className="popup" onClick={togglePopupClose}>
      <div
        className="popup__content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          src={closeIcon}
          alt="close-icon"
          className="popup__content--close-icon"
          onClick={togglePopupClose}
        />

        {children}
      </div>
    </div>
  );
};

export default Popup;
