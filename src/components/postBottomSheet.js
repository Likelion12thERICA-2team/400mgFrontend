import React, { useState } from "react";

const BottomSheet = ({ visible, onClose, onSubmit }) => {
  const [content, setContent] = useState("");

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-end">
      <div className="bg-white w-full rounded-t-lg p-4">
        <div className="flex justify-between items-center pb-[8px] border-b font-AppleSemiBold ">
          <h2 className="ttext-[16px]">글 작성하기</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <textarea
          className="w-full p-2 border font-AppleMedium rounded mt-4"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요..."
        ></textarea>
        <button
          className="bg-lightPurple text-white p-2 font-AppleMedium text-[16px] rounded mt-4 w-full"
          onClick={() => {
            onSubmit(content);
            setContent("");
          }}
        >
          게시
        </button>
      </div>
    </div>
  );
};

export default BottomSheet;
