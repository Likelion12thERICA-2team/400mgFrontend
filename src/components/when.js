import React, { useEffect, useState } from "react";
import WheelPicker from "./wheelPicker";
import Button from "./Button";
import ImageButton from "./plusButton";
import Plus from "../assets/Plus.png";

const When = ({ handle, onNext }) => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState("오전");
  const [currentHour, setCurrentHour] = useState(1);

  const addTime = () => {
    const time = `${currentPeriod} ${currentHour}시`;
    if (!selectedTimes.includes(time)) {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  const removeTime = (time) => {
    setSelectedTimes(selectedTimes.filter((t) => t !== time));
  };

  useEffect(() => {
    handle("when", selectedTimes);
  }, [selectedTimes]);

  return (
    <section className="mt-[3.38vh] mb-[4.19vh] flex flex-col items-start justify-center mx-[5.33vw]">
      <div className="text-[26px] font-AppleBold items-center">
        카페인을 섭취하는 시간대를 <br />
        알려주세요
      </div>
      <div className="text-[16px] text-[#5A5A5A] font-AppleMedium items-center">
        정확하게 기억이 안나도 괜찮아요
        <br />
        중복 선택도 가능해요
      </div>
      <div className="w-[93.33vw] mt-[20.8vh] items-center justify-center">
        <div className="text-[26px] w-full h-[8.53vh] flex items-center relative text-AppleSemiBold">
          <WheelPicker items={["오전", "오후"]} onSelect={setCurrentPeriod} />
          <WheelPicker
            items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            onSelect={setCurrentHour}
          />
          <div className="text-[26px] font-[AppleSemiBold] ml-[2.13vw] mr-[5.33vw]">
            시{" "}
          </div>
          <ImageButton src={Plus} alt="Add time" onClick={addTime} />
        </div>
        <div className="mt-[26.8vh] px-[3.2vw] flex flex-wrap mb-[1.47vh]">
          {selectedTimes.map((time) => (
            <div
              key={time}
              className="flex items-center bg-grayLight text-[AppleMedium] px-2 py-1 rounded-[2.67vw] mr-[2.13vw] mt-[2.13vw]"
            >
              {time}
              <button
                onClick={() => removeTime(time)}
                className="ml-2 text-red-500"
              >
                x
              </button>
            </div>
          ))}
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
      </div>
    </section>
  );
};

export default When;
