import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// [7/28] fontStyle, OnClick 추가
const Button = ({ backgroundColor, color, content, link, fontStyle, onClick }) => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState(backgroundColor);
  const [textColor, setTextColor] = useState(color); 

  // [7/28] linkto에서 handleClick으로 함수 이름 변경. 
  // [7/28] 기존에도 Button.js 내부에서 사용하는 함수라서 문제 없을 듯
  const handleClick = () => {
    if (onClick) {
      // [7/28] 외부에서 전달된 onClick 함수가 있다면 실행
      onClick();
    } else if (link) {
      // [7/28] link가 있다면 해당 링크로 이동
      navigate(link);
    } else {
      // [7/28] 둘 다 없는 경우 기존의 배경색 변경 로직 실행
      if (bgColor === backgroundColor) {
        setBgColor('#A198F6');
        setTextColor('#FFFFFF'); // 글자 색상을 하얀색으로 변경
      } else {
        setBgColor(backgroundColor);
        setTextColor(color); // 글자 색상을 원래 색상으로 복원
      }
    }
  };

  // [7/28] fontStyle을 Tailwind 클래스로 변환하는 함수
  // [7/28] fontStyle을 지정하지 않으면 기본 값으로 통일됨
  const getFontStyleClass = (style) => {
    const fontStyles = {
      // [7/28] 필요한 다른 폰트 스타일을 여기에 추가할 수 있습니다.
      AppleBold : 'font-AppleBold',
      AppleExBold : 'font-AppleExBold',
      AppleSemiBold : 'font-AppleSemiBold',
      AppleRegular : 'font-AppleRegular',
      AppleMedium : 'font-AppleMedium',
    };
    return fontStyles[style] || 'font-AppleSemiBold'; // [7/28] 기본값은 'font-AppleBold'
  };

  // [7/28] 이 크기의 버튼 내 텍스트는 20px로 동일해서 기본으로 설정해놓음
  return (
    <button
      className={`rounded-[20px] w-[335px] h-[64px] ${getFontStyleClass(fontStyle)} text-[20px]`}
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

export default Button;
