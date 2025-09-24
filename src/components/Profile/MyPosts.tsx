import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiRepost } from "react-icons/bi";

// Parent interface
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile: string | null;
}

// Comment interface
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

interface DeletePostResponse {
  status: boolean;
  message: string;
}

interface Parent {
  id: number;
  first_name: string;
  last_name: string;
  profile: string;
}

// Post interface - reposts_count पहले से ही है
interface Post {
  id: number;
  parent_id: number;
  content: string;
  featured_image: string | null;
  created_at_human: string;
  parent: Parent;
  likes_count: number;
  comments_count: number;
  reposts_count: number; // यह पहले से मौजूद है
}

interface ApiResponse {
  status: boolean;
  data: {
    current_page: number;
    data: Post[];
  };
}

const MyPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [postId: number]: Comment[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingComments, setLoadingComments] = useState<{ [postId: number]: boolean }>({});
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState<{ [postId: number]: string }>({});
  const [submittingComment, setSubmittingComment] = useState<{ [postId: number]: boolean }>({});
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [deletingPost, setDeletingPost] = useState<number | null>(null);
  const [sharingPost, setSharingPost] = useState<number | null>(null);

  useEffect(() => {
    // when the user is login in the localstorage
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user = localStorage.getItem("user");
        if (!user) {
          console.error("User not found in localStorage");
          setLoading(false);
          return;
        }

        const parsedUser = JSON.parse(user);
        const userId: number = parsedUser?.id;

        if (!userId) {
          console.error("User ID not found");
          setLoading(false);
          return;
        }

        const res = await axios.post<ApiResponse>(
          "https://argosmob.com/being-petz/public/api/v1/post/get/my",
          {
            parent_id: userId
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (res.data.status && res.data.data) {
          setPosts(res.data.data.data || []);
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

    fetchPosts();
  }, []);

  // Fetch comments for a specific post
  const fetchComments = async (postId: number) => {
    setLoadingComments(prev => ({ ...prev, [postId]: true }));

    try {
      const res = await axios.post<CommentApiResponse>(
        "https://argosmob.com/being-petz/public/api/v1/post/get-comment",
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

  // Share post function
  const sharePost = async (postId: number) => {
    if (!currentUser) {
      alert('Please login to share posts');
      return;
    }

    setSharingPost(postId);

    try {
      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/post/share",
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
        // Update share count in state
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, reposts_count: post.reposts_count + 1 }
            : post
        ));
        alert('Post shared successfully!');
      } else {
        alert(res.data.message || 'Failed to share post.');
      }
    } catch (err) {
      console.error(`Error sharing post ${postId}:`, err);
      alert('Error sharing post. Please try again.');
    } finally {
      setSharingPost(null);
    }
  };

  // Delete post
  const deletePost = async (postId: number) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setDeletingPost(postId);

    try {
      const res = await axios.post<DeletePostResponse>(
        "https://argosmob.uk/being-petz/public/api/v1/post/delete",
        {
          post_id: postId
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (res.data.status) {
        // Remove post from state
        setPosts(prev => prev.filter(post => post.id !== postId));
        alert('Post deleted successfully!');
      } else {
        alert('Failed to delete post. Please try again.');
      }
    } catch (err) {
      console.error(`Error deleting post ${postId}:`, err);
      alert('Error deleting post. Please try again.');
    } finally {
      setDeletingPost(null);
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
  const toggleMenu = (postId: number) => {
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

  if (loading) return <p className="p-4">Loading posts...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts found</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md p-4 mb-4 relative"
          >
            {/* Three-dot Menu */}
            <div className="absolute top-4 right-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu(post.id);
                }}
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
                    onClick={() => deletePost(post.id)}
                    disabled={deletingPost === post.id}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center disabled:opacity-50"
                  >
                    {deletingPost === post.id ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Delete Post
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
                  e.currentTarget.src = 'https://via.placeholder.com/40x40?text=U';
                }}
              />
              <div>
                <p className="font-semibold">
                  {post.parent.first_name} {post.parent.last_name}
                </p>
                <p className="text-gray-500 text-sm">{post.created_at_human}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="mb-2 whitespace-pre-wrap">{post.content}</p>

            {post.featured_image && (
              <img
                src={`https://argosmob.com/being-petz/public/${post.featured_image}`}
                alt="Post"
                className="rounded-lg w-full mb-2 max-h-96 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}

            {/* Post Stats - WITH Share Section */}
            <div className="flex justify-between text-gray-600 text-sm mt-3 pt-2 border-t">
              <span className="flex items-center">
                👍 {post.likes_count} Likes
              </span>
              <button
                onClick={() => toggleComments(post.id)}
                className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
              >
                💬 {post.comments_count} Comments
              </button>
              <button
                onClick={() => sharePost(post.id)}
                disabled={sharingPost === post.id}
                className={`flex items-center transition-colors ${
                  sharingPost === post.id ? 'text-gray-400' : 'text-green-500 hover:text-green-700'
                }`}
                title="Share Post"
              >
                {sharingPost === post.id ? (
                  <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                    <BiRepost />

                )}
                {post.reposts_count} Repost
              </button>
            </div>

            {/* Comments Section - Always visible comment input */}
            <div className="mt-3">
              {/* Add Comment Form - Always visible */}
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

              {/* Comments List - Show only when comments are clicked */}
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
        ))
      )}
    </div>
  );
};

export default MyPosts;