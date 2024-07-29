import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Round26Button = ({ backgroundColor, color, content, link, fontStyle }) => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState(backgroundColor);
  const [isSelected, setIsSelected] = useState(false); // 선택 상태 추가

  const linkTo = () => {
    if (link) {
      navigate(link);
    } else {
      // 링크가 없는 경우 배경색을 변경합니다.
      setBgColor(bgColor === backgroundColor ? '#A198F6' : backgroundColor);
      setIsSelected(!isSelected); // 선택 상태 토글
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
      style={{ backgroundColor: bgColor, color: isSelected ? '#FFFFFF' : color }}
      onClick={linkTo}
    >
      {content}
    </button>
  );
};

export default Round26Button;
