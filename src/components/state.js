import React, { useState, useEffect, useRef, useCallback } from "react";
import notification from "../assets/notifications.png";
import notificationWhite from "../assets/notificationsWhite.png";
import pen from "../assets/edit.png";
import error from "../assets/error.png";
import back from "../assets/arrow_back_ios.png";

import good from "../assets/motion_양호.gif";
import normal from "../assets/motion_보통.gif";
import focus from "../assets/motion_보통.gif"; //집중 없음
import arousal from "../assets/motion_각성.gif";
import excess from "../assets/motion_과잉.gif";
import limit from "../assets/motion_한계.gif";

import NavigationBar from "./navigationBar";

import Significant from "./significant";
import Button from "./Button";

import axios from "axios";

const State = () => {
  const [num, setNum] = useState(0); // 상태
  const [miniBg, setMiniBg] = useState(""); // 작은 블럭 색
  const [state, setState] = useState(""); // 상태 문구
  const [wordColor, setWordColor] = useState(""); // 글자색
  const [bgColor, setBgColor] = useState(""); // 배경색
  const [topColor, setTopColor] = useState(""); // 맨위 문구 색
  const [miniBorder, setMiniBorder] = useState(""); // 작은 블럭 테두리 색
  const [isBoxVisible, setIsBoxVisible] = useState(false); // 경고 박스 아래에서 위로 올라오기
  const [isRecordVisible, setIsRecordVisible] = useState(false); // 경고 박스 아래에서 위로 올라오기
  const [isFirstTab, setIsFirstTab] = useState(true);
  const [currCaffeine, setCurrCaffeine] = useState(0);

  const inputRef = useRef(null);

  //임의의 카페인 섭취량
  const caffeineAmount = 400;

  // useEffect를 사용하여 컴포넌트가 마운트될 때 한 번만 호출
  useEffect(() => {
    caffeine2state(caffeineAmount);
  }, []); // 빈 배열을 넣어 의존성 배열을 설정하여 처음 렌더링될 때만 호출

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyNTA0NTU2LCJpYXQiOjE3MjI1MDMzMTEsImp0aSI6ImU2YTdiZWE3MTAzZTRmM2Y5NDU5NzI0MTE1NmQ0MzQ5IiwidXNlcl9pZCI6N30.HyafhvXmImo2EHs-kUP26t_El-etClL8dVcjY4j5WCk";
  const GetCaffeine = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/caffeinintakes/",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        let sum = 0;

        for (let i = 0; i < response.data.length; i++) {
          sum += response.data[i].amount;
        }
        setCurrCaffeine(sum);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetCaffeine();
  }, []);

  const toggleBox = () => {
    if (caffeineAmount >= 400) {
      setIsBoxVisible(!isBoxVisible);
    } else {
      setIsRecordVisible(!isRecordVisible);
    }
  };

  const noBox = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const yesBox = () => {
    setIsBoxVisible(!isBoxVisible);
    setIsRecordVisible(!isRecordVisible);
  };

  // 그래프 밑 문구 감싸는 테두리 크기 변경 함수
  const adjustWidth = useCallback(() => {
    const input = inputRef.current;
    if (input) {
      // 임시 요소를 생성하여 텍스트 너비 측정
      const tmp = document.createElement("div");
      tmp.style.font = window.getComputedStyle(input).font;
      tmp.style.visibility = "hidden";
      tmp.style.position = "absolute";
      tmp.style.whiteSpace = "nowrap";
      tmp.innerHTML = input.innerHTML;
      document.body.appendChild(tmp);

      // 텍스트 너비 + 좌우 패딩(34px) + 약간의 여유 공간
      const width = tmp.getBoundingClientRect().width + 34 + 10;
      input.style.width = `${width}px`;

      document.body.removeChild(tmp);
    }
  }, []);

  // 그래프 밑 문구 감싸는 테두리 크기 동적으로 변경
  useEffect(() => {
    adjustWidth();
    window.addEventListener("resize", adjustWidth);

    return () => {
      window.removeEventListener("resize", adjustWidth);
    };
  }, [num, adjustWidth]); // num이 변경될 때마다 실행

  // 카페인 섭취량에 따라 상태 변환
  const caffeine2state = useCallback((mg) => {
    if (mg < 0) {
      setMiniBg("#FAA931");
      setState("양호");
      setWordColor("#FFFFFF");
      setBgColor("#FAA931"); //yellow
      setNum(1); //양호
      setTopColor("#222222");
      setMiniBorder("5px solid #EFEFEF");
    } else if (mg >= 0 && mg < 50) {
      setMiniBg("#FFFFFF");
      setState("보통");
      setWordColor("#222222");
      setBgColor("#F6F6F6"); //white
      setNum(2); //보통
      setTopColor("#222222");
      setMiniBorder("5px solid #D2D2D2");
    } else if (mg >= 50 && mg < 150) {
      setMiniBg("#FF8C7C");
      setState("집중");
      setWordColor("#FFFFFF");
      setBgColor("#FFAE9D"); //pink
      setNum(3); //집중
      setTopColor("#222222");
      setMiniBorder("5px solid #EFEFEF");
    } else if (mg >= 150 && mg < 250) {
      setMiniBg("#FF5353");
      setState("각성");
      setWordColor("#FFFFFF");
      setBgColor("#FF5353"); //red
      setNum(4); //각성
      setTopColor("#FFFFFF");
      setMiniBorder("5px solid #EFEFEF");
    } else if (mg >= 250 && mg < 400) {
      setMiniBg("#6543EF");
      setState("과잉");
      setWordColor("#FFFFFF");
      setBgColor("#6543EF"); //blue
      setNum(5); //과잉
      setTopColor("#FFFFFF");
      setMiniBorder("5px solid #EFEFEF");
    } else {
      setMiniBg("#35323D");
      setState("한계");
      setWordColor("#FFFFFF");
      setBgColor("#303030"); //black
      setNum(6); //한계
      setTopColor("#FFFFFF");
      setMiniBorder("5px solid #D2D2D2");
    }
  }, []);

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

  // 상태에 따라 알림 이미지 black/white 선택
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

  // 상태에 따라 윗줄 문구 선택
  const getHello1 = () => {
    switch (num) {
      case 1:
        return <> 오랜만이에요 커피중독님! </>; //양호
      case 2:
        return <> 커피중독님, 오늘도 화이팅이에요! </>; // 보통
      case 3:
        return <> 커피중독님, 잠은 좀 깨셨나요? </>; // 집중
      case 4:
        return <> 오랜만이에요 커피중독님! </>; // 각성
      case 5:
        return <> 오랜만이에요 커피중독님! </>; // 과잉
      case 6:
        return <> 더이상 카페인은 힘들어요. </>; // 한계
      default:
        return notification; // 기본값
    }
  };

  // 상태에 따라 아랫줄 문구 선택
  const getHello2 = () => {
    switch (num) {
      case 1:
        return <> 잘 지내셨나요? </>; //양호
      case 2:
        return <> </>; // 보통
      case 3:
        return <> </>; // 집중
      case 4:
        return <> 잘 지내셨나요? </>; // 각성
      case 5:
        return <> 잘 지내셨나요? </>; // 과잉
      case 6:
        return <> 휴식을 취해주세요. </>; // 한계
      default:
        return notification; // 기본값
    }
  };

  // 상태에 따라 그래프 밑 문구 선택
  const getBottom = () => {
    switch (num) {
      case 1:
        return <> 최고의 컨디션이에요! </>; //양호
      case 2:
        return <> 1시간 뒤에 섭취하면 딱 좋아요 </>; // 보통
      case 3:
        return <> 10분 뒤에 최고 집중 상태가 돼요 </>; // 집중
      case 4:
        return <> 제일 집중된 상태에요. </>; // 각성
      case 5:
        return <> 제일 집중된 상태에요. </>; // 과잉
      case 6:
        return (
          <>
            {" "}
            권장량보다 많이 섭취했어요.{" "}
            <span className="text-[#FF3B30]">하루 정도</span> 안정을 취해주세요{" "}
          </>
        ); // 한계
      default:
        return <> 최고의 컨디션이에요! </>; // 기본값
    }
  };

  return (
    <>
      <section className="flex justify-start">
        <div
          className="h-[812px] w-[375px] relative overflow-hidden"
          style={{ backgroundColor: bgColor }}
        >
          <div className="h-[50px] w-[335px] ml-[20px] mr-[20px] mt-[26px] flex flex-col">
            <div className="h-[25px] w-[335px] flex justify-between">
              <span
                className="text-[18px] font-[AppleSemiBold] "
                style={{ color: topColor }}
              >
                {/* 커피중독님, 오늘도 화이팅이에요! */}
                {getHello1()}
              </span>

              <span className="">
                <img src={getNotiSrc()} alt="알림" />
              </span>
            </div>

            <div className="h-[25px] w-[335px] flex justify-start">
              <span
                className="text-[18px] font-[AppleSemiBold] "
                style={{ color: topColor }}
              >
                {/* 커피중독님, 오늘도 화이팅이에요! */}
                {getHello2()}
              </span>
            </div>
          </div>

          <div className="mt-[24px] flex justify-center">
            {/* gif */}
            <img
              src={getImageSrc()}
              alt="보통 표정"
              className="w-[270px] h-[270px]"
            />
          </div>

          {/*  이모지 밑 상태창 */}
          <div className="relative w-[375px] h-[396px] bg-[#FFFFFF] rounded-t-[30px] mt-[46px]">
            {/* 상단에 걸쳐있는 작은 블록 */}
            <div
              className="small-block w-[101px] h-[56px] absolute top-0 left-1/2 transform
                                -translate-x-1/2 -translate-y-1/2 rounded-[30px]
                                flex items-center justify-center
                                bg-[#FFFFFF] text-black text-[26px] font-[AppleBold]"
              style={{
                backgroundColor: miniBg,
                color: wordColor,
                border: miniBorder,
              }}
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
                    {currCaffeine} / 400mg
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
                <button
                  className="bg-[#A198F6] w-[189px] h-[44px] rounded-[30px]"
                  onClick={toggleBox}
                >
                  <span
                    className="font-[AppleSemiBold] text-[16px] 
                                        text-[#FFFFFF] flex justify-center "
                  >
                    기록하러 가기
                    <img src={pen} alt="펜" className="ml-[8px]" />
                  </span>
                </button>
              </div>

              <div className="w-[375px] border-[0.75px] border-[#999999] mt-[18px]" />

              {/* 여기서 [그래프 + 선 + 시간] 들어가기 */}
              <div className="w-[375px] h-[73px] "></div>

              <div className="w-[375px] border-[0.75px] border-[#999999]" />

              {/* 시간 들어가야됨 */}
              <div className="w-[375px] h-[20px] "></div>

              <div className="w-[375px] h-[28px] flex justify-center mt-[3px]">
                <div
                  ref={inputRef}
                  className="h-[28px] rounded-[26px] bg-[#FFFFFF] 
                                        border-[#E6E6E6] text-[#5A5A5A] font-[AppleMedium]
                                        border-[1px] text-[10px] text-center px-[17px]
                                        flex items-center justify-center whitespace-nowrap"
                >
                  {getBottom()}
                </div>
              </div>

              <NavigationBar page={"home"} />
            </div>
          </div>

          {/* 오버레이 */}
          <div
            className={`absolute inset-0  bg-black
                            transition-opacity duration-300 
                            ${
                              isBoxVisible
                                ? "opacity-50"
                                : "opacity-0 pointer-events-none"
                            }
                            ${
                              isRecordVisible
                                ? "opacity-50"
                                : "opacity-0 pointer-events-none"
                            }`}
          ></div>

          {/* 경고 슬라이딩 박스 */}
          <div
            className={`absolute left-0 right-0 bg-[#FFFFFF] rounded-t-[30px]
                            transition-transform duration-300 ease-in-out
                            ${isBoxVisible ? "bottom-0" : "translate-y-full"}`}
            style={{ height: "323px" }}
          >
            <div className="pt-[35px] flex flex-col justify-center items-center">
              <img src={error} alt="경고 표시" className="w-[55px] h-[55px]" />
              <div className="text-[20px] font-[AppleBold] text-[#222222] mt-[19px] flex flex-col justify-center items-center">
                <div> 오늘의 카페인 할당량을 </div>
                <div>
                  <span className="text-[#FF3B30]">900mg</span> 이나 초과했어요.
                </div>
              </div>
              <div className="font-[AppleReBold] text-[#222222] text-[16px] mt-[12px]">
                계속 기록하시겠어요?
              </div>
              <div className="flex flex-row gap-[8px] text-[16px] mt-[46px]">
                <button
                  className="text-[#222222] font-[AppleBold] bg-[#EBEBEB] 
                                        rounded-[20px] w-[155px] h-[54px]"
                  onClick={yesBox}
                >
                  예
                </button>

                <button
                  className="text-[#FFFFFF] font-[AppleBold] bg-[#8478F7] 
                                        rounded-[20px] w-[155px] h-[54px]"
                  onClick={noBox}
                >
                  아니오
                </button>
              </div>
            </div>
          </div>

          {/* 기록 슬라이딩 박스 */}
          <div
            className={`absolute left-0 right-0 bg-[#FFFFFF] rounded-t-[30px]
                            transition-transform duration-300 ease-in-out
                            ${
                              isRecordVisible ? "bottom-0" : "translate-y-full"
                            }`}
            style={{ height: "742px" }}
          >
            {/* 뒤로가기+기록 */}
            {isFirstTab ? (
              <>
                <div className=" flex flex-row justify-center w-[375px] h-[25px] mt-[21px]">
                  <div className=" font-AppleMedium text-[#000000] text-[18px]">
                    기록
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className=" flex flex-row justify-start items-center w-[375px] h-[25px] mt-[21px] ">
                  <button>
                    <img
                      src={back}
                      alt="뒤로가기"
                      className="w-[20px] h-[20px] ml-[23px]"
                    />
                  </button>

                  <div className="font-AppleMedium text-[#000000] text-[18px] ml-[129px]">
                    기록
                  </div>
                </div>
              </>
            )}

            <div className="w-[375px] h-[72px] flex flex-row justify-start mt-[10px]">
              <span className="text-[26px] font-AppleSemiBold text-[#000000] ml-[20px]">
                카페인을 기록하기 전에 오늘의 <br />
                상태를 알려주세요.
              </span>
            </div>

            <div className="w-[375px] h-[21px] flex flex-row justify-start mt-[40px]">
              <span className="text-[14px] font-AppleReBold text-[#5A5A5A] ml-[21px]">
                {" "}
                나의 컨디션{" "}
              </span>
            </div>

            {/* 컨디션 체크 버튼 여기서 */}
            <div className="w-[375px] h-[60px] flex flex-row justify-center mt-[17px] bg-black"></div>

            <div className="w-[375px] h-[21px] flex flex-row justify-start mt-[40px]">
              <span className="text-[14px] font-AppleReBold text-[#5A5A5A] ml-[21px]">
                {" "}
                수면시간{" "}
              </span>
            </div>

            <div className="w-[375px] h-[44px] flex flex-row justify-start items-center mt-[10px]">
              <input
                type="text"
                placeholder="시간"
                className="ml-[21px] w-[71px] h-[44px] bg-[#EBEBEB] rounded-[10px] 
                                    text-[#999999] text-[16px] font-AppleMedium text-center"
              />
              <span className="w-[28px] h-[24px] ml-[5px] text-[16px] font-AppleMedium text-[#5A5A5A]">
                시간
              </span>
            </div>

            <div className="w-[375px] h-[21px] flex flex-row justify-start mt-[40px]">
              <span className="text-[14px] font-AppleReBold text-[#5A5A5A] ml-[21px]">
                {" "}
                특이사항{" "}
              </span>
            </div>
            <div className="ml-[21px]">
              <Significant />
            </div>

            <div className="mt-[46px] flex justify-center">
              <Button
                backgroundColor={"#8478F7"}
                color={"white"}
                content={"계속하기"}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default State;
