import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Round10Button = ({ backgroundColor, color, content, link, fontStyle }) => {
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
    return fontStyles[style] || 'font-AppleMedium'; // 기본값은 'font-AppleBold'
  };

  return (
    <button
      className={`rounded-[10px] w-[104px] h-[44px] ${getFontStyleClass(fontStyle)}`}
      style={{ backgroundColor: bgColor, color: color }}
      onClick={linkTo}
    >
      {content}
    </button>
  );
};

export default Round10Button;
