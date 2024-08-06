import { useState, useEffect, useRef } from "react";
import uuid from "react-uuid";
import { format, addMonths, startOfWeek, addDays } from "date-fns";
import { endOfWeek, isSameDay, isSameMonth } from "date-fns";
import { startOfMonth, endOfMonth } from "date-fns";

import apiClient from "../apiClient";
import NavigationBar from "./navigationBar2";
import BottomSheet from "./bottomSheet";
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
        <div
          key={index}
          className="flex text-[10px] font-AppleRegular items-center justify-center px-[14px]"
        >
          <span className="text-black">{day}</span>
        </div>
      ))}
    </div>
  );
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

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
      };

      if (!isSameMonth(innerDay, monthStart)) {
        days.push(
          <div
            className="w-[13.33vw] h-[7.88vh] flex flex-col items-center justify-center bg-[transparent]"
            key={uuid()}
          >
            <span className="pt-[0.49vh] text-[transparent]">{formattedDate}</span>
          </div>
        );
      } else {
        const isToday = isSameDay(innerDay, selectedDate);

        days.push(
          <div
            className={`w-[13.33vw] h-[7.88vh] text-[14px] flex flex-col items-center justify-center ${
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
          </div>
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
      </div>
    );
    if (lastDayOfMonth) {
      rows.push(
        <div
          className="w-full left-0 right-0 border-b-[0.74vh] border-lightGray"
          key={uuid()}
        ></div>
      );
      lastDayOfMonth = false;
    }

    days = [];
  }
  return <div className="flex flex-col items-center">{rows}</div>;
};

const Calendar = () => {
  const currentDate = new Date();
  const selectedDate = new Date();

  let currentMonth = new Date(format(currentDate, "yyyy"));
  let months = [];

  const monthRef = useRef(null);

  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(true);
  const [caffeineData, setCaffeineData] = useState([]);
  const [rawData, setRawData] = useState({});

  const handleDateClick = (date) => {
    console.log("Selected day:", date);
    setSelectedDay(date);
    setBottomSheetVisible(true);
    processCaffeineData(date);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  useEffect(() => {
    async function fetchData() {
      const access_token = localStorage.getItem("access_token");
      try {
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
      const formattedDate = format(currentDate, "M.d");
      const day = format(currentDate, "d");
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
    const monthIsSelected =
      format(currentMonth, "MM") === format(selectedDate, "MM");
    months.push(
      <div
        className="w-[90%] h-[50%] pt-[0.61vh] mb-[2.46vh]"
        key={uuid()}
        ref={monthIsSelected ? monthRef : null}
      >
        <RenderHeader currentMonth={currentMonth} />
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
        />
      </div>
    );
    currentMonth = addMonths(currentMonth, 1);
  }

  useEffect(() => {
    if (monthRef.current !== null) {
      const offset = monthRef.current.offsetTop - window.innerHeight * 0.1232;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  const scrollCurrentMonth = () => {
    if (monthRef.current !== null) {
      const offset = monthRef.current.offsetTop - window.innerHeight * 0.1232;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-[AppleRegular] w-[100vw] mt-[2.46vh] mb-[3.94vh] mx-[1.23vw]">
      <div className="sticky top-0 w-full z-20 bg-white flex flex-col items-center pt-[1.84vh] pb-[1.23vh]">
        {!isBottomSheetVisible && (
          <div className="w-[80%] flex justify-between items-baseline text-theme-main-color pb-[1.23vh]">
            <p
              className="cursor-pointer hover:scale-105 hover:text-red-700"
              onClick={scrollCurrentMonth}
            >
              {currentDate.toLocaleString("ko-KR", { month: "long" })}
              {format(currentDate, " dd일")}
            </p>
            <p className="text-black font-bold">
              {format(currentDate, " yyyy")}
            </p>
          </div>
        )}
        {!isBottomSheetVisible && <RenderDays />}
        {isBottomSheetVisible && selectedDay && (
          <SelectedWeek selectedDate={selectedDay} />
        )}
      </div>
      <div className="flex flex-wrap overflow-y-scroll justify-center">
        {months}
      </div>
      <NavigationBar page={"report"} />
      {isBottomSheetVisible && (
        <BottomSheet
          date={selectedDay}
          onClose={closeBottomSheet}
          caffeineData={caffeineData}
        />
      )}
    </div>
  );
};

export default Calendar;
