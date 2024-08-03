import React, { useState } from "react";
import Round10Button from "./round10Button";
import Button from "./Button";

const SelectGender = ({ handle, onNext }) => {
  const [selectedGender, setselectedGender] = useState("");
  const [showBirthdate, setShowBirthdate] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const [showBodyinfo, setShowBodyinfo] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleNext = () => {
    handle("gender", selectedGender);
    handle("year", year);
    handle("month", month);
    handle("day", day);
    handle("height", height);
    handle("weight", weight);
    onNext();
  };

  const handleSelection = (gender) => {
    setselectedGender(gender);
  };

  const handleContinue = () => {
    if (selectedGender) {
      setShowBirthdate(true);
    }
    if (year && month && day) {
      setShowBodyinfo(true);
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setYear(value);
    }
  };

  const handleMonthChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 2) {
      setMonth(value);
    }
  };

  const handleDayChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 2) {
      setDay(value);
    }
  };

  const handleHeightChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 3) {
      setHeight(value);
    }
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 3) {
      setWeight(value);
    }
  };

  return (
    <section className="mt-[26px] mb-[32px] flex flex-col justify-start px-[20px]">
      <div className="text-[26px] font-[AppleBold]">
        {showBodyinfo
          ? "신체정보를 알려주세요."
          : showBirthdate
          ? "생년월일을 알려주세요."
          : "성별이 어떻게 되시나요?"}
      </div>

      <div className="text-[16px] text-[#5A5A5A] font-[AppleMedium] mt-[10px]">
        건강한 카페인 습관에 필요해요! <br />
        외부에 공유되지 않아요.
      </div>

      {showBodyinfo ? (
        <>
          <div className="">
            <div className="text-[14px] text-[#5A5A5A] font-[AppleRegular] mt-[40px] mb-[26px]">
              키 / 몸무게
            </div>

            <div className="flex flex-row gap-[27px]">
              <div className="">
                <input
                  type="text"
                  placeholder="키"
                  className="w-[107px] h-[20.25px] font-AppleMedium text-right border-b border-gray-300"
                  value={height}
                  onChange={handleHeightChange}
                />
                <input
                  type="text"
                  placeholder="cm"
                  className="w-[36px] h-[20.25px] font-AppleMedium text-right border-b border-gray-300
                                        bg-[#FFFF] placeholder-black"
                  disabled
                />
              </div>

              <div className="">
                <input
                  type="text"
                  placeholder="몸무게"
                  className="w-[107px] h-[20.25px] font-AppleMedium text-right border-b border-gray-300"
                  value={weight}
                  onChange={handleWeightChange}
                />
                <input
                  type="text"
                  placeholder="kg"
                  className="w-[36px] h-[20.25px] font-AppleMedium text-right border-b border-gray-300
                                        bg-[#FFFF] placeholder-black"
                  disabled
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {showBirthdate ? (
        <>
          <div className="">
            <div className="text-[14px] text-[#5A5A5A] font-[AppleRegular] mt-[40px] mb-[10px]">
              생년월일
            </div>

            <div className="flex flex-row gap-[11px]">
              <input
                type="text"
                placeholder="YYYY"
                maxLength="4"
                className="rounded-[10px] w-[104px] h-[44px] font-AppleMedium text-center"
                style={{ backgroundColor: "#EBEBEB" }}
                value={year}
                onChange={handleYearChange}
              />
              <input
                type="text"
                placeholder="MM"
                maxLength="2"
                className="rounded-[10px] w-[104px] h-[44px] font-AppleMedium text-center"
                style={{ backgroundColor: "#EBEBEB" }}
                value={month}
                onChange={handleMonthChange}
              />
              <input
                type="text"
                placeholder="DD"
                maxLength="2"
                className="rounded-[10px] w-[104px] h-[44px] font-AppleMedium text-center"
                style={{ backgroundColor: "#EBEBEB" }}
                value={day}
                onChange={handleDayChange}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="text-[14px] text-[#5A5A5A] font-[AppleRegular] mt-[40px]">
        성별
      </div>
      <div className="flex flex-row gap-[11px] mt-[10px]">
        <div onClick={() => handleSelection("남자")}>
          <Round10Button
            backgroundColor={"#EBEBEB"}
            color={"black"}
            content={"남자"}
          />
        </div>
        <div onClick={() => handleSelection("여자")}>
          <Round10Button
            backgroundColor={"#EBEBEB"}
            color={"black"}
            content={"여자"}
          />
        </div>
        <div onClick={() => handleSelection("기타")}>
          <Round10Button
            backgroundColor={"#EBEBEB"}
            color={"black"}
            content={"기타"}
          />
        </div>
      </div>

      {showBodyinfo ? (
        <>
          <div
            className={
              showBodyinfo
                ? "mt-[255px]"
                : showBirthdate
                ? "mt-[366px]"
                : "mt-[481px]"
            }
          >
            <Button
              backgroundColor={selectedGender ? "#CBC7F6" : "#8478F7"}
              color={"white"}
              content={"계속하기"}
              onClick={handleNext}
            />
          </div>
        </>
      ) : (
        <>
          <div
            className={
              showBodyinfo
                ? "mt-[255px]"
                : showBirthdate
                ? "mt-[366px]"
                : "mt-[481px]"
            }
          >
            <Button
              backgroundColor={selectedGender ? "#CBC7F6" : "#8478F7"}
              color={"white"}
              content={"계속하기"}
              onClick={handleContinue}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default SelectGender;
