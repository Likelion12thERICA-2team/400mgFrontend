import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Button = ({
  backgroundColor,
  color,
  content,
  link,
  fontStyle,
  onClick,
}) => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState(backgroundColor);
  const [textColor, setTextColor] = useState(color);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      navigate(link);
    } else {
      if (bgColor === backgroundColor) {
        setBgColor("#A198F6");
        setTextColor("#FFFFFF");
      } else {
        setBgColor(backgroundColor);
        setTextColor(color);
      }
    }
  };

  const getFontStyleClass = (style) => {
    const fontStyles = {
      AppleBold: "font-AppleBold",
      AppleExBold: "font-AppleExBold",
      AppleSemiBold: "font-AppleSemiBold",
      AppleRegular: "font-AppleRegular",
      AppleMedium: "font-AppleMedium",
    };
    return fontStyles[style] || "font-AppleSemiBold";
  };

  return (
    <button
      className={`rounded-[5.33vw] w-[89.33vw] h-[8.53vh] ${getFontStyleClass(
        fontStyle
      )} text-[20px]`}
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

export default Button;
