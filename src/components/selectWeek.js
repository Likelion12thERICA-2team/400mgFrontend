// components/SelectedWeek.js
import React from "react";
import { format, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

// getWeekDays 함수
const getWeekDays = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = endOfWeek(date, { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
};

// SelectedWeek 컴포넌트
const SelectedWeek = ({ selectedDate }) => {
    const weekDays = getWeekDays(selectedDate);
    return (
        <div className="flex items-center justify-center bg-white top-0 z-40 gap-[10px] mt-[3px] mx-[26px] ">
            {weekDays.map((day) => (
                <div key={format(day, "yyyy-MM-dd")} className="flex flex-col font-AppleRegular">
                    <div className={`w-[39px] h-[67px] flex flex-col px-[10px] py-[10px] items-center justify-center rounded-[16px] ${isSameDay(day, selectedDate) ? "bg-purple text-white" : "text-black"}`}>
                        <span className="text-[10px]">{format(day, "EEE")}</span>
                        <span className="text-[14px]">{format(day, "dd")}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SelectedWeek;