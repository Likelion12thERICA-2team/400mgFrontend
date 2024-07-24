import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ backgroundColor, color, content, link }) => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState(backgroundColor);

  const linkTo = () => {
    if (link) {
      navigate(link);
    } else {
      // 링크가 없는 경우 배경색을 변경합니다.
      setBgColor(bgColor === backgroundColor ? '#A198F6' : backgroundColor);
    }
  };

  return (
    <button
      className={`rounded-[20px] w-[350px] h-[64px]`}
      style={{ backgroundColor: bgColor, color: color }}
      onClick={linkTo}
    >
      {content}
    </button>
  );
};

export default Button;
