import React from "react";
import Round26Button from "./round26Button";

const Coffee = ({ onSelect }) => {
  const coffeeItems = [
    { name: "톨", caffeine: 150 },
    { name: "그란데", caffeine: 225 },
    { name: "벤티", caffeine: 300 },
    { name: "레쓰비", caffeine: 74 },
    { name: "칸타타", caffeine: 179 },
    { name: "T.O.P", caffeine: 129 },
    { name: "카누", caffeine: 33 },
    { name: "맥심", caffeine: 62 },
  ];

  // 버튼을 3개씩 그룹화
  const groupedItems = coffeeItems.reduce((resultArray, item, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!resultArray[groupIndex]) {
      resultArray[groupIndex] = [];
    }
    resultArray[groupIndex].push(item);
    return resultArray;
  }, []);

  return (
    <div className="flex flex-col">
      {groupedItems.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className={`flex flex-row gap-[2.13vw] ${
            groupIndex === 0 ? "mt-[1.88vh]" : "mt-[1.57vh]"
          } ${groupIndex === groupedItems.length - 1 ? "mb-[2.35vh]" : ""}`}
        >
          {group.map((item, index) => (
            <Round26Button
              key={index}
              backgroundColor={"#EBEBEB"}
              color={"black"}
              content={item.name}
              onClick={() => onSelect(item)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Coffee;
