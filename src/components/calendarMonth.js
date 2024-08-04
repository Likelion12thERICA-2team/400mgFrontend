import { useState, useEffect, useRef } from "react";
import uuid from "react-uuid";
import { format, addMonths, startOfWeek, addDays } from "date-fns";
import { endOfWeek, isSameDay, isSameMonth } from "date-fns";
import { startOfMonth, endOfMonth } from "date-fns";

import apiClient from "../apiClient";
import NavigationBar from "./navigationBar";
import BottomSheet from "./bottomSheet"
import SelectedWeek from "./selectWeek";

const RenderHeader = ({ currentMonth }) => {
    return (
        <div className="text-start text-xl font-AppleSemiBold text-[20px] text-theme-main-color">
            {currentMonth.toLocaleString("ko-KR", { month: "long" })}
        </div>
    );
};

const RenderDays = () => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return (
        <div className="flex justify-between bg-white sticky top-0 z-40">
            {days.map((day, index) => (
                <div key={index} className="flex text-[10px] font-AppleRegular items-center justify-center px-[14px]">
                    <span className="text-black">{day}</span>
                </div>
            ))}
        </div>
    );
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);  // 현재 달의 첫번째 날짜
    const monthEnd = endOfMonth(monthStart);  // monthstart의 마지막 날짜
    const startDate = startOfWeek(monthStart);  // monthstart 이 주의 첫 번째 날짜 
    const endDate = endOfWeek(monthEnd);  // monthend 주의 마지막 날짜

    const rows = [];
    let days = [];
    let day = startDate;

    let lastDayOfMonth = false;


    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            const formattedDate = format(day, "d");
            const innerDay = day;

            const onDateClick2 = () => {
                onDateClick(innerDay);
            }

            // 현재 월에 속하지 않는 날짜(안보이게 처리)
            if (!isSameMonth(innerDay, monthStart)) {
                days.push(
                    <div
                        className="w-[50px] h-[64px] flex flex-col items-center justify-center bg-[transparent]"
                        key={uuid()}
                    >
                        <span className="pt-[4px] text-[transparent]">
                            {formattedDate}
                        </span>
                    </div>,
                );
            //현재 월에 속하는 날짜(오늘 날짜는 배경색과 글자색 효과)
            } else {
                const isToday = isSameDay(innerDay, selectedDate);

                days.push(
                    <div
                        className={`w-[50px] h-[64px] text-[14px] flex flex-col items-center justify-center ${
                            isToday ? "" : "bg-[transparent]"
                        }`}
                        key={uuid()}
                        onClick={onDateClick2}
                    >
                        {isToday && (
                            <div className="absolute w-[40px] h-[40px] bg-purple rounded-full"></div>
                        )}
                        <span
                            className={`pt-[4px] z-10 ${
                                isToday ? "text-white" : "text-black"
                            }`}
                        >
                            {formattedDate}
                        </span>
                    </div>,
                );
                if (isSameDay(innerDay, monthEnd)) {
                    lastDayOfMonth = true;
                }
            }
            day = addDays(innerDay, 1);
        }
        
        rows.push(
            <div className="flex justify-between w-full" key={uuid()}>
                {days}
            </div>,
        );
        // 각 달의 마지막에 회색 구분선 추가
        if (lastDayOfMonth) {
            rows.push(
                <div className="w-full left-0 right-0 border-b-[6px] border-lightGray " key={uuid()}></div>,
            );
            lastDayOfMonth = false;
        }

        days = [];
    }
    return <div className="flex flex-col items-center">{rows}</div>;
};

