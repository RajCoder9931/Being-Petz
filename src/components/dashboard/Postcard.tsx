import React, { useState } from "react";

interface PostCardProps {
  profileImg: string;
  userName: string;
  time: string;
  text?: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  shares: number;
}

const PostCard: React.FC<PostCardProps> = ({
  profileImg,
  userName,
  time,
  text,
  image,
  video,
  likes,
  comments,
  shares,
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [commentList, setCommentList] = useState<string[]>([
    "So cute! 😍",
    "I love this post ❤️",
  ]);
  const [newComment, setNewComment] = useState("");

  const reactions = ["👍", "❤️", "😂", "😮", "😢", "😡"];

  const handleReactionClick = (reaction: string) => {
    setSelectedReaction(reaction);
    setShowReactions(false);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setCommentList((prev) => [...prev, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* Profile */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={profileImg}
          alt={userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{userName}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>

      {/* Post text */}
      {text && <p className="mb-3">{text}</p>}

      {/* Post image/video */}
      {image && (
        <img
          src={image}
          alt=""
          className="w-full rounded-lg mb-3 object-cover"
        />
      )}
      {video && (
        <iframe
          src={video}
          title="Video Post"
          className="w-full h-64 rounded-lg mb-3"
          allowFullScreen
        ></iframe>
      )}

      {/* Likes/Comments count */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <span>{likes} Likes {selectedReaction && `(${selectedReaction})`}</span>
        <span>{comments} Comments</span>
        <span>{shares} Shares</span>
      </div>

      {/* Buttons */}
      <div className="flex justify-around border-t border-b py-2 text-gray-600 text-sm font-medium">
        {/* Like */}
        <div
          className="relative flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-4 py-1 rounded"
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          👍 Like
          {showReactions && (
            <div className="absolute -top-12 left-0 flex gap-2 bg-white shadow-lg rounded-full px-3 py-2 z-10">
              {reactions.map((r) => (
                <span
                  key={r}
                  className="text-xl cursor-pointer hover:scale-125 transition"
                  onClick={() => handleReactionClick(r)}
                >
                  {r}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Comment */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-4 py-1 rounded">
          💬 Comment
        </div>

        {/* Share */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-4 py-1 rounded">
          ↗️ Share
        </div>
      </div>

      {/* Comments */}
      <div className="mt-3 space-y-2">
        {commentList.map((c, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-2 text-sm">
            {c}
          </div>
        ))}

        {/* Add comment */}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded-full px-3 py-1 text-sm"
          />
          <button
            onClick={handleAddComment}
            className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-700"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
