import React from "react";
import Round26Button from "./round26Button";

const Constitutuion = () => {

    return (
        <>
            <div className="flex flex-row gap-[8px] mt-[15px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"불면증"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"기면증"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"소화불량"} />
            </div>
        
            <div className="flex flex-row gap-[8px] mt-[12px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"당뇨"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"고혈압"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"심장 질환"} />
            </div>
            
            <div className="flex flex-row gap-[8px] mt-[12px] mb-[18px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"편두통"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"불안장애"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"만성 피로"} />
            </div>
        </>
    );


};

export default Constitutuion;