const Calendar =  () => {
    const currentDate = new Date();
    const selectedDate = new Date();  

    let currentMonth = new Date(format(currentDate, "yyyy"));
//    console.log(currentMonth)
    let months = [];

    const monthRef = useRef(null);

    const [selectedDay, setSelectedDay] = useState(currentDate);
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(true);
    const [caffeineData, setCaffeineData] = useState([]);
    const [rawData, setRawData] = useState({});

    const handleDateClick = (date) => {
        console.log('Selected day:', date);
        setSelectedDay(date);
        setBottomSheetVisible(true);
        processCaffeineData(date);
    };

    
    const closeBottomSheet = () => {
        setBottomSheetVisible(false);
    };

    useEffect(() => {
        async function fetchData(){
            const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyODUwMDYzLCJpYXQiOjE3MjI3NjM2NjMsImp0aSI6ImNmZWQ2MGZkNGJiZjRlZjU4NjFiY2JlZWVlNjU2MTk5IiwidXNlcl9pZCI6Mn0.A-5xp36cwJ5jKkmsPCIfhAsU4YxkIezgLuou_N0zmCU"
        try {
            //API 요청
            const response = await apiClient.get("caffeinintakes/monthly/2024/8/", {
            headers: {
                Authorization: "Bearer " + access_token,
            },
            });
            console.log(response);
            setRawData(response.data);
            processCaffeineData(selectedDate, response.data);
        } catch (error) {
            console.error(error);
        }
        }
        fetchData();
    }, []);

    const processCaffeineData = (date, data = rawData) => {
        const startOfWeekDate = startOfWeek(date);
        const weekData = [];
        
        for (let i = 0; i < 7; i++) {
            const currentDate = addDays(startOfWeekDate, i);
            const formattedDate = format(currentDate, 'M.d');
            const day = format(currentDate, 'd');
            const amount = data[day] || 0;

            weekData.push({
                date: formattedDate,
                amount: amount,
                isToday: isSameDay(currentDate, date),
            });
        }

        setCaffeineData(weekData);
    };
    

    for (let i = 0; i < 12; i++) {
        const monthIsSelected = format(currentMonth, "MM") === format(selectedDate, "MM");
        months.push(
            <div
                className="w-[90%] h-[50%] pt-[5px] mb-[20px] "
                key={uuid()}
                ref={monthIsSelected ? monthRef : null}
            >
                <RenderHeader currentMonth={currentMonth} />
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={handleDateClick}
                />
            </div>,
        );
        currentMonth = addMonths(currentMonth, 1);
    }

    useEffect(() => {
        if (monthRef.current !== null) {
            const offset = monthRef.current.offsetTop - 100;
            window.scrollTo({ top: offset, behavior: "smooth" });
        }
    }, []);

    const scrollCurrentMonth = () => {
        if (monthRef.current !== null) {
            const offset = monthRef.current.offsetTop - 100;
            window.scrollTo({ top: offset, behavior: "smooth" });
        }
    };

    return (
        <div className="flex flex-col items-center font-[AppleRegular] w-[375px] mt-[20px] mb-[32px] mx-[5px] ">
            <div className="sticky top-0 w-full z-20  bg-white flex flex-col items-center pt-[15px] pb-[10px]">
                {!isBottomSheetVisible && (
                    <div className="w-[80%] flex justify-between items-baseline text-theme-main-color pb-[10px]">
                        <p className="cursor-pointer hover:scale-105 hover:text-red-700" onClick={scrollCurrentMonth}>
                            {currentDate.toLocaleString("ko-KR", { month: "long" })}
                            {format(currentDate, " dd일")}
                        </p>
                        <p className="text-black font-bold">{format(currentDate, " yyyy")}</p>
                    </div>
                )}
                {!isBottomSheetVisible && <RenderDays />}
                {isBottomSheetVisible && selectedDay && <SelectedWeek selectedDate={selectedDay} />}
            </div>
            <div className="flex flex-wrap overflow-y-scroll justify-center">
                {months}
            </div>
            <NavigationBar page={"report"} />
            {isBottomSheetVisible && <BottomSheet date={selectedDay} onClose={closeBottomSheet} caffeineData={caffeineData}/>}
        </div>
    );
};


export default Calendar;