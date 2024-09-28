import React, { useState, useEffect } from "react";
import NavigationBar from "./navigationBar3";
import Bell from "../assets/notifications.svg";
import Chat from "../assets/chat_bubble.svg";
import thumb_up from "../assets/thumb_up.svg";
import thumb_up_pressed from "../assets/thumb_up_pressed.svg";
import Profile from "../assets/Rectangle 50.png";
import TestImage from "../assets/TestImage.png";
import apiClient from "../apiClient";
import pencil from "../assets/pencil.svg";
import plus from "../assets/plus.svg";

import FriendCard from "./FriendCard";
import Post from "./Post";
import TabNavigation from "./TabNavigation";
import BottomSheet from "./postBottomSheet";

const Feed = () => {
  const [activeTab, setActiveTab] = useState("게시글");
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([
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
  ]);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const fetchPosts = async () => {
    const access_token = localStorage.getItem("access_token");

    try {
      const response = await apiClient.get("posts/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(response);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const scrap_post = async (post_id) => {
    const access_token = localStorage.getItem("access_token");

    try {
      const response = await apiClient.post(
        `posts/${post_id}/scraps/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    fetchPosts();
  };

  const fetchFriends = async () => {
    const access_token = localStorage.getItem("access_token");

    try {
      const response = await apiClient.get("friend/following/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(response);
      setFriends(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async ({ subject, content }) => {
    const access_token = localStorage.getItem("access_token");

    try {
      const response = await apiClient.post(
        "posts/",
        {
          subject: subject,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    fetchPosts();
  };

  const followFriend = async (friend) => {
    const access_token = localStorage.getItem("access_token");

    try {
      const response = await apiClient.post(
        `friend/${friend}/follow/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    fetchFriends();
  };

  useEffect(() => {
    fetchPosts();
    fetchFriends();
  }, [activeTab]);

  const renderContentComponent = ({ input, setInput }) => {
    if (activeTab === "게시글") {
      return (
        <textarea
          className="w-full p-2 border text-[14px] font-AppleRegular rounded mt-4"
          rows="4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="내용을 입력하세요..."
        ></textarea>
      );
    } else {
      return (
        <input
          type="text"
          className="w-full p-2 text-[14px] font-AppleRegular border rounded mt-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="친구 이름을 입력하세요..."
        />
      );
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-[#F6F6F6] flex flex-col">
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "게시글" ? (
        <div className="overflow-y-auto h-[calc(100vh-13.79vh)] flex-grow">
          {posts.map((post, index) => (
            <Post key={index} {...post} handle_scrap={scrap_post} />
          ))}
        </div>
      ) : (
        <div
          className="overflow-y-auto flex flex-wrap flex-grow"
          style={{ alignContent: "flex-start" }}
        >
          {friends.map((friend, index) => (
            <FriendCard key={index} {...friend} />
          ))}
        </div>
      )}
      <button
        className="p-[1.73vh] border-2 rounded-full border-purple bg-white border-solid w-[16.53vw] h-[16.53vw] absolute bottom-24 right-4"
        onClick={() => {
          setBottomSheetVisible(true);
        }}
      >
        {activeTab === "게시글" ? (
          <img src={pencil} width={34} height={34}></img>
        ) : (
          <img src={plus} width={34} height={34} alt="Add" />
        )}
      </button>

      <BottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onSubmit={(input) => {
          if (activeTab === "게시글") {
            createPost({ subject: "subject", content: input });
          } else {
            followFriend(input);
          }
          setBottomSheetVisible(false);
        }}
        title={activeTab === "게시글" ? "글 작성하기" : "친구 추가"}
        contentComponent={renderContentComponent}
      />

      <NavigationBar page={"cummunity"} className="mt-[20vh]" />
    </div>
  );
};

export default Feed;
