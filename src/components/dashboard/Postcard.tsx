import  { useState } from "react";
 interface Comment {
  user: string;
  avatar: string;
  text: string;
  time: string;
}
 interface PostCardProps {
  profileImg: string;
  userName: string;
  action?: string;
  time: string;
  text?: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  shares: number;
  initialComments: Comment[];
  className?: string;  
}

const PostCard: React.FC<PostCardProps> = ({
  profileImg,
  userName,
  action,
  time,
  text,
  image,
  video,
  likes,
  comments,
  shares,
  initialComments,
  className = "",
}) => {
  const [commentList, setCommentList] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  const [commentCount, setCommentCount] = useState(comments);

   const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

   function handleAddComment() {
    if (newComment.trim() !== "") {
      setCommentList((prev) => [
        ...prev,
        {
          user: "You",
          avatar: profileImg,
          text: newComment,
          time: "Just now",
        },
      ]);
      setNewComment("");
      setCommentCount(commentCount + 1);
    }
  }

  return (
<div
  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 max-w-lg ${className}`}
>      {/* Top Section */}
      <div className="flex items-start gap-3 mb-3">
        <img
          src={profileImg}
          alt={userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">
            {userName}{" "}
            {action && (
              <span className="font-normal text-gray-500">{action}</span>
            )}
          </p>
          <p className="text-xs text-blue-500">{time}</p>
        </div>
      </div>

      {/* Post Text */}
      {text && <p className="text-gray-700 mb-3">{text}</p>}

      {/* Post Image */}
      {image && (
        <img
          src={image}
          alt=""
          className="w-full rounded-lg mb-3 object-cover"
        />
      )}

      {/* Post Video */}
      {video && (
        <div className="w-full rounded-lg overflow-hidden mb-3">
          <iframe
            width="100%"
            height="250"
            src={video}
            title="video"
            allowFullScreen
          />
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <div className="flex gap-2 items-center">
          <span> </span>
          <span>{likeCount} Likes</span>
        </div>
        <div className="flex gap-4">
          <span>{commentCount} Comment</span>
          <span>{shares} Share</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-around border-y py-2 text-gray-600 text-sm font-medium">
        <div
          onClick={handleLike}
          className={`flex items-center gap-2 cursor-pointer px-4 py-1 rounded ${
            isLiked ? "text-blue-600 font-semibold" : "hover:bg-gray-100"
          }`}
        >
          {isLiked ? "Liked" : "Like"}
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-4 py-1 rounded">
           Comment
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-4 py-1 rounded">
           Share
        </div>
      </div>

      {/* Comments */}
      <div className="mt-3 space-y-3">
        {commentList.map((c, index) => (
          <div key={index} className="flex gap-2 items-start">
            <img
              src={c.avatar}
              alt={c.user}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm bg-gray-100 rounded-lg px-3 py-1">
                <span className="font-semibold">{c.user}</span> {c.text}
              </p>
              <div className="text-xs text-gray-500 flex gap-3 mt-1">
                <span>Like</span>
                <span>Reply</span>
                <span>Translate</span>
                <span>{c.time}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Add comment */}
        <div className="flex items-center gap-2 mt-2">
          <img
            src={profileImg}
            alt="you"
            className="w-8 h-8 rounded-full object-cover"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Enter Your Comment"
            className="flex-1 border rounded-full px-3 py-1 text-sm"
          />
          <button
            onClick={handleAddComment}
            className="text-gray-400 hover:text-purple-600"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
