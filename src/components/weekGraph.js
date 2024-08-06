import React from 'react';

const WeeklyCaffeineGraph = ({ data }) => {
    const maxCaffeine = Math.max(...data.map(day => day.amount));
    const maxHeight = 150; // 바의 최대 높이
    const minHeight = 15;

    return (
        <div className="flex flex-col items-center">
            <div className="w-[335px] h-[170px] bg-white rounded-[20px] px-4 flex justify-center items-end">
                {data.map((day, index) => {
                    const height = day.amount > 0 ? (day.amount / maxCaffeine) * maxHeight : minHeight; // 비례적으로 높이 계산

                    return (
                        <div key={index} className="flex flex-col items-center">
                            <div
                                className="w-[44px] rounded-t-lg flex items-end justify-center"
                                style={{
                                    height: `${height}px`,
                                    backgroundColor: day.isToday ? '#8478F7' : '#EBEBEB',
                                }}
                            >
                                <span className={`block text-[10px] text-center justify-start ${day.isToday ? 'text-white' : 'text-gray'}`} >{day.amount}mg</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center w-[335px] mt-[3px]">
                {data.map((day, index) => (
                    <span key={index} className={`mx-1 px-[10px] text-[10px] text-AppleRegular ${day.isToday ? 'text-purple' : 'text-gray'}`}>
                        {day.date}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default WeeklyCaffeineGraph;
