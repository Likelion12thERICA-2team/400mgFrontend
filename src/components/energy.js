import React from "react";
import Round26Button from "./round26Button";

const Energy = ({ onSelect }) => {

    const energyItems = [
        { name: '핫식스', caffeine: 32 },
        { name: '더킹', caffeine: 100 },
        { name: '레드불', caffeine: 62 },
        { name: '몬스터', caffeine: 93 },
        { name: '벡셀', caffeine: 60 },
        { name: '박카스', caffeine: 30 },
        { name: '구론산 ', caffeine: 30 },
      ];

    // 버튼을 3개씩 그룹화
    const groupedItems = energyItems.reduce((resultArray, item, index) => { 
        const groupIndex = Math.floor(index / 3);
        if(!resultArray[groupIndex]) {
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
                    className={`flex flex-row gap-[8px] ${
                        groupIndex === 0 ? 'mt-[15px]' : 'mt-[12px]'
                    } ${
                        groupIndex === groupedItems.length - 1 ? 'mb-[18px]' : ''
                    }`}
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

export default Energy;