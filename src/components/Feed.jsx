import React, { useState, useEffect } from "react";
import NavigationBar from "./navigationBar";
import Bell from "../assets/notifications.svg";
import Chat from "../assets/chat_bubble.svg";
import thumb_up from "../assets/thumb_up.svg";
import Profile from "../assets/Rectangle 50.png";
import TestImage from "../assets/TestImage.png";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-between items-center ml-[15px] my-[16px]">
      <div className="flex space-x-4">
        <button
          className={`text-lg font-bold ${
            activeTab === "게시글"
              ? "text-black border-b-2 border-black"
              : "text-exgray"
          }`}
          onClick={() => setActiveTab("게시글")}
        >
          게시글
        </button>
        <button
          className={`text-lg font-bold ${
            activeTab === "친구"
              ? "text-black border-b-2 border-black"
              : "text-exgray"
          }`}
          onClick={() => setActiveTab("친구")}
        >
          친구
        </button>
      </div>
      <img src={Bell} className="ml-auto mr-[20px]"></img>
    </div>
  );
};

const Post = ({ author, content, time, likes, comments, img }) => {
  return (
    <div className="max-w-xl mx-auto bg-white border-b-4 border-deselect">
      <div className="p-4">
        <div className="flex items-center">
          <img className="h-10 w-10 rounded-12" src={Profile} alt="Profile" />
          <div className="ml-3">
            <p className="text-sm font-medium text-black">{author}</p>
            <p className="text-xs text-exgray">{time}</p>
          </div>
        </div>
        <div className="ml-[50px]">
          <p className="mt-2 text-gray-600">{content}</p>
          {img && (
            <div className="mt-4 rounded-18">
              <img src={img} alt="Post Image" />
            </div>
          )}
          <div className="mt-4 flex items-center text-gray-500 text-sm">
            <button className="flex items-center mr-4">
              <img src={thumb_up} className="w-4 h-4 mr-1" />
              {likes}
            </button>
            <button className="flex items-center">
              <img src={Chat} className="w-4 h-4 mr-1" />
              {comments}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FriendCard = ({ name, imageUrl, lastActive, status }) => {
  var buttonColor = "orange";
  var buttonText = "한계";
  return (
    <div className="bg-white rounded-xl p-4 border-2 border-deselect flex flex-col items-center w-[158px] h-[207px] ml-[20px] mb-[20px]">
      <div className="relative mb-4">
        <img src={imageUrl} alt={name} className=" w-[73px] h-[75px]" />
      </div>
      <h3 className="font-bold text-[14px] mb-0.5">{name}</h3>
      <p className="text-[8px] text-subBlack mb-1">
        마지막 카페인 : {"ㅁㅁ"} 전
      </p>
      <p className="text-[8px] text-exgray mb-1">{"현재상태"}</p>

      <button
        className={`px-3 py-1.5 rounded-full text-sm font-bold w-auto ${
          buttonColor === "orange"
            ? "bg-[#35323D] text-white"
            : buttonColor === "red"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

const FriendList = () => {
  const friends = [
    {
      name: "별다방프로출석러",
      imageUrl: Profile,
      lastActive: "1시간 전에 활동",
      status: "친계",
    },
    {
      name: "하울의음쥑이는성",
      imageUrl: Profile,
      lastActive: "4시간 전에 활동",
      status: "양호",
    },
    {
      name: "안졸리나",
      imageUrl: Profile,
      lastActive: "1일 전에 활동",
      status: "친추",
    },
  ];

  return (
    <div
      className="overflow-y-auto flex flex-wrap flex-grow"
      style={{ alignContent: "flex-start" }}
    >
      {friends.map((friend, index) => (
        <FriendCard key={index} {...friend} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [activeTab, setActiveTab] = useState("게시글");
  const posts = [
    {
      author: "필터피로솔직이",
      content: "오늘 맨날 새벽 5시에 잠에 드는데 자..도저히 버겨워서요...",
      time: "14시간",
      likes: 0,
      comments: 0,
    },
    {
      author: "하울의옥정이는멍",
      content:
        "2주동안 휴가가 카페인 1도 안먹고 돌아왔더니 처음으로 양호가 땡겼네요 ㅋㅋ",
      time: "2시간",
      likes: 5,
      comments: 2,
      img: TestImage,
    },
    {
      author: "왕굴리",
      content: "시험기간이라 3월 동안 5시간 잤어요...",
      time: "3시간전",
      likes: 0,
      comments: 0,
    },
    {
      author: "필터피로솔직이",
      content: "오늘 맨날 새벽 5시에 잠에 드는데 자..도저히 버겨워서요...",
      time: "14시간",
      likes: 0,
      comments: 0,
    },
    {
      author: "하울의옥정이는멍",
      content:
        "2주동안 휴가가 카페인 1도 안먹고 돌아왔더니 처음으로 양호가 땡겼네요 ㅋㅋ",
      time: "2시간",
      likes: 5,
      comments: 2,
      img: TestImage,
    },
  ];

  return (
    <div className="h-[812px] w-[375px] bg-[#F6F6F6] flex flex-col">
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "게시글" ? (
        <div className="overflow-y-auto h-[calc(100%-112px)] flex-grow">
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      ) : (
        <FriendList />
      )}

      <NavigationBar page={"cummunity"} className="mt-auto" />
    </div>
  );
};

export default Feed;
