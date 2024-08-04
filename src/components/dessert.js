import React from "react";
import Round26Button from "./round26Button";

const Dessert = ({ onSelect }) => {

    const dessertItems = [
        { name: '초콜릿', caffeine: 50 },
        { name: '녹차', caffeine: 45 },
        { name: '홍차', caffeine: 40 },
        { name: '우롱차', caffeine: 30 },
        { name: '콤부차', caffeine: 15 },
        { name: '콜라', caffeine: 30 },
        { name: '아이스크림', caffeine: 30 },
        { name: '커피사탕', caffeine: 5 },
        { name: '진통제', caffeine: 30 },
    ];

    // 버튼을 3개씩 그룹화
    const groupedItems = dessertItems.reduce((resultArray, item, index) => { 
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

export default Dessert;