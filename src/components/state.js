import React, {useState, useEffect} from "react";
import notification from "../assets/notifications.png";
import notificationWhite from "../assets/notificationsWhite.png";

import good from "../assets/motion_양호.gif";
import normal from "../assets/motion_보통.gif";
import focus from "../assets/motion_보통.gif"; //집중 없음
import arousal from "../assets/motion_각성.gif";
import excess from "../assets/motion_과잉.gif";
import limit from "../assets/motion_한계.gif";

import pen from "../assets/edit.png"

import NavigationBar from "./navigationBar";

const State = () => {

    // 상태
    const [num, setNum] = useState(0);

    // 작은 블럭 색
    const [miniBg, setMiniBg] = useState('');

    // 상태 문구
    const [state, setState] = useState('');

    // 글자색
    const [wordColor, setWordColor] = useState('');

    // 배경색
    const [bgColor, setBgColor] = useState('');

    // 맨위 문구 색
    const [topColor, setTopColor] = useState('');

    //작은 블럭 테두리 색
    const [miniBorder, setMiniBorder] = useState('');

    
    // 카페인 섭취량에 따라 상태 변환
    const caffeine2state = (mg) => {
        
        if (mg < 0) {
            setMiniBg('#FAA931'); 
            setState('양호');
            setWordColor('#FFFFFF');
            setBgColor('#FAA931'); //yellow
            setNum(1);//양호
            setTopColor('#222222');
            setMiniBorder('5px solid #EFEFEF');
        } else if (mg >= 0 && mg < 50) {
            setMiniBg('#FFFFFF'); 
            setState('보통');
            setWordColor('#222222');
            setBgColor('#F6F6F6'); //white
            setNum(2);//보통
            setTopColor('#222222');
            setMiniBorder('5px solid #D2D2D2');
        } else if (mg >= 50 && mg < 150) {
            setMiniBg('#FF8C7C');
            setState('집중'); 
            setWordColor('#FFFFFF');
            setBgColor('#FFAE9D'); //pink
            setNum(3);//집중
            setTopColor('#222222');
            setMiniBorder('5px solid #EFEFEF');
        } else if (mg >= 150 && mg < 250) {
            setMiniBg('#FF5353');
            setState('각성');
            setWordColor('#FFFFFF');
            setBgColor('#FF5353'); //red
            setNum(4);//각성
            setTopColor('#FFFFFF');
            setMiniBorder('5px solid #EFEFEF');
        } else if (mg >= 250 && mg < 400) {
            setMiniBg('#6543EF');
            setState('과잉');
            setWordColor('#FFFFFF');
            setBgColor('#6543EF'); //blue
            setNum(5);//과잉
            setTopColor('#FFFFFF');
            setMiniBorder('5px solid #EFEFEF');
        } else {
            setMiniBg('#35323D');
            setState('한계');
            setWordColor('#FFFFFF');
            setBgColor('#303030'); //black
            setNum(6);//한계
            setTopColor('#FFFFFF');
            setMiniBorder('5px solid #D2D2D2');
        }
        
    };
    
    //임의의 카페인 섭취량
    const caffeineAmount = 300 ;

    // useEffect를 사용하여 컴포넌트가 마운트될 때 한 번만 호출
    useEffect(() => {
        caffeine2state(caffeineAmount);
    }, []); // 빈 배열을 넣어 의존성 배열을 설정하여 처음 렌더링될 때만 호출

    // num에 따라 이미지 경로 결정
    const getImageSrc = () => {
        switch (num) {
            case 1:
                return good; // 양호
            case 2:
                return normal; // 보통
            case 3:
                return focus; // 집중
            case 4:
                return arousal; // 각성
            case 5:
                return excess; // 과잉
            case 6:
                return limit; // 한계
            default:
                return normal; // 기본값
        }
    };

    const getNotiSrc = () => {
        switch (num) {
            case 1:
                return notification; //양호
            case 2:
                return notification; // 보통
            case 3:
                return notification; // 집중
            case 4:
                return notificationWhite; // 각성
            case 5:
                return notificationWhite; // 과잉
            case 6:
                return notificationWhite; // 한계
            default:
                return notification; // 기본값
        }
    };

    const getHello1 = () => {
        switch (num) {
            case 1:
                return ( <> 오랜만이에요 커피중독님! </> ); //양호
            case 2:
                return ( <> 커피중독님, 오늘도 화이팅이에요! </> ); // 보통
            case 3:
                return ( <> 커피중독님, 잠은 좀 깨셨나요? </> ); // 집중
            case 4:
                return ( <> 오랜만이에요 커피중독님! </> ); // 각성
            case 5:
                return ( <> 오랜만이에요 커피중독님! </> ); // 과잉
            case 6:
                return ( <> 더이상 카페인은 힘들어요. </> ); // 한계
            default:
                return notification; // 기본값
        }
    };

    const getHello2 = () => {
        switch (num) {
            case 1:
                return ( <> 잘 지내셨나요? </> ); //양호
            case 2:
                return ( <> </> ); // 보통
            case 3:
                return ( <> </> ); // 집중
            case 4:
                return ( <> 잘 지내셨나요? </> ); // 각성
            case 5:
                return ( <> 잘 지내셨나요? </> ); // 과잉
            case 6:
                return ( <> 휴식을 취해주세요. </> ); // 한계
            default:
                return notification; // 기본값
        }
    };


    return (
        <>
        
            <section 
                className="flex flex-col justify-center"
            >
                                                    {/* 배경색 */}
                <div className="h-[812px] w-[375px]" style={{backgroundColor : bgColor}}>

                    <div className="h-[50px] w-[335px] ml-[20px] mr-[20px] mt-[26px] flex flex-col">

                        <div className="h-[25px] w-[335px] flex justify-between">

                            <span className="text-[18px] font-[AppleSemiBold] " style={{color : topColor}}>
                                {/* 커피중독님, 오늘도 화이팅이에요! */}
                                {getHello1()}
                            </span>

                            <span className="">
                                <img src = {getNotiSrc()} alt = "알림"/>
                            </span>

                        </div>

                        <div className="h-[25px] w-[335px] flex justify-start">

                            <span className="text-[18px] font-[AppleSemiBold] " style={{color : topColor}}>
                                {/* 커피중독님, 오늘도 화이팅이에요! */}
                                {getHello2()}
                            </span>

                        </div>


                    </div>

                    <div className="mt-[24px] flex justify-center">
    
                                {/* gif */}
                        <img src={getImageSrc()} alt = "보통 표정" className="w-[270px] h-[270px]"/>

                    </div>


                    {/*  이모지 밑 상태창 */}
                    <div className="relative w-[375px] h-[396px] bg-[#FFFFFF] rounded-t-[30px] mt-[46px]">
                        
                        {/* 상단에 걸쳐있는 작은 블록 */}
                        <div 
                            className="small-block w-[101px] h-[56px] absolute top-0 left-1/2 transform
                                -translate-x-1/2 -translate-y-1/2 rounded-[30px]
                                flex items-center justify-center
                                bg-[#FFFFFF] text-black text-[26px] font-[AppleBold]"
                            style={{backgroundColor : miniBg, color : wordColor, border : miniBorder}}
                        > 
                                {/* 작은 블럭 색, 글자색,           문구 */}
                            <span className="w-[45px] h-[36px]">{state}</span>
                        </div>

                        {/* 메인 블록의 내용 */}
                        <div 
                            className="main-block bg-[#FFFFFF] border-t-[0.5px]
                             border-t-[#999999] rounded-t-[30px] pt-[53px]"
                        >

                            <div className="h-[77px] w-[375px] flex flex-row">

                                <div className="w-[187px] flex flex-col items-center">
                                    <span className="h-[20px] font-[AppleMedium] text-[14px] text-[#999999]">
                                        지금까지 마신 카페인
                                    </span>
                                    <span className="h-[25px] font-[AppleMedium] text-[18px] text-[#222222] mt-[6px]">
                                        0 / 400mg
                                    </span>

                                </div>

                                <div className="h-[59px] border-[0.75px] border-[#999999]" />

                                <div className="w-[187px] flex flex-col items-center">
                                    <span className="h-[20px] font-[AppleMedium] text-[14px] text-[#999999]">
                                        마지막으로 마신지
                                    </span>
                                    <span className="h-[25px] font-[AppleMedium] text-[18px] text-[#222222] mt-[6px]">
                                        2일
                                    </span>
                                </div>

                            </div>

                            <div className="flex justify-center itme-center">
                                <button className="bg-[#A198F6] w-[189px] h-[44px] rounded-[30px]">
                                    <span className="font-[AppleSemiBold] text-[16px] 
                                        text-[#FFFFFF] flex justify-center "
                                    >
                                        기록하러 가기
                                        <img src={pen} alt="펜" className="ml-[8px]" />
                                    </span>
                                </button>

                            </div>

                            <div className="w-[375px] border-[0.75px] border-[#999999] mt-[18px]" />

                            {/* 여기서 [그래프 + 선 + 시간] 들어가기 */}
                            <div className="w-[375px] h-[73px] ">
                                
                            </div>

                            <div className="w-[375px] border-[0.75px] border-[#999999]" />

                            {/* 시간 들어가야됨 */}
                            <div className="w-[375px] h-[20px] ">


                            </div>

                            <div className="w-[375px] h-[28px] flex justify-center mt-[3px]">

                                <input 
                                    type="text" 
                                    placeholder="10분 뒤에 최고 집중 상태가 돼요"
                                    className="w-[159px] h-[28px] rounded-[26px] bg-[#FFFFFF] 
                                        border-[#E6E6E6] placeholder-[#5A5A5A] font-[AppleMedium]
                                        border-[1px] text-[10px] text-center "
                                    disabled    
                                />

                            </div>

                            <NavigationBar page={"home"} />


                        </div>
  
                        
                    </div>
                    
                </div>


            </section>

        </>
    );
};

export default State