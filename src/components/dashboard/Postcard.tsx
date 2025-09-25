import React, { useEffect, useState } from "react";
import axios from "axios";
import FriendSuggestions from "./FriendSuggestions";
// Interfaces
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile: string | null;
}

interface Comment {
  id: number;
  post_id: number;
  parent_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  human_date: string;
  user: User;
}

interface CommentApiResponse {
  status: boolean;
  message: string;
  comment: Comment[];
}

interface AddCommentResponse {
  status: boolean;
  message: string;
  comment: Comment;
}

interface LikeResponse {
  status: boolean;
  message: string;
  likes_count: number;
  is_liked: boolean; // Added to response
}

interface RepostResponse {
  status: boolean;
  message: string;
}

interface ReportResponse {
  status: boolean;
  message: string;
}

interface Parent {
  id: number;
  first_name: string;
  last_name: string;
  profile: string;
}

interface Post {
  id: number;
  parent_id: number;
  content: string;
  featured_image: string | null;
  featured_video: string | null;
  created_at_human: string;
  parent: Parent;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  reposts_count: number;
  is_liked: boolean; // To track if current user liked the post
  repost: any;
}

interface ApiResponse {
  status: boolean;
  data: {
    current_page: number;
    data: Post[];
  };
}

const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [postId: number]: Comment[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingComments, setLoadingComments] = useState<{ [postId: number]: boolean }>({});
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState<{ [postId: number]: string }>({});
  const [submittingComment, setSubmittingComment] = useState<{ [postId: number]: boolean }>({});
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [likingPost, setLikingPost] = useState<number | null>(null);
  const [repostingPost, setRepostingPost] = useState<number | null>(null);
  const [reportingPost, setReportingPost] = useState<number | null>(null);

  useEffect(() => {
    // Get current user from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);

      // Load liked posts from localStorage
      const likedPosts = localStorage.getItem(`likedPosts_${parsedUser.id}`);
      if (likedPosts) {
        // We'll use this to set initial like status after fetching posts
      }
    }
  }, []);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          "https://argosmob.com/being-petz/public/api/v1/post/all",
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (res.data.status && res.data.data) {
          let postsData = res.data.data.data || [];

          // Enhance posts with like status from localStorage
          if (currentUser) {
            const likedPosts = JSON.parse(localStorage.getItem(`likedPosts_${currentUser.id}`) || '{}');
            postsData = postsData.map(post => ({
              ...post,
              is_liked: likedPosts[post.id] || false
            }));
          }

          setPosts(postsData);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, [currentUser]);

  // Save liked posts to localStorage
  const saveLikedPostsToStorage = (postId: number, isLiked: boolean) => {
    if (!currentUser) return;

    const likedPosts = JSON.parse(localStorage.getItem(`likedPosts_${currentUser.id}`) || '{}');
    likedPosts[postId] = isLiked;
    localStorage.setItem(`likedPosts_${currentUser.id}`, JSON.stringify(likedPosts));
  };

  // Fetch comments for a specific post
  const fetchComments = async (postId: number) => {
    setLoadingComments(prev => ({ ...prev, [postId]: true }));

    try {
      const res = await axios.post<CommentApiResponse>(
        "https://argosmob.uk/being-petz/public/api/v1/post/get-comment",
        {
          post_id: postId
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (res.data.status && res.data.comment) {
        setComments(prev => ({
          ...prev,
          [postId]: res.data.comment
        }));
      }
    } catch (err) {
      console.error(`Error fetching comments for post ${postId}:`, err);
    } finally {
      setLoadingComments(prev => ({ ...prev, [postId]: false }));
    }
  };

  // Add new comment
  const addComment = async (postId: number) => {
    if (!newComment[postId]?.trim() || !currentUser) return;

    setSubmittingComment(prev => ({ ...prev, [postId]: true }));

    try {
      const res = await axios.post<AddCommentResponse>(
        "https://argosmob.com/being-petz/public/api/v1/post/comment",
        {
          post_id: postId,
          parent_id: currentUser.id,
          comment: newComment[postId].trim()
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (res.data.status) {
        // Clear comment input
        setNewComment(prev => ({ ...prev, [postId]: '' }));

        // Refresh comments for this post
        await fetchComments(postId);

        // Update post comments count
        setPosts(prev => prev.map(post =>
          post.id === postId
            ? { ...post, comments_count: post.comments_count + 1 }
            : post
        ));
      }
    } catch (err) {
      console.error(`Error adding comment to post ${postId}:`, err);
      alert('Error adding comment. Please try again.');
    } finally {
      setSubmittingComment(prev => ({ ...prev, [postId]: false }));
    }
  };

  // Like/Unlike post
  const toggleLike = async (postId: number) => {
    if (!currentUser) return;

    setLikingPost(postId);

    try {
      const res = await axios.post<LikeResponse>(
        "https://argosmob.com/being-petz/public/api/v1/post/like",
        {
          post_id: postId,
          parent_id: currentUser.id
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (res.data.status) {
        const newLikeStatus = !posts.find(p => p.id === postId)?.is_liked;

        // Update post like status and count
        setPosts(prev => prev.map(post =>
          post.id === postId
            ? {
              ...post,
              likes_count: res.data.likes_count,
              is_liked: newLikeStatus
            }
            : post
        ));

        // Save to localStorage for persistence
        saveLikedPostsToStorage(postId, newLikeStatus);

        // Show appropriate message
        if (newLikeStatus) {
          // alert('Post liked!');
        } else {
          // alert('Post unliked!');
        }
      }
    } catch (err) {
      console.error(`Error liking post ${postId}:`, err);
      alert('Error liking post. Please try again.');
    } finally {
      setLikingPost(null);
    }
  };

  // Repost a post (only for friend's posts, not own posts)
  const repost = async (postId: number) => {
    if (!currentUser) return;

    // Check if this is user's own post
    const post = posts.find(p => p.id === postId);
    if (post && post.parent_id === currentUser.id) {
      alert("You cannot repost your own post!");
      return;
    }

    setRepostingPost(postId);

    try {
      const res = await axios.post<RepostResponse>(
        "https://argosmob.com/being-petz/public/api/v1/post/re-post",
        {
          post_id: postId,
          parent_id: currentUser.id
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (res.data.status) {
        alert('Post reposted successfully!');
        // Refresh posts to get updated repost count
        const refreshRes = await axios.get<ApiResponse>(
          "https://argosmob.com/being-petz/public/api/v1/post/all"
        );
        if (refreshRes.data.status && refreshRes.data.data) {
          let postsData = refreshRes.data.data.data || [];

          // Maintain like status from localStorage
          if (currentUser) {
            const likedPosts = JSON.parse(localStorage.getItem(`likedPosts_${currentUser.id}`) || '{}');
            postsData = postsData.map(post => ({
              ...post,
              is_liked: likedPosts[post.id] || false
            }));
          }

          setPosts(postsData);
        }
      } else {
        alert('Failed to repost. Please try again.');
      }
    } catch (err) {
      console.error(`Error reposting post ${postId}:`, err);
      alert('Error reposting post. Please try again.');
    } finally {
      setRepostingPost(null);
    }
  };

  // Report a post
  const reportPost = async (postId: number) => {
    if (!currentUser) return;

    const reason = prompt("Please enter the reason for reporting this post:");
    if (!reason) return;

    setReportingPost(postId);

    try {
      const res = await axios.post<ReportResponse>(
        "https://argosmob.uk/being-petz/public/api/v1/report/add",
        {
          post_id: postId,
          parent_id: currentUser.id,
          reason: reason,
          type: 'post'
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (res.data.status) {
        alert('Post reported successfully!');
      } else {
        alert('Failed to report post. Please try again.');
      }
    } catch (err) {
      console.error(`Error reporting post ${postId}:`, err);
      alert('Error reporting post. Please try again.');
    } finally {
      setReportingPost(null);
      setMenuOpen(null);
    }
  };

  // Toggle comments visibility
  const toggleComments = (postId: number) => {
    if (expandedPost === postId) {
      setExpandedPost(null);
    } else {
      setExpandedPost(postId);
      fetchComments(postId);
    }
  };

  // Toggle menu visibility
  const toggleMenu = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (menuOpen === postId) {
      setMenuOpen(null);
    } else {
      setMenuOpen(postId);
    }
  };

  // Handle comment input change
  const handleCommentChange = (postId: number, value: string) => {
    setNewComment(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  // Handle Enter key press for comment submission
  const handleKeyPress = (postId: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addComment(postId);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setMenuOpen(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Get file type from URL
  const getFileType = (url: string) => {
    if (!url) return null;
    const extension = url.split('.').pop()?.toLowerCase();
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(extension || '')) {
      return 'video';
    }
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '')) {
      return 'image';
    }
    return null;
  };

  if (loading) return <p className="p-4">Loading posts...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Social Feed</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts found</p>
      ) : (
        posts.map((post, index) => (
          <React.Fragment key={post.id}>
            {/* Post */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-4 relative">
              {/* Three-dot Menu for Report */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={(e) => toggleMenu(post.id, e)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="More options"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {menuOpen === post.id && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-10">
                    <button
                      onClick={() => reportPost(post.id)}
                      disabled={reportingPost === post.id}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center disabled:opacity-50"
                    >
                      {reportingPost === post.id ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Reporting...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                          </svg>
                          Report Post
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex items-center mb-3 pr-8">
                <img
                  src={`https://argosmob.com/being-petz/public/${post.parent.profile}`}
                  alt={post.parent.first_name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                  onError={(e) => {
                    e.currentTarget.src = 'https://avatar.iran.liara.run/public';
                  }}
                />
                <div>
                  <p className="font-semibold">
                    {post.parent.first_name} {post.parent.last_name}
                    {post.parent_id === currentUser?.id && (
                      <span className="text-blue-500 text-xs ml-1">(You)</span>
                    )}
                  </p>
                  <p className="text-gray-500 text-sm">{post.created_at_human}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="mb-2 whitespace-pre-wrap">{post.content}</p>

              {/* Media Section - Supports both Image and Video */}
              {(post.featured_image || post.featured_video) && (
                <div className="mb-2">
                  {post.featured_video ? (
                    <div className="relative">
                      <video
                        controls
                        className="rounded-lg w-full max-h-96 object-cover"
                        poster={post.featured_image ? `https://argosmob.com/being-petz/public/${post.featured_image}` : undefined}
                      >
                        <source
                          src={`https://argosmob.com/being-petz/public/${post.featured_video}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : post.featured_image ? (
                    <img
                      src={`https://argosmob.com/being-petz/public/${post.featured_image}`}
                      alt="Post"
                      className="rounded-lg w-full mb-2 max-h-96 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                </div>
              )}

              {/* Alternative: Check if featured_image is actually a video */}
              {post.featured_image && getFileType(post.featured_image) === 'video' && (
                <div className="mb-2">
                  <video
                    controls
                    className="rounded-lg w-full max-h-96 object-cover"
                  >
                    <source
                      src={`https://argosmob.com/being-petz/public/${post.featured_image}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Post Stats - Like, Comment, Repost */}
              <div className="flex justify-between text-gray-600 text-sm mt-3 pt-2 border-t">
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(post.id)}
                  disabled={likingPost === post.id}
                  className={`flex items-center transition-colors ${post.is_liked ? 'text-red-500 font-semibold' : 'text-gray-600 hover:text-red-500'
                    }`}
                >
                  {likingPost === post.id ? (
                    <>
                      <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {post.is_liked ? 'Liking...' : 'Unliking...'}
                    </>
                  ) : post.is_liked ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      Liked ({post.likes_count})
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Like ({post.likes_count})
                    </>
                  )}
                </button>

                {/* Comment Button */}
                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                >
                  💬 {post.comments_count} Comments
                </button>

                {/* Repost Button (only show for friend's posts) */}
                {post.parent_id !== currentUser?.id && (
                  <button
                    onClick={() => repost(post.id)}
                    disabled={repostingPost === post.id}
                    className={`flex items-center transition-colors ${repostingPost === post.id ? 'text-gray-400' : 'text-gray-600 hover:text-green-500'
                      }`}
                  >
                    {repostingPost === post.id ? (
                      <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                    )}
                    {post.reposts_count || 0} Repost
                  </button>
                )}
              </div>

              {/* Comments Section */}
              <div className="mt-3">
                {/* Add Comment Form */}
                {currentUser && (
                  <div className="mb-2">
                    <div className="flex space-x-2">
                      <img
                        src={currentUser.profile
                          ? `https://argosmob.com/being-petz/public/${currentUser.profile}`
                          : 'https://via.placeholder.com/32x32?text=U'
                        }
                        alt="You"
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/32x32?text=U';
                        }}
                      />
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newComment[post.id] || ''}
                          onChange={(e) => handleCommentChange(post.id, e.target.value)}
                          onKeyPress={(e) => handleKeyPress(post.id, e)}
                          placeholder="Write a comment..."
                          className="w-full border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:border-blue-500 pr-10"
                          disabled={submittingComment[post.id]}
                        />
                        <button
                          onClick={() => addComment(post.id)}
                          disabled={!newComment[post.id]?.trim() || submittingComment[post.id]}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 disabled:text-gray-300 disabled:cursor-not-allowed"
                          title="Post Comment"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Comments List */}
                {expandedPost === post.id && (
                  <div className="mt-2 border-t pt-2">
                    {loadingComments[post.id] ? (
                      <p className="text-gray-500 text-sm">Loading comments...</p>
                    ) : comments[post.id]?.length > 0 ? (
                      <div className="space-y-3">
                        {comments[post.id].map((comment) => (
                          <div key={comment.id} className="flex items-start space-x-2">
                            <img
                              src={comment.user.profile
                                ? `https://argosmob.com/being-petz/public/${comment.user.profile}`
                                : 'https://via.placeholder.com/32x32?text=U'
                              }
                              alt={comment.user.first_name}
                              className="w-8 h-8 rounded-full object-cover mt-1"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/32x32?text=U';
                              }}
                            />
                            <div className="flex-1 bg-gray-50 rounded-lg p-2">
                              <div className="flex justify-between items-start">
                                <span className="font-semibold text-sm">
                                  {comment.user.first_name} {comment.user.last_name}
                                  {comment.user.id === currentUser?.id && (
                                    <span className="text-blue-500 text-xs ml-1">(You)</span>
                                  )}
                                </span>
                                <span className="text-gray-400 text-xs">
                                  {comment.human_date}
                                </span>
                              </div>
                              <p className="text-sm mt-1">{comment.comment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No comments yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Show FriendSuggestions only once after 4th post */}
            {(index + 1) === 4 && (
              <div className="mb-4">
                <FriendSuggestions />
              </div>
            )}

          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default SocialFeed;

