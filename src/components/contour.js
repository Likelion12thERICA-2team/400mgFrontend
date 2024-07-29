import React from "react";

const Contour = ({top}) => {

    // top이 전달되지 않았을 때의 기본값 설정
    const marginTop = top !== undefined ? `${top}px` : '0%';

    return (
        <div 
            className="w-[335px] my-[1%] border-[1px] border-[#999999] mb-[0%]"
            style={{ marginTop }}
        ></div>
    );

};

export default Contour