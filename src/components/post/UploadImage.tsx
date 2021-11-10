import uploadIcon from "../../assets/icons/img-upload.svg";
import { IUploadImageProps } from "../models";

const UploadImage = ({ handleImageSelect, image }: IUploadImageProps) => {
  return (
    <div className="upload">
      {image ? (
        <>
          <div className="upload-active">
            <img
              src={uploadIcon}
              alt="upload"
              className="upload-active--icon"
            />
            <label htmlFor="edit">Изменить фото</label>
            <input
              id="edit"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
            />
          </div>
          <img
            src={URL.createObjectURL(image)}
            alt="upload"
            className="upload__image"
          />
        </>
      ) : (
        <>
          <img src={uploadIcon} alt="upload" className="upload__icon" />

          <label htmlFor="upload">Загрузить фото</label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
          />
        </>
      )}
    </div>
  );
};

export default UploadImage;
