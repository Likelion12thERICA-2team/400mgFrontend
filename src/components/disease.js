import React from "react";
import Round26Button from "./round26Button";

const Disease = () => {
  return (
    <>
      <div className="flex flex-row gap-[2.13vw] mt-[1.88vh]">
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"위염"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"골다공증"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"빈혈"} />
      </div>
    
      <div className="flex flex-row gap-[2.13vw] mt-[1.57vh]">
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"천식"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"소양증"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"ADHD"} />
      </div>
      
      <div className="flex flex-row gap-[2.13vw] mt-[1.57vh] mb-[2.35vh]">
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"신장"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"갑상선"} />
        <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"간"} />
      </div>
    </>
  );
};

export default Disease;
