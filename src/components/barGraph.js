import React from 'react';

const CaffeineBarGraph = ({ caffeineAmount }) => {
    const totalBars = 20;
    const barUnit = 20; // 각 칸이 20mg

    let purpleBars = 0;
    let redBars = 0;

    if (caffeineAmount > 400) {
        purpleBars = 20; // 보라색은 무조건 20칸
        redBars = Math.ceil((caffeineAmount - 400) / barUnit);
    } else {
        purpleBars = Math.ceil(caffeineAmount / barUnit);
        redBars = 0;
    }

    return (
        <div className="w-full h-[72px] bg-white rounded-[20px] flex overflow-hidden px-[4px] justify-center items-center">
            {[...Array(totalBars)].map((_, index) => {
                let barColor = 'bg-lightGray';
                if (caffeineAmount <= 400) {
                    if (index < purpleBars) {
                        barColor = 'bg-purple';
                    }
                } else {
                    if (index < redBars) {
                        barColor = 'bg-red';
                    } else if (index < totalBars) {
                        barColor = 'bg-purple';
                    }
                }
                return <div key={index} className={`h-[54px] w-[12px] mx-[2px] ${barColor} rounded-full`}></div>;
            })}
        </div>
    );
};

export default CaffeineBarGraph;