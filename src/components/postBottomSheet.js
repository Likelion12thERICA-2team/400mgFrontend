import React, { useState } from "react";

const BottomSheet = ({ visible, onClose, onSubmit, title, contentComponent }) => {
  const [input, setInput] = useState("");

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-lightGray bg-opacity-50 flex justify-center items-end">
      <div className="bg-white w-full rounded-t-lg p-4">
        <div className="flex justify-between items-center pb-2 text-[18px] font-AppleSemiBold border-b">
          <h2 className="text-xl">{title}</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        {contentComponent({ input, setInput })}
        <button
          className="bg-lightPurple text-[16px] font-AppleRegular text-white p-2 rounded mt-4 w-full"
          onClick={() => {
            onSubmit(input);
            setInput("");
          }}
        >
          {title === "글 작성하기" ? "게시" : "추가"}
        </button>
      </div>
    </div>
  );
};

export default BottomSheet;
