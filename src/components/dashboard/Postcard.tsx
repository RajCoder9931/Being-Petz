import React, { useState, useEffect } from "react";
import axios from "axios";

interface Parent {
  id: number;
  first_name: string;
  last_name: string;
  avatar?: string;
}

interface Comment {
  id: number;
  post_id: number;
  parent_id: number;
  comment: string;
  human_date: string;
  user?: {
    id: number;
    first_name: string;
    last_name?: string;
    avatar: string;
  };
}

interface Post {
  id: number;
  parent_id: number;
  content: string | null;
  featured_image: string | null;
  featured_video: string | null;
  created_at_human: string;
  likes_count: number;
  shares_count: number;
  comments_count: number;
  parent: Parent;
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [likeCount, setLikeCount] = useState(post.likes_count || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commentCount, setCommentCount] = useState(post.comments_count || 0);
  const [loadingComment, setLoadingComment] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ✅ Like handler
  const handleLike = async () => {
    try {
      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/post/like",
        {
          post_id: post.id,
          parent_id: user.id,
        }
      );

      if (res.data.status) {
        if (isLiked) {
          setLikeCount((prev) => prev - 1);
        } else {
          setLikeCount((prev) => prev + 1);
        }
        setIsLiked(!isLiked);
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  // ✅ Fetch comments
  const fetchComments = async () => {
    try {
      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/post/get-comment",
        { post_id: post.id }
      );
      setCommentList(res.data.comment || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // ✅ Add new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setLoadingComment(true);
    try {
      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/post/comment",
        {
          post_id: post.id,
          parent_id: user.id,
          comment: newComment,
        }
      );

      if (res.data.status) {
        setNewComment("");
        setCommentCount((prev) => prev + 1);
        fetchComments();
      }
    } catch (err) {
      console.error("Error adding comment:", err);
    } finally {
      setLoadingComment(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post.id]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 max-w-lg">
      {/* Top Section */}
      <div className="flex items-start gap-3 mb-3">
        <img
          src={
            post.parent?.avatar
              ? `https://argosmob.com/being-petz/public/${post.parent.avatar}`
              : "https://via.placeholder.com/40"
          }
          alt={post.parent?.first_name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">
            {post.parent?.first_name} {post.parent?.last_name}
          </p>
          <p className="text-xs text-blue-500">{post.created_at_human}</p>
        </div>
      </div>

      {/* Post Text */}
      {post.content && <p className="text-gray-700 mb-3">{post.content}</p>}

      {/* Post Image */}
      {post.featured_image && (
        <img
          src={`https://argosmob.com/being-petz/public/${post.featured_image}`}
          alt="post"
          className="w-full rounded-lg mb-3 object-cover"
        />
      )}

      {/* Post Video */}
      {post.featured_video && (
        <div className="w-full rounded-lg overflow-hidden mb-3">
          <video
            src={`https://argosmob.com/being-petz/public/${post.featured_video}`}
            controls
            className="w-full"
          />
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <div className="flex gap-2 items-center">
          <span>{likeCount} Likes</span>
        </div>
        <div className="flex gap-4">
          <span>{commentCount} Comment</span>
          <span>{post.shares_count} Share</span>
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
        {commentList.map((c) => {
          // ✅ Default values
          let displayName = "Anonymous";
          let avatarUrl = "https://via.placeholder.com/32";

          // Agar API se user mila toh use karo
          if (c.user?.first_name) {
            displayName =
              c.user.first_name +
              (c.user.last_name ? " " + c.user.last_name : "");
            if (c.user.avatar) {
              avatarUrl = `https://argosmob.com/being-petz/public/${c.user.avatar}`;
            }
          } else {
            // Agar API missing hai, aur yeh logged-in user ka comment hai
            if (user && user.id === c.parent_id) {
              displayName =
                user.first_name + (user.last_name ? " " + user.last_name : "");
              if (user.avatar) {
                avatarUrl = `https://argosmob.com/being-petz/public/${user.avatar}`;
              }
            }
          }

          return (
            <div key={c.id} className="flex gap-2 items-start">
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm bg-gray-100 rounded-lg px-3 py-1">
                  <span className="font-semibold">{displayName}</span> {c.comment}
                </p>
                <div className="text-xs text-gray-500 flex gap-3 mt-1">
                  <span>{c.human_date}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add comment */}
        <div className="flex items-center gap-2 mt-2">
          <img
            src={
              user.avatar
                ? `https://argosmob.com/being-petz/public/${user.avatar}`
                : "https://via.placeholder.com/32"
            }
            alt="you"
            className="w-8 h-8 rounded-full object-cover"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Enter Your Comment"
            className="flex-1 border rounded-full px-3 py-1 text-sm"
            disabled={loadingComment}
          />
          <button
            onClick={handleAddComment}
            className="text-gray-400 hover:text-purple-600"
            disabled={loadingComment}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
