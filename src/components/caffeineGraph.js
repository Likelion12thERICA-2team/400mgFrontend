import React, { useState, useEffect } from 'react';
import circle from "../assets/graphCircle.png"

const CaffeineGraph = ({ caffeineData }) => {

    const [currentIndex, setCurrentIndex] = useState(71); // 현재 시간을 나타내는 인덱스

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 145);
        }, 600000); // 600000 10분마다 인덱스 업데이트

        return () => clearInterval(timer);
    }, []);

    const getTimeLabel = (offset) => {
        const time = new Date();
        time.setMinutes(time.getMinutes() + (offset - 71) * 10);
        return time.toLocaleString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
        }).toLowerCase().replace(' ', '');
    };


    // const getGraphPath = () => {
    //     let path = `M0,${73 - (caffeineData[(currentIndex - 36 + 145) % 145] / 100) * 73} `;
    //     for (let i = 1; i < 73; i++) {
    //         const dataIndex = (currentIndex - 36 + i + 145) % 145;
    //         const x = (i / 72) * 375;
    //         const y = 73 - (caffeineData[dataIndex] / 100) * 73;
    //         path += `L${x},${y} `;
    //     }
    //     path += 'L375,73 L0,73 Z';
    //     return path;
    // };
    const getGraphPath = () => {
        let path = `M0,${73 - (caffeineData[(currentIndex - 36 + 145) % 145] / 400) * 31} `;
        for (let i = 1; i < 31; i++) {
            const dataIndex = (currentIndex - 36 + i + 145) % 145;
            const x = (i / 30) * 375;
            const y = 73 - (caffeineData[dataIndex] / 400) * 73;
            path += `L${x},${y} `;
        }
        path += 'L375,73 L0,73 Z';
        return path;
    };

    // const currentCaffeineLevel = caffeineData[currentIndex];
    // const currentY = 73 - (currentCaffeineLevel / 100) * 73;
    const dataIndex = (currentIndex - 36 + 15 + 145) % 145;
    const currentCaffeineLevel = caffeineData[dataIndex];
    const currentY = 73 - (currentCaffeineLevel / 400) * 73;

    return (
        <div className="w-[375px]">
        <div className="h-[73px] relative">
            <svg className="w-full h-full">
                <defs>
                    <linearGradient id="graphGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#BCB5FF" stopOpacity="1.0"/>
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1.0"/>
                    </linearGradient>
                </defs>
                <path
                    d={getGraphPath()}
                    fill="url(#graphGradient)"
                />
                <path
                    d={getGraphPath()}
                    fill="none"
                    stroke="#999999"
                    strokeWidth="0.75"
                />

                <line x1="187.5" y1="0" x2="187.5" y2="73" stroke="#999999" strokeWidth="1"/>
                <image href={circle} x="182.5" y={currentY - 5} width="10" height="10"/>
            </svg>
        </div>
        <div className="w-[375px] border-[0.75px] border-[#999999]" />
        <div className="h-[20px] flex items-center justify-between text-[10px] font-AppleMedium text-[#5A5A5A] ">
            {[-2, -1, 0, 1, 2].map((offset) => (
            <span key={offset} className="w-1/5 text-center">
                {getTimeLabel(currentIndex + offset * 6)}
            </span>
            ))}
        </div>
        </div>
  );
};

export default CaffeineGraph;