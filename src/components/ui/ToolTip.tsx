const ToolTip = ({ title, children, position, containerClass, theme }: any) => {
  return (
    <div className={`tooltip ${containerClass}`}>
      {children}
      <div
        className={`tooltiptext ${
          theme === "dark" ? `dark` : `light`
        } tooltip-${position}`}
      >
        {title}
        <span className="arrow"></span>
      </div>
    </div>
  );
};

export default ToolTip;
