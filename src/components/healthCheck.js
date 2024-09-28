import React, { useState, useContext, useEffect } from "react";
import ToggleButton from "./toggleButton";
import Contour from "./contour";
import Allergy from "./allergy";
import Disease from "./disease";
import Constitutuion from "./constitution";
import Button from "./Button";

import { SignupContext } from "../SignupContext";
import { useNavigate } from "react-router-dom";

const HealthCheck = () => {
  const [formdata, setFormdata] = useContext(SignupContext);

  const handleInputChange = (name, value) => {
    setFormdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formdata);
  }, [formdata]);

  const navigate = useNavigate();

  // 어떤 토글이 열려 있는지 추적하기 위한 상태
  const [openToggle, setOpenToggle] = useState(null);

  // 토글 버튼 클릭 시 호출되는 함수
  const handleToggle = (index) => {
    // 클릭한 토글이 이미 열려 있으면 닫고, 그렇지 않으면 열기
    setOpenToggle(openToggle === index ? null : index);
  };

  return (
    <section className="mt-[3.38vh] mb-[4.19vh] flex flex-col justify-start px-[5.33vw]">
      <div className="text-[26px] font-[AppleBold]">
        갖고계신 질병이나 특이체질이 <br />
        있다면 알려주세요.
      </div>

      <div className="text-[16px] text-[#5A5A5A] font-[AppleMedium] mt-[1.35vh]">
        건강한 카페인 습관에 필요해요! <br />
        외부에 공유되지 않아요.
      </div>

      <Contour top={7.84} />

      <ToggleButton
        content="알러지"
        choice={<Allergy />}
        isOpen={openToggle === 1} // 첫 번째 토글이 열려 있는지 확인
        onToggle={() => handleToggle(1)} // 첫 번째 토글 클릭 시 handleToggle 호출
      />

      <ToggleButton
        content="질병"
        choice={<Disease />}
        isOpen={openToggle === 2} // 두 번째 토글이 열려 있는지 확인
        onToggle={() => handleToggle(2)} // 두 번째 토글 클릭 시 handleToggle 호출
      />

      <ToggleButton
        content="특이 체질"
        choice={<Constitutuion />}
        isOpen={openToggle === 3} // 세 번째 토글이 열려 있는지 확인
        onToggle={() => handleToggle(3)} // 세 번째 토글 클릭 시 handleToggle 호출
      />

      <div className={openToggle ? "mt-[20.8vh]" : "mt-[45.8vh]"}>
        <Button
          backgroundColor={"#8478F7"}
          color={"white"}
          content={"계속하기"}
          onClick={() => {
            navigate("/start/bodyInfo3");
          }}
        />
      </div>
    </section>
  );
};

export default HealthCheck;
