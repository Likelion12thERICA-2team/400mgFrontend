import React from "react";
import WheelPicker from "./wheelPicker";
import Button from "./Button";

const HowMuch = ({ handle, onNext }) => {
  const handleSelect = (name) => (value) => {
    handle(name, value);
    console.log("Selected value:", value);
  };

  return (
    <section className="mt-[3.38vh] mb-[4.19vh] flex flex-col justify-center mx-[5.33vw]">
      <div className="text-[26px] font-AppleBold items-start">
        평소에 커피나 드링크같은 <br />
        각성제를 얼마나 마시나요?
      </div>
      <div className="text-[16px] text-[#5A5A5A] font-AppleMedium items-start">
        정확하게 기억이 안나도 괜찮아요
      </div>
      <div className="w-[93.33vw] h-[8.53vh] mt-[20.8vh] items-center justify-center">
        <div className="text-[26px] font-AppleBold flex flex-row items-center">
          <WheelPicker
            items={["하루", "일주일", "한 달", "1년"]}
            onSelect={handleSelect("howOften")}
          />
          <div className="text-[26px] font-AppleSemiBold">에</div>
          <WheelPicker
            items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            onSelect={handleSelect("howMany")}
          />
          <div className="text-[26px] font-AppleSemiBold">
            번&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
      <div className="absolute bottom-[4.19vh] w-full flex">
        <div className="w-full max-w-md">
          <Button
            backgroundColor="#8478F7"
            color="white"
            content={"계속하기"}
            onClick={onNext}
          />
        </div>
      </div>
    </section>
  );
};

export default HowMuch;
