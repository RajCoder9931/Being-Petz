import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./Postcard";

interface Parent {
  id: number;
  first_name: string;
  last_name: string;
  avatar?: string;
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://argosmob.com/being-petz/public/api/v1/post/all")
      .then((res) => {
        setPosts(res.data.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="space-y-4 max-w-4xl mx-auto mt-4">
  {posts.map((post) => (
    <PostCard key={post.id} post={post} />
  ))}
</div>

  );
};

export default PostList;
