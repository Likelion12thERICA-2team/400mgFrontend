import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/start');
        }, 1750); // 1.75초 후 이동

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="w-full h-screen bg-gradient-radial from-[#A699F1] via-[#A699F1] to-[#A198F6] flex justify-center items-center">
            <h1 className="font-[AppleReBold] text-[40px] text-white text-center">LoGo</h1>
        </div>
    );
};

export default Splash;