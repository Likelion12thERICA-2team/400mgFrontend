import React from "react";
import WheelPicker from "./wheelPicker";
import Button from "./Button";

const HowMuch = () => {

	return(
		<section className="mt-[26px] mb-[32px] flex flex-col tems-center justify-center " >
			<div className="text-[26px] font-AppleBold items-center px-[12px]" >
				평소에 커피나 드링크같은 <br />
				각성제를 얼마나 마시나요?
			</div>
			<div className="text-[16px] font-AppleMeBold items-center px-[12px]" >
				정확하게 기억이 안나도 괜찮아요
			</div>
			<div className="w-[350px] h-[64px] mt-[158px] items-center justify-center" >
				<div className="text-[26px] font-AppleMeBold  flex flex-row items-center " >
					<WheelPicker items={['하루', '일주일', '한 달', '1년']}/>
					<div className="text-[26px] font-AppleSemiBold bg-grayLight">에</div>
					<WheelPicker items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}/>
					<div className="text-[26px] font-AppleSemiBold bg-grayLight">번&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
				</div>
				<div className="mt-[94px] px-[12px]">
					<Button backgroundColor="#A198F6" color="white" content={"계속하기"} link={"/start/signup2"}/>
				</div>
			</div>
		</section>
	);
};

export default HowMuch;