import React from "react";
import Round26Button from "./round26Button";

const Allergy = () => {

    return (
        <>
            <div className="flex flex-row gap-[8px] mt-[15px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"카페인"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"우유"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"타우린"} />
            </div>
        
            <div className="flex flex-row gap-[8px] mt-[12px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"글루텐"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"라텍스"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"견과류"} />
            </div>
            
            <div className="flex flex-row gap-[8px] mt-[12px] mb-[18px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"감미료"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"초콜릿"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"대두"} />
            </div>
        </>
    );


};

export default Allergy;