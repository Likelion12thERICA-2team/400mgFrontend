import React from "react";

import LogoStart from "../assets/LogoStart.png"
import Button from "./Button";

const Start = () =>
	<section className="mt-[136px] mb-[32px] flex flex-col  items-center justify-center m-[10px]" >
		<div className=" " >
			<img src={LogoStart} alt="첫화면 얼굴" className=" w-[250px] h-[332px]" />
		</div>
		<div className="text-[26px] text-center font-AppleSemiBold items-center" >
			400mg과 함께 <br />
			올바른 카페인 습관 챙기기
		</div>
		<div className="absolute bottom-8 w-full flex justify-center">
			<div className="px-[20px] w-full max-w-md">
			<Button backgroundColor="#8478F7" color="white" content={"계속하기"} link={"/start/signup1"} />
			</div>
		</div>
	</section>


export default Start;