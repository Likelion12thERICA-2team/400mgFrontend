import React, { useState, useEffect, useRef, useCallback } from "react";
import notification from "../assets/notifications.png";
import notificationWhite from "../assets/notificationsWhite.png";
import pen from "../assets/edit.png";
import error from "../assets/error.png";
import back from "../assets/arrow_back_ios.png";
import coffee from "../assets/coffee2.png";

import good from "../assets/motion_양호.gif";
import normal from "../assets/motion_보통.gif";
import focus from "../assets/motion_보통.gif"; //집중 없음
import arousal from "../assets/motion_각성.gif";
import excess from "../assets/motion_과잉.gif";
import limit from "../assets/motion_한계.gif";

import NavigationBar from "./navigationBar";

import Significant from "./significant";
import Button from "./Button";
import NewToggle from "./newToggle";
import Coffee from "./coffee";
import Energy from "./energy";
import Dessert from "./dessert";
import ButtonGroup from "./buttonGroup";
import CaffeineGraph from "./caffeineGraph";

import axios from "axios";
import moment from "moment";

import apiClient from "../apiClient";

const State = () => {
  const [num, setNum] = useState(0); // 상태
  const [username, setUsername] = useState(""); // 유저 이름
  const [miniBg, setMiniBg] = useState(""); // 작은 블럭 색
  const [state, setState] = useState(""); // 상태 문구
  const [wordColor, setWordColor] = useState(""); // 글자색
  const [bgColor, setBgColor] = useState(""); // 배경색
  const [topColor, setTopColor] = useState(""); // 맨위 문구 색
  const [miniBorder, setMiniBorder] = useState(""); // 작은 블럭 테두리 색
  const [isBoxVisible, setIsBoxVisible] = useState(false); // 경고 박스 아래에서 위로 올라오기
  const [isRecordVisible, setIsRecordVisible] = useState(false); // 경고 박스 아래에서 위로 올라오기
  const [isFirstTab, setIsFirstTab] = useState(true);
  const [isSecondTab, setIsSecondTab] = useState(false);
  const [isThirdTab, setIsThirdTab] = useState(false);

  const [openToggle, setOpenToggle] = useState(null); // 어떤 토글이 열려 있는지 추적하기 위한 상태
  const [selectedItems, setSelectedItems] = useState([]); //카페인 양
  const [caffeineType, setCaffeineType] = useState(""); //카페인 종류

  const [caffeineAmount, setCaffeineAmount] = useState(300); // 현재까지의 카페인 섭취량
  const [currCaffineAmount, setCurrCaffeineAmount] = useState(0); // 현재 카페인 흡수량
  const [lastIntakeTime, setLastIntakeTime] = useState(null); //카페인 마지막 섭취 시간
  const [caffeineData, setCaffeineData] = useState(Array(145).fill(0)); //체내 카페인 수치 계산된 배열
  const [inputAmount, setInputAmount] = useState(""); // 사용자 입력 카페인 양

  const inputRef = useRef(null);

  //   // 임의의 카페인 데이터 생성 (실제로는 백엔드에서 받아와야 함)
  //   const dummyCaffeineData = Array(145)
  //     .fill(0)
  //     .map(() => Math.random() * 400);

  const access_token = localStorage.getItem("access_token");

  const GetCaffeine = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://400mg.duckdns.org/caffeinintakes/",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        let sum = 0;
        let latestIntakeTime = null;

        // 가장 최근의 섭취 시간 찾기
        response.data.forEach((intake) => {
          const intakeTime = moment(intake.time);
          if (!latestIntakeTime || intakeTime.isAfter(latestIntakeTime)) {
            latestIntakeTime = intakeTime;
          }
        });

        // 24시간 이내의 섭취량만 합산
        response.data.forEach((intake) => {
          const intakeTime = moment(intake.time);
          if (latestIntakeTime.diff(intakeTime, "hours") <= 24) {
            sum += intake.amount;
          }
        });

        // for (let i = 0; i < response.data.length; i++) {
        //   sum += response.data[i].amount;
        // }

        setCaffeineAmount(sum);
      })
      .catch((error) => {
        console.log(error);
        // 에러 발생 시 기본값으로 설정
        setCaffeineAmount(0);
      });
  };

  const getLastCaffeineIntake = () => {
    const access_token = localStorage.getItem("access_token");
    let config = {
      method: "get",
      url: "https://400mg.duckdns.org/caffeinintakes/",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.length > 0) {
          // 가장 최근의 카페인 섭취 시간 찾기
          const latestIntake = response.data.reduce((latest, current) =>
            moment(current.time).isAfter(moment(latest.time)) ? current : latest
          );
          setLastIntakeTime(moment(latestIntake.time));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTimeDifference = () => {
    if (!lastIntakeTime) return "데이터 없음";

    const now = moment();
    const duration = moment.duration(now.diff(lastIntakeTime));
    const minutes = duration.asMinutes();

    if (minutes < 60) {
      return `${Math.floor(minutes)}분`;
    } else if (minutes < 24 * 60) {
      return `${Math.floor(duration.asHours())}시간`;
    } else if (minutes < 7 * 24 * 60) {
      return `${Math.floor(duration.asDays())}일`;
    } else {
      return `${Math.floor(duration.asWeeks())}주`;
    }
  };

  const getCaffeineData = () => {
    const access_token = localStorage.getItem("access_token");
    let config = {
      method: "get",
      url: "https://400mg.duckdns.org/caffeinintakes/predict/",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // API에서 받아온 데이터를 caffeineData 상태에 설정
        setCaffeineData(response.data);
        // 현재 카페인 섭취량 계산 (배열의 첫 번째 요소)
        // setCaffeineAmount(Math.round(response.data[0]));
      })
      .catch((error) => {
        console.log(error);
        // 에러 발생 시 기본값으로 설정
        setCaffeineData(Array(145).fill(0));
        // setCaffeineAmount(0);
      });
  };

  const handleInputChange = (e) => {
    setInputAmount(e.target.value);
  };

  const complete = () => {
    const amount = parseInt(inputAmount, 10);
    if (isNaN(amount)) {
      alert("올바른 숫자를 입력해주세요.");
      return;
    }

    const data = {
      time: new Date().toISOString(),
      amount: amount,
      caffeinType: "커피", // 기본값으로 "커피"를 설정했습니다. 필요에 따라 수정하세요.
    };

    console.log("전송할 데이터:", data); // 전송할 데이터 로깅

    axios
      .post("https://400mg.duckdns.org/caffeinintakes/", data, {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("카페인 섭취 기록 성공:", response.data);
        setInputAmount("");
        GetCaffeine(); // 새로운 데이터로 총 카페인 섭취량 업데이트
        getLastCaffeineIntake();
      })
      .catch((error) => {
        console.error(
          "카페인 섭취 기록 실패:",
          error.response ? error.response.data : error.message
        );
        alert(
          "카페인 섭취 기록에 실패했습니다. 자세한 내용은 콘솔을 확인해주세요."
        );
      });

    setIsRecordVisible(!isRecordVisible);
    setIsFirstTab(true);
    setIsSecondTab(false);
    setIsThirdTab(false);
  };

  useEffect(() => {
    getLastCaffeineIntake(); // 초기 데이터 로드
    const interval = setInterval(getLastCaffeineIntake, 60000); // 1분마다 호출

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
  }, []);

  //유저 이름 받아오기
  const fetchUser = async () => {
    const access_token = localStorage.getItem("access_token");
    try {
      const response = await apiClient.get("mypage/myinfo/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // useEffect를 사용하여 컴포넌트가 마운트될 때 한 번만 호출
  useEffect(() => {
    caffeine2state(caffeineAmount);
    GetCaffeine();
    getCaffeineData();
  }, [caffeineAmount]); // 빈 배열을 넣어 의존성 배열을 설정하여 처음 렌더링될 때만 호출

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

  const firstTab = () => {
    setIsFirstTab(!isFirstTab);
  };

  const secondTab = () => {
    setIsSecondTab(!isSecondTab);
  };

  const thirdTab = () => {
    setIsThirdTab(!isThirdTab);
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
        return <> 오랜만이에요 {username}님! </>; //양호
      case 2:
        return <> {username}님, 오늘도 화이팅이에요! </>; // 보통
      case 3:
        return <> {username}님, 잠은 좀 깨셨나요? </>; // 집중
      case 4:
        return <> 오랜만이에요 {username}님! </>; // 각성
      case 5:
        return <> 오랜만이에요 {username}님! </>; // 과잉
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

  // 토글 버튼 클릭 시 호출되는 함수
  const handleToggle = (index) => {
    // 클릭한 토글이 이미 열려 있으면 닫고, 그렇지 않으면 열기
    setOpenToggle(openToggle === index ? null : index);
    setCaffeineType(
      index === 1 ? "커피" : index === 2 ? "에너지드링크" : "기타"
    );
  };

  const handleItemSelect = (item) => {
    setSelectedItems((prevItems) => {
      const itemIndex = prevItems.findIndex((i) => i.name === item.name);
      if (itemIndex > -1) {
        return prevItems.filter((i) => i.name !== item.name);
      } else {
        return [...prevItems, item];
      }
    });
  };

  const tcomplete = () => {
    selectedItems.forEach((item) => {
      const data = {
        time: new Date().toISOString(),
        amount: item.caffeine,
        caffeinType: caffeineType,
      };

      axios
        .post("https://400mg.duckdns.org/caffeinintakes/", data, {
          headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("카페인 섭취 기록 성공:", response.data);
          GetCaffeine(); // 새로운 데이터로 총 카페인 섭취량 업데이트
          getLastCaffeineIntake();
        })
        .catch((error) => {
          console.error(
            "카페인 섭취 기록 실패:",
            error.response ? error.response.data : error.message
          );
          alert(
            "카페인 섭취 기록에 실패했습니다. 자세한 내용은 콘솔을 확인해주세요."
          );
        });
    });

    // 기록 후 상태 초기화
    setSelectedItems([]);
    setOpenToggle(0);
    setCaffeineType("");

    setIsRecordVisible(!isRecordVisible);
    setIsFirstTab(true);
    setIsSecondTab(false);
    setIsThirdTab(false);
  };

  return (
    <>
      <section className="flex justify-start">
        <div
          className="max-w-[375px] w-full h-screen mx-auto relative overflow-hidden"
          style={{ backgroundColor: bgColor }}
        >
          {/* h-[6.16vh] w-[89.33vw] max-w-[335px] mx-auto mt-[3.2vh] flex flex-col */}
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
                  <span className="h-[25px] font-[AppleMedium] text-[18px] mt-[6px]">
                    <span
                      className={`${
                        caffeineAmount >= 400
                          ? "text-[#FF3B30]"
                          : "text-[#222222]"
                      }`}
                    >
                      {caffeineAmount}
                    </span>
                    <span className="text-[#222222]"> / 400mg</span>
                  </span>
                </div>

                <div className="h-[59px] border-[0.75px] border-[#999999]" />

                <div className="w-[187px] flex flex-col items-center">
                  <span className="h-[20px] font-[AppleMedium] text-[14px] text-[#999999]">
                    마지막으로 마신지
                  </span>
                  <span className="h-[25px] font-[AppleMedium] text-[18px] text-[#222222] mt-[6px]">
                    {getTimeDifference()}
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

              <CaffeineGraph caffeineData={caffeineData} />

              {/* <div className="w-[375px] h-[73px] ">
                                
                            </div> */}

              {/* <div className="w-[375px] border-[0.75px] border-[#999999]" /> */}

              {/* 시간 들어가야됨 */}
              {/* <div className="w-[375px] h-[20px] ">


                            </div> */}

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
            <div className="pt-[35px] flex flex-col justify-center items-center ">
              <img src={error} alt="경고 표시" className="w-[55px] h-[55px]" />
              <div className="text-[20px] font-[AppleBold] text-[#222222] mt-[19px] flex flex-col justify-center items-center">
                <div> 오늘의 카페인 할당량을 </div>
                <div>
                  {/* <span className="text-[#FF3B30]">900mg</span> 이나 초과했어요. */}
                  <span className="text-[#FF3B30]">{caffeineAmount - 400}</span>
                  <span className="text-[#FF3B30]">mg</span> 이나 초과했어요.
                </div>
              </div>
              <div className="font-AppleRegular text-[#222222] text-[16px] mt-[12px]">
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
                            transition-transform duration-300 ease-in-out z-80
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
            ) : isSecondTab ? (
              <>
                <div className=" flex flex-row justify-start items-center w-[375px] h-[25px] mt-[21px] ">
                  <button
                    onClick={() => {
                      firstTab();
                      secondTab();
                    }}
                  >
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
            ) : isThirdTab ? (
              <>
                <div className=" flex flex-row justify-start items-center w-[375px] h-[25px] mt-[21px] ">
                  <button
                    onClick={() => {
                      secondTab();
                      thirdTab();
                    }}
                  >
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
            ) : (
              <>
                <div className=" flex flex-row justify-start items-center w-[375px] h-[25px] mt-[21px] ">
                  <button
                    onClick={() => {
                      secondTab();
                    }}
                  >
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
            {isFirstTab ? (
              <>
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

                <ButtonGroup />
                <div className="w-[375px] h-[18px] flex flex-row gap-[53px] mt-[22px] justify-center ml-[4px]">
                  <span className="font-AppleMedium text-[12px] text-[#999999]">
                    최악
                  </span>
                  <span className="font-AppleMedium text-[12px] text-[#999999]">
                    별로
                  </span>
                  <span className="font-AppleMedium text-[12px] text-[#999999]">
                    보통
                  </span>
                  <span className="font-AppleMedium text-[12px] text-[#999999]">
                    양호
                  </span>
                  <span className="font-AppleMedium text-[12px] text-[#999999]">
                    최상
                  </span>
                </div>

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
                    onClick={() => {
                      firstTab();
                      secondTab();
                    }}
                  />
                </div>
              </>
            ) : isSecondTab ? (
              <>
                <div className="w-[375px] h-[108px] flex flex-row justify-start mt-[10px]">
                  <span className="text-[26px] font-AppleSemiBold text-[#000000] ml-[20px]">
                    오늘 마신 커피나 드링크같은 <br />
                    각성제의 카페인 함유량을 <br />
                    알고있나요?
                  </span>
                </div>

                <div className="">
                  <img src={coffee} alt="커피" className="" />
                </div>

                <div className="mt-[31px] flex justify-center">
                  <Button
                    backgroundColor={"#8478F7"}
                    color={"white"}
                    content={"예"}
                    fontStyle={"AppleSemiBold"}
                    onClick={() => {
                      secondTab();
                      thirdTab();
                    }}
                  />
                </div>
                <div className="mt-[12px] flex justify-center">
                  <Button
                    backgroundColor={"#EBEBEB"}
                    color={"black"}
                    content={"아니오"}
                    fontStyle={"AppleRegular"}
                    onClick={() => {
                      secondTab();
                    }}
                  />
                </div>
              </>
            ) : isThirdTab ? (
              <>
                <div className="w-[375px] h-[36px] flex flex-row justify-start mt-[10px]">
                  <span className="text-[26px] font-AppleSemiBold text-[#000000] ml-[20px]">
                    함유량을 적어주세요.
                  </span>
                </div>
                <div className="w-[375px] h-[24px] flex flex-row justify-start mt-[83px] ml-[23px]">
                  <input
                    type="text"
                    placeholder="카페인"
                    value={inputAmount}
                    onChange={handleInputChange}
                    className="w-[106px] h-[24px] font-AppleMedium text-right border-b border-[#999999] text-[16px]"
                  />
                  <input
                    type="text"
                    placeholder="mg"
                    className="w-[34px] h-[24px] font-AppleMedium text-right border-b border-[#999999]
                                                bg-[#FFFF] placeholder-black text-[16px]"
                    disabled
                  />
                </div>

                <div className="mt-[447px] flex justify-center">
                  <Button
                    backgroundColor={"#8478F7"}
                    color={"white"}
                    content={"완료"}
                    fontStyle={"AppleRegular"}
                    onClick={complete}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="w-[375px] h-[36px] flex flex-row justify-start mt-[10px]">
                  <span className="text-[26px] font-AppleSemiBold text-[#000000] ml-[20px]">
                    각성제의 종류를 골라주세요.
                  </span>
                </div>

                <div className="w-[375px] my-[1%] border-[1px] border-[#999999] mb-[0%] mt-[23px]" />

                <NewToggle
                  content="커피"
                  choice={<Coffee onSelect={handleItemSelect} />}
                  isOpen={openToggle === 1}
                  onToggle={() => handleToggle(1)}
                />
                <NewToggle
                  content="에너지드링크"
                  choice={<Energy onSelect={handleItemSelect} />}
                  isOpen={openToggle === 2}
                  onToggle={() => handleToggle(2)}
                />
                <NewToggle
                  content="기타"
                  choice={<Dessert onSelect={handleItemSelect} />}
                  isOpen={openToggle === 3}
                  onToggle={() => handleToggle(3)}
                />

                <div className="flex justify-center">
                  <div className={openToggle ? "mt-[163px]" : "mt-[354px]"}>
                    <Button
                      backgroundColor={"#8478F7"}
                      color={"white"}
                      content={"완료"}
                      fontStyle={"AppleRegular"}
                      onClick={tcomplete}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default State;
