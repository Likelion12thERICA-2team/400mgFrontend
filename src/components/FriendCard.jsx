import Profile from "../assets/Rectangle 50.png";

const FriendCard = ({ username, imageUrl, last_caffeine_intake, status }) => {
  let bgColor = "";
  let wordColor = "";
  if (status === "양호") {
    bgColor = "bg-[#FAA931]";
    wordColor = "text-[#FFFFFF]";
  } else if (status === "보통") {
    bgColor = "bg-[#F6F6F6]";
    wordColor = "text-[#222222]";
  } else if (status === "집중") {
    bgColor = "bg-[#FFAE9D]";
    wordColor = "text-[#FFFFFF]";
  } else if (status === "각성") {
    bgColor = "bg-[#FF5353]";
    wordColor = "text-[#FFFFFF]";
  } else if (status === "과잉") {
    bgColor = "bg-[#6543EF]";
    wordColor = "text-[#FFFFFF]";
  } else if (status === "한계") {
    bgColor = "bg-[#303030]";
    wordColor = "text-[#FFFFFF]";
  }

  const getTimeDifference = (postDate) => {
    const currentDate = new Date();
    const diffInMilliseconds = currentDate - new Date(postDate);
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    if (diffInHours > 24) {
      return `${Math.floor(diffInHours / 24)}일 전`;
    } else if (diffInHours > 0) {
      return `${diffInHours}시간 전`;
    } else {
      return `${Math.floor(diffInMilliseconds / (1000 * 60))}분 전`;
    }
  };

  const timeDifference = getTimeDifference(last_caffeine_intake);

  return (
    <div className="bg-white rounded-xl p-4 border-2 border-deselect flex flex-col items-center w-[158px] h-[207px] ml-[20px] mb-[20px]">
      <div className="relative mb-4">
        <img src={Profile} alt={username} className=" w-[73px] h-[75px]" />
      </div>
      <h3 className="font-bold text-[14px] mb-0.5">{username}</h3>
      <p className="text-[8px] text-subBlack mb-1">
        마지막 카페인 : {timeDifference}
      </p>
      <p className="text-[8px] text-exgray mb-1">{"현재 상태"}</p>

      <button
        className={`px-3 py-1.5 rounded-full text-sm font-bold w-auto ${bgColor} ${wordColor}`}
      >
        {status}
      </button>
    </div>
  );
};

export default FriendCard;
