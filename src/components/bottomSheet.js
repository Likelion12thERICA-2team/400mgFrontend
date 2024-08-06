import React, { useEffect, useState } from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/web";

import CaffeineBarGraph from "./barGraph";
import WeeklyCaffeineGraph from "./weekGraph";

import arrow_right from "../assets/arrow_right_black.png";
import neurology from "../assets/neurology.png";
import coffee from "../assets/coffee.png";

const BottomSheet = ({ date, onClose, caffeineData }) => {
    const formattedDate = date ? date.toLocaleDateString("ko-KR") : "";
    const [springProps, setSpring] = useSpring(() => ({ y: window.innerHeight }));
    const [caffeineAmount, setCaffeineAmount] = useState(0); 

    useEffect(() => {
        setSpring.start({ y: 0 });
    }, [setSpring]);

    const bind = useDrag(({ down, movement: [, my], memo = springProps.y.get() }) => {
        if (my > 100 && !down) {
            onClose();
        }
        setSpring.start({ y: down ? memo + my : 0 });
        return memo;
    }, { axis: 'y', from: () => [0, springProps.y.get()] });

    useEffect(() => {
        const todayData = Array.isArray(caffeineData) && caffeineData.find(data => data.isToday);
        if (todayData) {
            setCaffeineAmount(todayData.amount);
        }
    }, [caffeineData]);

    return (
        <animated.section
            {...bind()}
            style={{ 
                y: springProps.y,
                maxHeight: '89.9vh'
             }}
            className="fixed bottom-0  px-[5.6vw] flex flex-col w-[100vw] bg-[#F6F6F6] border-t border-gray shadow-lg rounded-t-2xl z-40 touch-none pb-[22.67vh] overflow-y-auto">
            <div className="w-full flex justify-center pt-[2.67vh] mb-[1.47vh]" >
                <div className="w-[11.47vw] h-[0.49vh] bg-gray rounded-full"></div>
            </div>
            <div className="flex flex-col justify-center items-start px-[1.6vw] ">
                <div className="text-[20px] font-AppleSemiBold">{formattedDate} 카페인 섭취량</div>
                <div className="text-[14px] font-AppleMedium pt-[1.07vh] mb-[2.4vh]">총 {caffeineAmount}mg 섭취했어요.</div>
                <CaffeineBarGraph caffeineAmount={caffeineAmount} />
            </div>
            <div className="flex flex-col justify-center items-start mt-[4.88vh]">
                <div className="text-[20px] font-AppleSemiBold">일주일 카페인 분석</div>
                <div className="text-[14px] font-AppleMedium pt-[1.07vh] mb-[2.4vh]"></div>
                <WeeklyCaffeineGraph data={Array.isArray(caffeineData) ? caffeineData : []} />
            </div>
            <div className="flex flex-col justify-center items-start mt-[4.06vh]">
                <div className="text-[20px] font-AppleSemiBold">카페인 관리 팁</div>
                <div className="w-full space-y-[1.07vh] mt-[1.07vh]">
                    <div className="w-full flex items-center bg-white rounded-[5.33vw] p-[1.6vw] shadow">
                        <div className="w-[12vw] h-[6vh] bg-[#FFD644] rounded-full flex items-center justify-center">
                            <img src={coffee} alt="coffee icon" className="w-[24px] h-[24px]" />
                        </div>
                        <div className="ml-[1.6vw] flex-1">
                            <div className="text-[16px] font-AppleSemiBold">디카페인 커피</div>
                            <div className="text-[14px] text-gray-500">카페인 금단 증상 해소에 도움이 돼요</div>
                        </div>
                        <div>
                            <img src={arrow_right} alt="arrow icon" className="w-[16px] h-[16px]" />
                        </div>
                    </div>
                    <div className="w-full flex items-center bg-white rounded-[5.33vw] p-[1.6vw] shadow">
                        <div className="w-[12vw] h-[6vh] bg-[#9EDCFF] rounded-full flex items-center justify-center">
                            <img src={neurology} alt="brain icon" className="w-[24px] h-[24px]" />
                        </div>
                        <div className="ml-[1.6vw] flex-1">
                            <div className="text-[16px] font-AppleSemiBold">뇌를 활성화 시키는 7가지 방법</div>
                            <div className="text-[14px] text-gray-500">좋은 환경을 만들거나 스트레칭 해보세요</div>
                        </div>
                        <div>
                            <img src={arrow_right} alt="arrow icon" className="w-[16px] h-[16px]" />
                        </div>
                    </div>
                </div>
            </div>
        </animated.section>
    );
};

export default BottomSheet;
