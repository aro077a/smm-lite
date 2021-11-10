import uploadIcon from "../../assets/icons/img-upload.svg";
// import { useState } from "react";
import { IUploadImageProps } from "../models";

const UploadImage = ({ handleImageSelect, image }: IUploadImageProps) => {
  // const [iconActive, setIconActive] = useState<boolean>(false);

  // const handleMouseOver = (e: any, image: IUploadImageProps) => {
  //   if (image) {
  //     setIconActive(true);
  //   }
  // };
  // const handleMouseMove = (e: any, image: IUploadImageProps) => {
  //   if (image) {
  //     setIconActive(false);
  //   }
  // };

  return (
    <div className="upload">
      {image ? (
        <>
          {/* {iconActive ? (
            <img src={uploadIcon} alt="upload" className="upload__icon-hover" />
          ) : (
            <></>
          )} */}
          <img
            src={URL.createObjectURL(image)}
            alt="upload"
            className="upload__image"
            //@ts-ignore
            // onMouseEnter={(e) => setIconActive(true)}
            // //@ts-ignore
            // onMouseleave={(e) => setIconActive(false)}
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
