import React from "react";
import { useNavigate } from 'react-router-dom';

import home from "../assets/home.png"
import record from "../assets/date_range.png"
import cummunity from "../assets/speaker_notes.png"
import mypage from "../assets/account_circle.png"

import sHome from "../assets/selectedHome.png"
import sRecord from "../assets/selectedDate_range.png"
import sCummunity from "../assets/selectedSpeaker_notes.png"
import sMypage from "../assets/selectedAccount_circle.png"


// 사용법 : <NavigationBar page={"home"} /> home, report, community, mypage 중 하나 사용

const NavigationBar = ({ page }) => {
    const navigate = useNavigate();

    const getImage = (pageName, defaultImg, selectedImg) => {
        return page === pageName ? selectedImg : defaultImg;
    }

    return (
        <>
            <div className="w-[375px] h-[70px] border-t-[0.5px] 
                border-t-[#999999] rounded-t-[30px] bg-[#FFFFFF] mt-[10px]
                pt-[17px]">
                <div className="w-[375px] h-[39px] flex flex-row justify-center items-center">
                    <NavButton 
                        onClick={() => navigate("/main")}
                        imgSrc={getImage("home", home, sHome)}
                        altText="홈"
                        label="홈"
                    />
                    <NavButton 
                        onClick={() => navigate("/report")} //URL 변경완료
                        imgSrc={getImage("report", record, sRecord)}
                        altText="기록"
                        label="기록"
                    />
                    <NavButton 
                        onClick={() => navigate("/community")} //URL 변경해야함.
                        imgSrc={getImage("cummunity", cummunity, sCummunity)}
                        altText="커뮤니티"
                        label="커뮤니티"
                    />
                    <NavButton 
                        onClick={() => navigate("/mypage")} //URL 변경 완료
                        imgSrc={getImage("mypage", mypage, sMypage)}
                        altText="마이"
                        label="마이"
                    />
                </div>
            </div>
        </>
    );
};

const NavButton = ({ onClick, imgSrc, altText, label }) => (
    <button className="w-[93.75px] flex flex-col justify-center items-center" onClick={onClick}>
        <img src={imgSrc} alt={altText} />
        <span className="font-AppleRegular text-[10px]">{label}</span>
    </button>
);

export default NavigationBar;