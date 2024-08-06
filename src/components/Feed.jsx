import React, { useState, useEffect } from "react";
import NavigationBar from "./navigationBar";
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
};

// {
//         "id": 1,
//         "username": "exampleUser4",
//         "subject": "subject1",
//         "content": "content1",
//         "post_date": "2024-07-31T18:36:23.832749+09:00",
//         "image": null,
//         "reply_count": 3,
//         "scrap_count": 2,
//         "is_scraped": true
//     }

// const FriendList = () => {

//   return (
//     <div
//       className="overflow-y-auto flex flex-wrap flex-grow"
//       style={{ alignContent: "flex-start" }}
//     >
//       {friends.map((friend, index) => (
//         <FriendCard key={index} {...friend} />
//       ))}
//     </div>
//   );
// };

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

  return (
    <div className="h-[812px] w-[375px] bg-[#F6F6F6] flex flex-col">
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "게시글" ? (
        <div className="overflow-y-auto h-[calc(100%-112px)] flex-grow">
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
        className="p-[14px] border-2 rounded-full border-red bg-white border-solid w-[62px] h-[62px] absolute bottom-24 right-4"
        onClick={() => {
          if (activeTab === "게시글") {
            const content = prompt("내용");
            createPost({ subject: "subject", content: content });
          } else {
            const friend = prompt("친구 이름");
            followFriend(friend);
          }
        }}
      >
        {activeTab === "게시글" ? (
          <img src={pencil} width={34} height={34}></img>
        ) : (
          <img src={plus} width={34} height={34} alt="Add" />
        )}
      </button>

      <NavigationBar page={"cummunity"} className="mt-auto" />
    </div>
  );
};

export default Feed;
