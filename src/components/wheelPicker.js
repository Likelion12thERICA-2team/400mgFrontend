import React, { useState, useRef, useEffect } from "react";

const itemHeight = 40;

const WheelPicker = ({ items, onSelect }) => {
  // items에 선택 옵션들 배열로 넣으면 됨
  const [selectedItem, setSelectedItem] = useState(items[2]); // 초기 선택 항목을 중앙으로 설정
  const listRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = listRef.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight);
      const selectedIndex = Math.max(0, Math.min(items.length - 1, index - 1)); // 중앙에 위치한 항목의 인덱스 계산
      setSelectedItem(items[selectedIndex]);
    };

    const list = listRef.current;
    list.addEventListener("scroll", handleScroll);
    return () => {
      list.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const index = items.indexOf(selectedItem);
    listRef.current.scrollTo({
      top: (index + 2) * itemHeight, // 중앙에 선택된 항목이 위치하도록 스크롤 조정
      behavior: "smooth",
    });
    onSelect(selectedItem);
  }, [selectedItem, onSelect]);

  return (
    <div className="flex flex-col items-center no-scrollbar">
      <div className="relative h-40 w-32 overflow-hidden">
        <div
          ref={listRef}
          className="h-full overflow-y-scroll"
          style={{ scrollSnapType: "y mandatory", position: "relative" }}
        >
          <ul className="h-full">
            {Array(2)
              .fill(null)
              .map(
                (
                  _,
                  index // 위쪽에 빈 항목 추가
                ) => (
                  <li key={`spacer-top-${index}`} className="h-10" />
                )
              )}
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-center transition-colors duration-200"
                style={{
                  scrollSnapAlign: "center",
                  height: "40px",
                  color: selectedItem === item ? "#000000" : "#9CA3AF",
                  fontSize: selectedItem === item ? "26px" : "20px",
                  fontFamily:
                    selectedItem === item ? "AppleSemiBold" : "AppleMeBold",
                  zIndex: 3,
                }}
              >
                {item}
              </li>
            ))}
            {Array(2)
              .fill(null)
              .map(
                (
                  _,
                  index // 아래쪽에 빈 항목 추가
                ) => (
                  <li key={`spacer-bottom-${index}`} className="h-10" />
                )
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default WheelPicker;
