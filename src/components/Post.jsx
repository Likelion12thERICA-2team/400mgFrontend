import Profile from "../assets/Rectangle 50.png";
import Chat from "../assets/chat_bubble.svg";
import thumb_up from "../assets/thumb_up.svg";
import thumb_up_pressed from "../assets/thumb_up_pressed.svg";

const Post = ({
  id,
  username,
  subject,
  content,
  post_date,
  image,
  scrap_count,
  reply_count,
  is_scraped,
  handle_scrap,
}) => {
  const time = new Date(post_date).toLocaleString();
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

  const timeDifference = getTimeDifference(post_date);

  return (
    <div className="max-w-xl mx-auto bg-white border-b-4 border-deselect font-[AppleRegular]">
      <div className="p-4">
        <div className="flex items-center">
          <img className="h-10 w-10 rounded-12" src={Profile} alt="Profile" />
          <div className="ml-3">
            <h3 className="text-[14px] font-bold text-black">{username}</h3>
            <p className="text-xs text-exgray">{timeDifference}</p>
          </div>
        </div>
        <div className="ml-[50px]">
          <p className="mt-2 text-gray-600">{content}</p>
          {image && (
            <div className="mt-4 rounded-18">
              <img src={image} alt="Post Image" />
            </div>
          )}
          <div className="mt-4 flex items-center text-gray-500 text-sm">
            <button
              className="flex items-center mr-4 text-exgray"
              onClick={() => handle_scrap(id)}
            >
              {is_scraped ? (
                <img src={thumb_up_pressed} className="w-4 h-4 mr-1" />
              ) : (
                <img src={thumb_up} className="w-4 h-4 mr-1" />
              )}
              {scrap_count}
            </button>
            <button className="flex items-center text-exgray">
              <img src={Chat} className="w-4 h-4 mr-1" />
              {reply_count}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
