import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Round26Button = ({ backgroundColor, color, content, onClick, fontStyle }) => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState(backgroundColor);
  const [isSelected, setIsSelected] = useState(false); // 선택 상태 추가
  const [textColor, setTextColor] = useState(color); 

  const handleClick = () => {
    setIsSelected(!isSelected);
    if (onClick) {
      onClick();
    }
  };

  // fontStyle을 Tailwind 클래스로 변환하는 함수
  const getFontStyleClass = (style) => {
    const fontStyles = {
      AppleBold: 'font-AppleBold',
      AppleExBold: 'font-AppleExBold',
      AppleSemiBold: 'font-AppleSemiBold',
      AppleReBold: 'font-AppleReBold',
      AppleMedium: 'font-AppleMedium',
    };
    return fontStyles[style] || 'font-AppleMedium'; // 기본값은 'font-AppleMedium'
  };

  return (
    <button
      className={`text-[4.27vw] rounded-[6.93vw] w-[25.07vw] h-[5.43vh] ${getFontStyleClass(fontStyle)}`}
      style={{
        backgroundColor: isSelected ? '#A198F6' : backgroundColor,
        color: isSelected ? '#FFFFFF' : color
      }}
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

export default Round26Button;
