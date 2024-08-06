import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Calculating = () => {

    const [fillPercentage, setFillPercentage] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFillPercentage(98);
        }, 0);
    
        return () => clearTimeout(timer);
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/main'); // 여기에 다음 페이지 URL 넣기
        }, 1750); // 1.75초 후 이동

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
        <section 
            className="w-full h-screen bg-gradient-radial
             from-[#A699F1] via-[#A699F1] to-[#A198F6] 
             flex flex-col justify-center px-[5.33vw] items-center"
        >

            <div className="font-[AppleBold] text-[5.87vw] text-[#FFFF]">
                미국 식품의약국(FDA)에 따르면<br/>
                성인의 경우 1일 카페인 400mg이<br/> 
                안전하다고 해요.
            </div>

            <div className="mt-[3.82vh] w-[78.67vw]">
                <span className="font-[AppleMedium] text-[4.27vw] text-[#FFFF]">
                    계산 중...
                </span>
            </div>

            <div className="w-[88vw] h-[2.46vh] bg-white bg-opacity-100 rounded-[2.46vh] overflow-hidden mt-[1.36vh]">
                <div 
                    className="h-[1.73vh] bg-[#5217CE] transition-all 
                        duration-[1750ms] ease-linear mt-[0.37vh] mb-[0.37vh] ml-[0.8vw] mr-[0.8vw] rounded-[2.46vh]"
                    style={{ width: `${fillPercentage}%` }}
                >
                </div>
            </div>
        </section>
        </>
    );
};

export default Calculating;
