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
        <div className="flex items-center justify-center bg-white top-0 z-40 gap-[2.67vw] mt-[0.74vh] mx-[6.93vw]">
            {weekDays.map((day) => (
                <div key={format(day, "yyyy-MM-dd")} className="flex flex-col font-AppleRegular">
                    <div className={`w-[10.4vw] h-[8.24vh] flex flex-col px-[2.67vw] py-[2.67vh] items-center justify-center rounded-[4.27vw] ${isSameDay(day, selectedDate) ? "bg-purple text-white" : "text-black"}`}>
                        <span className="text-[10px]">{format(day, "EEE")}</span>
                        <span className="text-[14px]">{format(day, "dd")}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SelectedWeek;
