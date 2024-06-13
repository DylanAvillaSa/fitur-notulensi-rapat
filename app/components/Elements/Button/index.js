const Button = ({
  children,
  variant,
  onClick,
  width,
  type,
  opacity,
  title,
}) => {
  return (
    <button
      type={type == "submit" ? "submit" : "button"}
      onClick={onClick}
      className={`
      ${
        variant == "main-btn" &&
        "px-5 py-2 rounded-md bg-light-purple text-white"
      } 
      ${variant == "show" && "p-3 bg-btn-show rounded-md"}
      
      ${variant == "edit" && "p-3 bg-btn-edit rounded-md"}

      ${variant == "delete" && "p-3 bg-btn-del rounded-md"}
      
      ${variant == "primary" && "p-3 bg-light-purple rounded-md text-white"}
      
      ${opacity ? "opacity-35" : ""}

      ${title == "edit" ? "w-[60%]" : ""}

      w-[${width}]
      
      `}
    >
      {children}
    </button>
  );
};

export default Button;
