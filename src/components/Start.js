import React from "react";

import LogoStart from "../assets/LogoStart.png";
import Button from "./Button";

const Start = () => (
  <section className="mt-[10.67vh] mb-[4.19vh] flex flex-col items-center justify-center mx-[5.33vw]">
    <div className="items-center justify-center px-[9.33vw]">
      <img src={LogoStart} alt="첫화면 얼굴" className="w-auto h-[300px]" />
    </div>
    <div className="text-[26px] pl-[9.33vw] text-center font-[AppleSemiBold] items-center ">
      400mg과 함께 <br />
      올바른 카페인 습관 챙기기
    </div>
    <div className="w-[89.33vw] absolute bottom-[4.19vh] flex flex-col gap-[2.67vh] items-center justify-center font-AppleSemiBold text-[14px]">
      <div className="w-full items-center justify-center flex flex-col gap-[1.35vh]">
        <div className="items-center justify-center">400mg이 처음이라면?</div>
        <Button
          backgroundColor="#8478F7"
          color="white"
          content={"회원가입 하기"}
          link={"/start/signup1"}
        />
      </div>
      <div className="w-full flex items-center justify-center flex-col gap-[1.35vh]">
        <div className="items-center justify-center">기존 회원이라면?</div>
        <Button
          backgroundColor="#999999"
          color="white"
          content={"로그인 하기"}
          link={"/start/login"}
        />
      </div>
    </div>
  </section>
);

export default Start;
