import React, { useState } from 'react';
import arrowLeft from "../assets/Polygon 2.png";
import arrowDown from "../assets/Polygon 4.png";

const NewToggle = ({content, choice, isOpen, onToggle}) => {

    const [showItem, setShowItem] = useState(false);



    return (
        <>
            <button 
                className="flex items-center justify-between w-[375px] h-[59px] font-AppleMedium px-[37px]" 
                onClick={onToggle} 
            >
                <span className="text-[#222222] text-[20px] text-left flex-grow whitespace-nowrap overflow-hidden text-ellipsis ">
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

            <div className="w-[375px] my-[1%] border-[1px] border-[#999999] mb-[0%] mt-[0px]" />

            <ul style={{display: isOpen ? "block" : "none"}}>
                    <div className='pl-[20px]'>
                        {choice}
                    </div>
                    <div className="w-[375px] my-[1%] border-[1px] border-[#999999] mb-[0%] mt-[0px]" />
            </ul>


        </>

    );

};

export default NewToggle