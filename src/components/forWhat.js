import React, { useState } from 'react';
import Button from "./Button";

const ForWhat = () => {

	const [selected, setSelected] = useState(false);

  const handleSelection = () => {
    setSelected(true);
  };

	return(
		<section className="mt-[26px] mb-[32px] flex flex-col tems-center justify-center m-[20px]" >
			<div className="text-[26px] font-AppleBold items-center " >
				주로 무엇을 위해 카페인을 <br />
				찾으시나요?
			</div>
			<div className="text-[16px] font-AppleMeBold items-center " >
				정확하게 기억이 안나도 괜찮아요
			</div>
			<div className="w-[350px] h-[64px] mt-[85px] items-center justify-center" >
				<div className="gap-[12px] flex flex-col " >
					<div onClick={handleSelection}>
						<Button backgroundColor="#EBEBEB" color="black" content={"직장"} />
					</div>
					<div onClick={handleSelection}>
						<Button backgroundColor="#EBEBEB" color="black" content={"학교"} />
					</div>
					<div onClick={handleSelection}>
						<Button backgroundColor="#EBEBEB" color="black" content={"취미"} />
					</div>
					<div onClick={handleSelection}>
						<Button backgroundColor="#EBEBEB" color="black" content={"공부"} />
					</div>
					<div onClick={handleSelection}>
						<Button backgroundColor="#EBEBEB" color="black" content={"기타"} />
					</div>
				</div>
				<div className="absolute bottom-8 w-full flex justify-center">
					<div className="w-full max-w-md">
					<Button backgroundColor={selected ? "#CBC7F6" : "#8478F7"} color="white" content={"계속하기"} link={"/start/signup3"} />
					</div>
				</div>
			</div>

		</section>
	);
};

export default ForWhat;