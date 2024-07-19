import React from "react";
import Button from "./Button";

const ForWhat = () =>
	<section className="mt-[26px] mb-[32px] flex flex-col px-[12px]" >
		<div className="text-[26px] font-AppleBold items-center " >
			주로 무엇을 위해 카페인을 <br />
			찾으시나요?
		</div>
		<div className="text-[16px] font-AppleMeBold items-center " >
			정확하게 기억이 안나도 괜찮아요
		</div>
		<div className="w-[350px] h-[64px] mt-[85px] items-center justify-center" >
			<div className="gap-[12px] flex flex-col " >
				<Button backgroundColor="#EBEBEB" Color="black" content={"직장"} />
				<Button backgroundColor="#EBEBEB" Color="black" content={"학교"}  />
				<Button backgroundColor="#EBEBEB" Color="black" content={"취미"} />
				<Button backgroundColor="#EBEBEB" Color="black" content={"공부"} />
				<Button backgroundColor="#EBEBEB" Color="black" content={"기타"} />
			</div>
			<div className="mt-[94px]">
				<Button backgroundColor="#A198F6" Color="white" content={"계속하기"} link={"/"}/>
			</div>
		</div>

	</section>


export default ForWhat;