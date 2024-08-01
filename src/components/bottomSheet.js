import React, { useEffect, useState } from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/web";

import CaffeineBarGraph from "./barGraph";
import WeeklyCaffeineGraph from "./weekGraph";

import arrow_right from "../assets/arrow_right_black.png"
import neurology from "../assets/neurology.png"
import coffee from "../assets/coffee.png"

const BottomSheet = ({ date, onClose }) => {
    const formattedDate = date ? date.toLocaleDateString("ko-KR") : "";
    const [springProps, setSpring] = useSpring(() => ({ y: window.innerHeight }));
    const [caffeineAmount, setCaffeineAmount] = useState(0); 


    useEffect(() => {
        setSpring.start({ y: 0 });
    }, [setSpring]);


    const bind = useDrag(({ down, movement: [, my], memo = springProps.y.get() }) => {
        if (my > 100 && !down) {
            onClose()
        }
        setSpring.start({ y: down ? memo + my : 0 });
        return memo;
    }, { axis: 'y', from: () => [0, springProps.y.get()] });

    const caffeineData = [
        { date: '7.15', amount: 330, isToday: false },
        { date: '7.16', amount: 280, isToday: false },
        { date: '7.17', amount: 20, isToday: false },
        { date: '7.18', amount: 180, isToday: false },
        { date: '7.19', amount: 240, isToday: false },
        { date: '7.20', amount: 120, isToday: false },
        { date: '7.21', amount: 250, isToday: true },
    ];

    useEffect(() => {
        const todayData = caffeineData.find(data => data.isToday);
        if (todayData) {
            setCaffeineAmount(todayData.amount);
        }
    }, [caffeineData]);

    return (
        <animated.section
            {...bind()}
            style={{ 
                y: springProps.y,
                maxHeight: '720px'
             }}
            className="fixed bottom-0 left-0 right-0 px-[21px] flex flex-col bg-[#F6F6F6] border-t border-gray shadow-lg rounded-t-2xl z-40 touch-none pb-[85px] overflow-y-auto" >
            <div className="w-full flex justify-center pt-[10px] mb-[11px]" >
                <div className="w-[43px] h-[4px] bg-gray rounded-full"></div>
            </div>
            <div className="flex flex-col justify-center items-start px-[6px] ">
                <div className="text-[20px] font-AppleSemiBold">{formattedDate} 카페인 섭취량</div>
            <div className="text-[14px] font-AppleMedium pt-[4px] mb-[9px]">총 {caffeineAmount}mg 섭취했어요. 아메리카노 두잔 정도에요.</div>
            <CaffeineBarGraph caffeineAmount={caffeineAmount} />
            </div>
            <div className="flex flex-col justify-center items-start mt-[37px]">
                <div className="text-[20px] font-AppleSemiBold">일주일 카페인 분석</div>
                <div className="text-[14px] font-AppleMedium pt-[4px] mb-[9px]">지금도 좋지만 하루정도 카페인을 쉬어주면 좋을 것 같아요.</div>
                <WeeklyCaffeineGraph data={caffeineData} />
            </div>
            <div className="flex flex-col justify-center items-start mt-[33px]">
                <div className="text-[20px] font-AppleSemiBold">카페인 관리 팁</div>
                    <div className="w-full space-y-4 mt-4">
                        <div className="w-full flex items-center bg-white rounded-[20px] p-4 shadow">
                            <div className="w-12 h-12 bg-[#FFD644] rounded-full flex items-center justify-center">
                                <img src={coffee} alt="coffee icon" className="w-6 h-6" />
                            </div>
                            <div className="ml-4 flex-1">
                                <div className="text-[16px] font-AppleSemiBold">디카페인 커피</div>
                                <div className="text-[14px] text-gray-500">카페인 금단 증상 해소에 도움이 돼요</div>
                            </div>
                            <div>
                                <img src={arrow_right} alt="arrow icon" className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="w-full flex items-center bg-white rounded-[20px] p-4 shadow">
                            <div className="w-12 h-12 bg-[#9EDCFF] rounded-full flex items-center justify-center">
                                <img src={neurology} alt="brain icon" className="w-6 h-6" />
                            </div>
                            <div className="ml-4 flex-1">
                                <div className="text-[16px] font-AppleSemiBold">뇌를 활성화 시키는 7가지 방법</div>
                                <div className="text-[14px] text-gray-500">좋은 환경을 만들거나 스트레칭 해보세요</div>
                            </div>
                            <div>
                                <img src={arrow_right} alt="arrow icon" className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
            </div>
        </animated.section>
    );
};

export default BottomSheet;