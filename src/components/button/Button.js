import React from "react";
const Button = ({
  id,
  onClick,
  type = "button",
  className = "",
  children,
  bgColor = "primary",
  disabled = false,
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }
  return (
    <>
      <button
        type={type}
        className={`py-3 px-6 rounded-lg ${bgClassName} capitalize w-full text-white  mt-auto ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
