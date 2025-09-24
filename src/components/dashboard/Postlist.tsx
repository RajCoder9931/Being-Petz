import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./Postcard";

interface Parent {
  id: number;
  first_name: string;
  last_name: string;
  avatar?: string;
  profile?: string;
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

const PostList: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        //   Fetch global posts
        const allRes = await axios.get(
          "https://argosmob.com/being-petz/public/api/v1/post/all"
        );
        setAllPosts(allRes.data.data.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto mt-4">
      {/* 🔹 All Posts */}
      <div>
        <h2 className="text-lg font-bold mb-3">All Posts</h2>
        <div className="space-y-4">
          {allPosts.map((post) => (
            <PostCard key={`all-${post.id}`} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;


 