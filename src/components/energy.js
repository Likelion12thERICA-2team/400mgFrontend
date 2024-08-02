import React from "react";
import Round26Button from "./round26Button";

const Energy = () => {

    return (
        <>
            <div className="flex flex-row gap-[8px] mt-[15px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"핫식스"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"더킹"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"레드불"} />
            </div>
        
            <div className="flex flex-row gap-[8px] mt-[12px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"몬스터"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"구론산"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"박카스"} />
            </div>
            
            <div className="flex flex-row gap-[8px] mt-[12px] mb-[18px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"벡셀"} />
            </div>
        </>
    );


};

export default Energy;