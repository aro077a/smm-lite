import { MAX_COUNT } from "../../utils/constants";

const ScheduleText = ({ handleTextChange, letterCount }: any) => {
  return (
    <div className="schedule-text">
      <textarea
        placeholder="Текст поста"
        maxLength={MAX_COUNT}
        onChange={handleTextChange}
      ></textarea>
      {letterCount === MAX_COUNT && (
        <div className="schedule-text__error">
          Максимальная длина поста 2200 символов
        </div>
      )}
    </div>
  );
};

export default ScheduleText;
