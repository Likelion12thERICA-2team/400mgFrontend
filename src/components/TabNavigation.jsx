import Bell from "../assets/notifications.svg";

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

export default TabNavigation;
