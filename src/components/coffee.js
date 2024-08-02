import React from "react";
import Round26Button from "./round26Button";

const Coffee = () => {

    return (
        <>
            <div className="flex flex-row gap-[8px] mt-[15px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"톨"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"그란데"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"벤티"} />
            </div>
        
            <div className="flex flex-row gap-[8px] mt-[12px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"레쓰비"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"칸타타"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"T.O.P"} />
            </div>
            
            <div className="flex flex-row gap-[8px] mt-[12px] mb-[18px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"카누"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"맥심"} />
            </div>
        </>
    );


};

export default Coffee;