import React, { useState } from 'react';
import arrowLeft from "../assets/Polygon 2.png";
import arrowDown from "../assets/Polygon 4.png";
import Contour from "./contour";

const ToggleButton = ({content, choice, isOpen, onToggle}) => {

    const [showItem, setShowItem] = useState(false);



    return (
        <>
            <button 
                className="flex items-center justify-between w-[335px] h-[59px] font-[AppleMedium] px-[17px]" 
                onClick={onToggle} 
            >
                <span className="text-[#222222] text-[20px] text-left flex-grow whitespace-nowrap overflow-hidden text-ellipsis">
                        {content}
                </span>

                <span className='ml-4 flex-shrink-0'>
                    <img 
                        src={isOpen ? arrowDown : arrowLeft} 
                        alt={isOpen ? "arrowDown" : "arrowLeft"}
                        className=""  // 이미지 크기 고정
                    />
                </span>
                
            </button>

            <Contour />

            <ul style={{display: isOpen ? "block" : "none"}}>
                    {choice}
                    <Contour />
            </ul>


        </>

    );

};

export default ToggleButton