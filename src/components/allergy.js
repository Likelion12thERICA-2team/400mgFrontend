import React from "react";
import Round26Button from "./round26Button";

const Allergy = () => {
  return (
    <>
      <div className="flex flex-row gap-[2.13vw] mt-[1.88vh]">
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"카페인"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"우유"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"타우린"} />
      </div>
    
      <div className="flex flex-row gap-[2.13vw] mt-[1.57vh]">
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"글루텐"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"라텍스"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"견과류"} />
      </div>
      
      <div className="flex flex-row gap-[2.13vw] mt-[1.57vh] mb-[2.35vh]">
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"감미료"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"초콜릿"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"대두"} />
      </div>
    </>
  );
};

export default Allergy;
