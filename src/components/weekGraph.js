import React from 'react';

const WeeklyCaffeineGraph = ({ data }) => {
    const maxCaffeine = Math.max(...data.map(day => day.amount));
    const maxHeight = 15; // 바의 최대 높이 (vh 단위로 조정)
    const minHeight = 1.85; // 최소 높이 (vh 단위로 조정)

    return (
        <div className="flex flex-col items-center">
            <div className="w-[89.33vw] h-[22.39vh] bg-white rounded-[5.33vw] px-[1.6vw] flex justify-center items-end">
                {data.map((day, index) => {
                    const height = day.amount > 0 ? (day.amount / maxCaffeine) * maxHeight : minHeight; // 비례적으로 높이 계산

                    return (
                        <div key={index} className="flex flex-col items-center">
                            <div
                                className="w-[11.73vw] rounded-t-lg flex items-end justify-center"
                                style={{
                                    height: `${height}vh`,
                                    backgroundColor: day.isToday ? '#8478F7' : '#EBEBEB',
                                }}
                            >
                                <span className={`block text-[10px] text-center justify-start ${day.isToday ? 'text-white' : 'text-gray'}`} >{day.amount}mg</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center w-[89.33vw] mt-[0.74vh]">
                {data.map((day, index) => (
                    <span key={index} className={`mx-[0.27vw] px-[3.87vw] text-[10px] text-AppleRegular ${day.isToday ? 'text-purple' : 'text-gray'}`}>
                        {day.date}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default WeeklyCaffeineGraph;
