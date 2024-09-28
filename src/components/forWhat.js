import React, { useEffect, useState, useContext } from "react";
import Button from "./Button";

import { SignupContext } from "../SignupContext";
import { useNavigate } from "react-router-dom";

const ForWhat = () => {
  const options = ["직장", "학교", "취미", "공부", "기타"];
  const [selected, setSelected] = useState(
    new Array(options.length).fill(false)
  );

  const [formdata, setFormdata] = useContext(SignupContext);

  const handleInputChange = (name, value) => {
    setFormdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const handleSelection = (index) => {
    setSelected((prev) => {
      let newSelected = [...prev];
      newSelected[index] = !prev[index];
      return newSelected;
    });
  };

  useEffect(() => {
    handleInputChange(
      "forWhat",
      options.filter((_, index) => selected[index])
    );
  }, [selected]);

  useEffect(() => {
    console.log(formdata);
  }, [formdata]);

  const navigate = useNavigate();

  return (
    <section className="mt-[3.38vh] mb-[4.19vh] flex flex-col items-start justify-center mx-[5.33vw]">
      <div className="text-[26px] font-AppleBold items-center">
        주로 무엇을 위해 카페인을 <br />
        찾으시나요?
      </div>
      <div className="text-[16px] text-[#5A5A5A] font-AppleMedium items-center">
        정확하게 기억이 안나도 괜찮아요
      </div>
      <div className="w-[93.33vw] h-[8.53vh] mt-[11.4vh] items-center justify-center">
        <div className="gap-[1.6vh] flex flex-col">
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
        <div className="absolute bottom-[4.19vh] w-full flex">
          <div className="w-full max-w-md">
            <Button
              backgroundColor={selected.includes(true) ? "#CBC7F6" : "#8478F7"}
              color="white"
              content={"계속하기"}
              onClick={() => navigate("/start/signup3")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhat;
