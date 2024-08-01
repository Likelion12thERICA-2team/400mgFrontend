import React from "react";

import LogoStart from "../assets/LogoStart.png"
import Button from "./Button";

const Start = () =>
	<section className="mt-[136px] mb-[32px] flex flex-col  items-start justify-center m-[20px]" >
		<div className="items-center px-[35px]" >
			<img src={LogoStart} alt="첫화면 얼굴" className=" w-auto h-[360px]" />
		</div>
		<div className="text-[26px] pl-[35px] text-center font-[AppleSemiBold] items-center" >
			400mg과 함께 <br />
			올바른 카페인 습관 챙기기
		</div>
		<div className="absolute bottom-[32px] w-full flex items-start">
			<div className=" w-full max-w-md">
			<Button backgroundColor="#8478F7" color="white" content={"환영해요!"} link={"/start/signup1"} />
			</div>
		</div>
	</section>


export default Start;