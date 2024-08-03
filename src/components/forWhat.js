import React, { useEffect, useState } from "react";
import Button from "./Button";

const ForWhat = ({ handle, onNext }) => {
  const options = ["직장", "학교", "취미", "공부", "기타"];
  const [selected, setSelected] = useState(
    new Array(options.length).fill(false)
  );

  const handleSelection = (index) => {
    setSelected((prev) => {
      let newSelected = [...prev];
      newSelected[index] = !prev[index];
      //   console.log("Selected:", newSelected);
      return newSelected;
    });
  };

  useEffect(() => {
    handle(
      "forWhat",
      options.filter((_, index) => selected[index])
    );
  }, [selected]);

  return (
    <section className="mt-[26px] mb-[32px] flex flex-col items-start justify-center m-[20px]">
      <div className="text-[26px] font-AppleBold items-center ">
        주로 무엇을 위해 카페인을 <br />
        찾으시나요?
      </div>
      <div className="text-[16px] text-[#5A5A5A] font-AppleMedium items-center ">
        정확하게 기억이 안나도 괜찮아요
      </div>
      <div className="w-[350px] h-[64px] mt-[85px] items-center justify-center">
        <div className="gap-[12px] flex flex-col ">
          {options.map((option, index) => (
            <div key={index} onClick={() => handleSelection(index)}>
              <Button
                backgroundColor="#EBEBEB"
                color="black"
                content={option}
              />
            </div>
          ))}
        </div>
        <div className="absolute bottom-[32px] w-full flex ">
          <div className="w-full max-w-md">
            <Button
              backgroundColor={selected.includes(true) ? "#CBC7F6" : "#8478F7"}
              color="white"
              content={"계속하기"}
              onClick={onNext}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhat;
