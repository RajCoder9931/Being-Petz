// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import PostCard from "./Postcard";

// interface Parent {
//   id: number;
//   first_name: string;
//   last_name: string;
//   avatar?: string;
// }

// interface Post {
//   id: number;
//   parent_id: number;
//   content: string | null;
//   featured_image: string | null;
//   featured_video: string | null;
//   created_at_human: string;
//   likes_count: number;
//   shares_count: number;
//   comments_count: number;
//   parent: Parent;
// }

// const PostList: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("https://argosmob.com/being-petz/public/api/v1/post/all")
//       .then((res) => {
//         setPosts(res.data.data.data || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching posts:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="space-y-4 max-w-4xl mx-auto mt-4">
//   {posts.map((post) => (
//     <PostCard key={post.id} post={post} />
//   ))}
// </div>

//   );
// };

// export default PostList;

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
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        //   Fetch global posts
        const allRes = await axios.get(
          "https://argosmob.com/being-petz/public/api/v1/post/all"
        );
        setAllPosts(allRes.data.data.data || []);

        //  Get user from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user?.id) {
            // ✅ Fetch logged-in user's posts
            const myRes = await axios.get(
              "https://argosmob.com/being-petz/public/api/v1/post/get/my",
              {
                params: { parent_id: user.id }, // in case API expects id
              }
            );
            setMyPosts(myRes.data.data.data || []);
          }
        }
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
      {/* 🔹 User's Own Posts */}
      {myPosts.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">My Posts</h2>
          <div className="space-y-4">
            {myPosts.map((post) => (
              <PostCard key={`my-${post.id}`} post={post} />
            ))}
          </div>
        </div>
      )}

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

