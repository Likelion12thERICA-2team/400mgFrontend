import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Round26Button = ({ backgroundColor, color, content, onClick, fontStyle }) => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState(backgroundColor);
  const [isSelected, setIsSelected] = useState(false); // 선택 상태 추가
  const [textColor, setTextColor] = useState(color); 

  // const linkTo = () => {
  //   if (link) {
  //     navigate(link);
  //   } else {
  //     // 링크가 없는 경우 배경색을 변경합니다.
  //     if (bgColor === backgroundColor) {
  //       setBgColor('#A198F6');
  //       setTextColor('#FFFFFF'); // 글자 색상을 하얀색으로 변경
  //     } else {
  //       setBgColor(backgroundColor);
  //       setTextColor(color); // 글자 색상을 원래 색상으로 복원
  //     }
  //   }
  // };
  const handleClick = () => {
    setIsSelected(!isSelected);
    if (onClick) {
      onClick();
    }
  };

  // fontStyle을 Tailwind 클래스로 변환하는 함수
  const getFontStyleClass = (style) => {
    const fontStyles = {
      // 필요한 다른 폰트 스타일을 여기에 추가할 수 있습니다.
      AppleBold : 'font-AppleBold',
      AppleExBold : 'font-AppleExBold',
      AppleSemiBold : 'font-AppleSemiBold',
      AppleReBold : 'font-AppleReBold',
      AppleMedium : 'font-AppleMedium',
    };
    return fontStyles[style] || 'font-AppleMedium'; // 기본값은 'font-AppleMedium'
  };

  return (
    <button
      className={`text-[16px] rounded-[26px] w-[94px] h-[44px] ${getFontStyleClass(fontStyle)}`}
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
