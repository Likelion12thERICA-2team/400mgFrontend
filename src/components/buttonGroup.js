import React, { useState } from 'react';
import circle from "../assets/circleButton.png";
import scircle from "../assets/sCircleButton.png";

const CircleButton = ({ id, isSelected, onClick }) => {
  return (
    <button 
      className="flex items-center justify-center w-[39px] h-[39px]"
      onClick={() => onClick(id)}
    >
      <img 
        src={isSelected ? scircle : circle} 
        alt="Condition check" 
        className="w-[39px] h-[39px]" 
      />
    </button>
  );
};

const ButtonGroup = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (id) => {
    setSelectedButton(id);
  };

  return (
    <div className="w-[375px] flex flex-row justify-center mt-[12px]">
      <div className="relative w-[328px] h-[2px] bg-[#EBEBEB] mt-[18px]">
        <div className="w-[328px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-[35px]">
          {[1, 2, 3, 4, 5].map((id) => (
            <div key={id} className="bg-white">
              <CircleButton
                id={id}
                isSelected={selectedButton === id}
                onClick={handleButtonClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonGroup;