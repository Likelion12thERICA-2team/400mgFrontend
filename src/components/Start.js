import React from "react";

import LogoStart from "../assets/LogoStart.png"
import Button from "./halfButton";

const Start = () =>
	<section className="mt-[136px] mb-[32px] flex flex-col  items-start justify-center m-[20px]" >
		<div className="items-center px-[35px]" >
			<img src={LogoStart} alt="첫화면 얼굴" className=" w-auto h-[360px]" />
		</div>
		<div className="text-[26px] pl-[35px] text-center font-[AppleSemiBold] items-center" >
			400mg과 함께 <br />
			올바른 카페인 습관 챙기기
		</div>
		<div className="w-[335px] absolute bottom-[32px] flex flex-col gap-[10px] items-start">
			<div className=" w-full flex pl-[20px] gap-[62px] text-[14px] font-AppleSemiBold ">
				<div className="items-center justify-center">400mg이 처음이라면?</div>
				<div className="items-center justify-center">기존 회원이라면?</div>
			</div>
			<div className=" w-full flex gap-[15px]">
				<Button backgroundColor="#8478F7" color="white" content={"회원가입 하기"} link={"/start/signup1"} />
				<Button backgroundColor="#8478F7" color="white" content={"로그인 하기"} link={"/start/login"} />
			</div>
		</div>
	</section>


export default Start;