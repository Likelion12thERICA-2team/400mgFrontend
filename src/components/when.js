import React, { useState } from "react";
import WheelPicker from "./wheelPicker";
import Button from "./Button";
import ImageButton from "./plusButton"
import Plus from "../assets/Plus.png"

const When = () => {
	const [selectedTimes, setSelectedTimes] = useState([]);
	const [currentPeriod, setCurrentPeriod] = useState('오전');
	const [currentHour, setCurrentHour] = useState(1);

	const addTime = () => {
		const time = `${currentPeriod} ${currentHour}시`;
		if (!selectedTimes.includes(time)) {
		  setSelectedTimes([...selectedTimes, time]);
		}
	  };
	
	  const removeTime = (time) => {
		setSelectedTimes(selectedTimes.filter(t => t !== time));
	  };

	return(
		<section className="mt-[26px] mb-[32px] flex flex-col tems-center justify-center m-[20px] " >
			<div className="text-[26px] font-AppleBold items-center" >
				카페인을 섭취하는 시간대를 <br />
				알려주세요
			</div>
			<div className="text-[16px] font-AppleMeBold items-center " >
				정확하게 기억이 안나도 괜찮아요<br />
                중복 선택도 가능해요
			</div>
			<div className="w-[350px] bg-gray-200 mt-[158px] items-center justify-center" >
				<div className="text-[26px] w-full h-[64px] flex items-center relative " >
					<WheelPicker items={['오전', '오후']} onSelect={setCurrentPeriod}/>
					<WheelPicker items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} onSelect={setCurrentHour} />
					<div className="text-[26px] font-AppleSemiBold ml-[8px] mr-[20px]">시 </div>
					<ImageButton src={Plus} alt="Add time" onClick={addTime} />
				</div>
				<div className="mt-[200px] px-[12px] flex flex-wrap mb-[11px]">
					{selectedTimes.map(time => (
					<div key={time} className="flex items-center bg-grayLight text-AppleMedium px-2 py-1 rounded-[10px] mr-2 mt-2">
						{time}
						<button onClick={() => removeTime(time)} className="ml-2 text-red-500">x</button>
					</div>
					))}
				</div>
				<div className="absolute bottom-8 w-full flex justify-center">
					<div className=" w-full max-w-md">
					<Button backgroundColor="#8478F7" color="white" content={"계속하기"} link={"/start/bodyInfo1"} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default When;