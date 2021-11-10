const ScheduleText = ({ handleTextChange }: any) => {
  return (
    <div className="schedule-text">
      <textarea
        placeholder="Текст поста"
        maxLength={2200}
        onChange={handleTextChange}
      ></textarea>
    </div>
  );
};

export default ScheduleText;
