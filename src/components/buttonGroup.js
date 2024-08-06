import React, { useState } from 'react';
import circle from "../assets/circleButton.png";
import scircle from "../assets/sCircleButton.png";

const CircleButton = ({ id, isSelected, onClick }) => {
  return (
    <button 
      className="flex items-center justify-center w-[10.4vw] h-[4.8vh]"
      onClick={() => onClick(id)}
    >
      <img 
        src={isSelected ? scircle : circle} 
        alt="Condition check" 
        className="w-[10.4vw] h-[10.4vw]" 
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
    <div className="w-[100vw] flex flex-row justify-center mt-[1.48vh]">
      <div className="relative w-[87.5vw] h-[0.25vh] bg-[#EBEBEB] mt-[2.23vh]">
        <div className="w-[87.5vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-[9.33vw]">
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
