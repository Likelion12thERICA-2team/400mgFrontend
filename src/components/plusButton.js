import React from 'react';
import Plus from "../assets/Plus.png"

const ImageButton = ({ src, alt, onClick }) => {
  return (
    <button onClick={onClick} className="focus:outline-none">
      <img src={src} alt={alt} className="w-[30px] h-[40px]" />
    </button>
  );
};

export default ImageButton;