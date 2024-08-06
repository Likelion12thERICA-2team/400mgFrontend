import React from "react";
import Round26Button from "./round26Button";

const Constitutuion = () => {
  return (
    <>
      <div className="flex flex-row gap-[2.13vw] mt-[1.88vh]">
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"불면증"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"기면증"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"소화불량"} />
      </div>
    
      <div className="flex flex-row gap-[2.13vw] mt-[1.57vh]">
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"당뇨"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"고혈압"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"심장 질환"} />
      </div>
      
      <div className="flex flex-row gap-[2.13vw] mt-[1.57vh] mb-[2.35vh]">
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"편두통"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"불안장애"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"만성 피로"} />
      </div>
    </>
  );
};

export default Constitutuion;
