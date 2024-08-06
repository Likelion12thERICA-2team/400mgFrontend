import React from "react";
import Round26Button from "./round26Button";

const Significant = () => {

    return (
        <>
            <div className="flex flex-row gap-[2.13vw] mt-[0.86vh]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"불면증"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"기면증"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"소화불량"} />
            </div>
        
            <div className="flex flex-row gap-[2.13vw] mt-[1.48vh]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"당뇨"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"고혈압"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"심장 질환"} />
            </div>
            
            <div className="flex flex-row gap-[2.13vw] mt-[1.48vh] mb-[2.23vh]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"편두통"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"불안장애"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"만성 피로"} />
            </div>
        </>
    );
};

export default Significant;
