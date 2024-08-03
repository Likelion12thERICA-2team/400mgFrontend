import React, { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";
import apiClient from "../apiClient";

const SetNickname = ({ handle, onNext }) => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    handle("username", nickname);
    handle("password", password);
    onNext();
  };

  return (
    <section className="mt-[26px] mb-[32px] flex flex-col justify-start px-[20px]">
      <div className="text-[26px] font-[AppleBold]">
        거의 다왔어요. <br />
        뭐라고 부르면 될까요?
      </div>

      <div className="text-[16px] text-[#5A5A5A] font-[AppleMedium] mt-[125px] ml-[119px]">
        당신의 아이디...
      </div>

      <input
        type="text"
        className="w-[267px] h-[44px] font-AppleMedium text-center ml-[34px] mt-[49px] text-[22px]"
        onChange={(e) => setNickname(e.target.value)}
      />
      <div className="w-[267px] my-[1%] border-[1px] border-[#999999] mb-[0%] mt-[0%] ml-[34px]"></div>

      <div className="text-[16px] text-[#5A5A5A] font-[AppleMedium] mt-[125px] ml-[119px]">
        당신의 비밀번호...
      </div>
      <input
        type="text"
        className="w-[267px] h-[44px] font-AppleMedium text-center ml-[34px] mt-[49px] text-[22px]"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="w-[267px] my-[1%] border-[1px] border-[#999999] mb-[0%] mt-[0%] ml-[34px]"></div>

      <div className="mt-[372px]">
        <Button
          backgroundColor={"#8478F7"}
          color={"white"}
          content={"완료"}
          link="/start/loading"
          onClick={handleSubmit}
        />
      </div>
    </section>
  );
};

export default SetNickname;
