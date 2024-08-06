import React, { useEffect, useState } from "react";

import profile from "../assets/profile.png";
import article from "../assets/article.png";
import bookmark from "../assets/bookmark.png";
import arrow_right_black from "../assets/arrow_right_black.png";

import NavigationBar from "./navigationBar";
import apiClient from "../apiClient";

const Mypage = () => {
  const [userProfile, setUserProfile] = useState({
    username: "",
    joined_date: "",
  });
  const [howmuch, setHowmuch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const access_token = localStorage.getItem("access_token");

      try {
        const response = await apiClient.get("mypage/myinfo/", {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        });
        const data = response.data;
        setUserProfile({
          username: data.username,
          joined_date: data.joined_date,
        });
        calculateDay(data.joined_date);
      } catch (error) {
        console.error(error);
      }
    };

    const calculateDay = (joinedDate) => {
      const today = new Date();
      const startDate = new Date(joinedDate);
      const timeDifference = today.getTime() - startDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)) + 1;
      setHowmuch(daysDifference);
    };

    fetchData();
  }, []);

  return (
    <section className="h-[100vh] w-[100vw] pt-[3.38vh] pb-[4.19vh] flex flex-col bg-[#f6f6f6] relative">
      <div className="text-[18px] font-AppleMedium items-start px-[5.33vw] pb-[14.38vh]">
        마이페이지
        <div className="flex pt-[3.69vh]">
          <img src={profile} className="w-[74px] h-[74px]"></img>
          <div className="items-start justify-center flex flex-col pl-[6.93vw] gap-[1.07vh]">
            <div className="text-[18px] font-[AppleBold]">
              {userProfile.username}
            </div>
            <div className="text-[16px] text-[gray] font-[AppleMedium]">
              카페인 관리를 시작한지{" "}
              <span className="text-purple">{howmuch}일</span> 째
            </div>
          </div>
        </div>
        <div className="mt-[5.63vh] flex justify-center items-center">
          <div className="flex flex-col items-center">
            <img src={article} className="w-[40px] h-[40px]"></img>
            <div className="text-[14px] font-AppleMedium">내가 쓴 글</div>
          </div>
          <div className="border-l border-gray h-[9.6vh] mx-[14.67vw]"></div>
          <div className="flex flex-col items-center">
            <img src={bookmark} className="w-[40px] h-[40px]"></img>
            <div className="text-[14px] font-AppleMedium">스크랩</div>
          </div>
        </div>
        <div className="absolute left-0 right-0 w-full border-b-[0.74vh] border-lightGray pt-[4.13vh]"></div>
        <div className="flex flex-col mt-[4.67vh]">
          <div>
            <div className="flex justify-between py-[2.53vh]">
              <div className="text-[16px] font-AppleSemiBold">내 정보 수정</div>
              <img src={arrow_right_black} className="w-[20px] h-full"></img>
            </div>
            <div className="w-full border-b-[0.13vh] border-gray"></div>
          </div>
          <div>
            <div className="flex justify-between py-[2.53vh]">
              <div className="text-[16px] font-AppleSemiBold">공지사항</div>
              <img src={arrow_right_black} className="w-[20px] h-full"></img>
            </div>
            <div className="w-full border-b-[0.13vh] border-gray"></div>
          </div>
          <div>
            <div className="flex justify-between py-[2.53vh]">
              <div className="text-[16px] font-AppleSemiBold">자주 묻는 질문</div>
              <img src={arrow_right_black} className="w-[20px] h-full"></img>
            </div>
            <div className="w-full border-b-[0.13vh] border-gray"></div>
          </div>
          <div>
            <div className="flex justify-between py-[2.53vh]">
              <div className="text-[16px] font-AppleSemiBold">1:1 문의</div>
              <img src={arrow_right_black} className="w-[20px] h-full"></img>
            </div>
            <div className="w-full border-b-[0.13vh] border-gray"></div>
          </div>
          <div>
            <div className="flex justify-between py-[2.53vh]">
              <div className="text-[16px] font-AppleSemiBold">계정 연동</div>
              <img src={arrow_right_black} className="w-[20px] h-full"></img>
            </div>
            <div className="w-full border-b-[0.13vh] border-gray"></div>
          </div>
        </div>
      </div>
      <NavigationBar page={"mypage"} className="absolute" />
    </section>
  );
};

export default Mypage;
