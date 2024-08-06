import React, { useState } from 'react';
import arrowLeft from "../assets/Polygon 2.png";
import arrowDown from "../assets/Polygon 4.png";
import Contour from "./contour";

const ToggleButton = ({ content, choice, isOpen, onToggle }) => {
  const [showItem, setShowItem] = useState(false);

  return (
    <>
      <button
        className="flex items-center justify-between w-[89.33vw] h-[7.81vh] font-[AppleMedium] px-[4.53vw]"
        onClick={onToggle}
      >
        <span className="text-[#222222] text-[20px] text-left flex-grow whitespace-nowrap overflow-hidden text-ellipsis">
          {content}
        </span>

        <span className="ml-4 flex-shrink-0">
          <img
            src={isOpen ? arrowDown : arrowLeft}
            alt={isOpen ? "arrowDown" : "arrowLeft"}
            className="" // 이미지 크기 고정
          />
        </span>
      </button>

      <Contour top={0} />

      <ul style={{ display: isOpen ? "block" : "none" }}>
        {choice}
        <Contour top={0} />
      </ul>
    </>
  );
};

export default ToggleButton;
