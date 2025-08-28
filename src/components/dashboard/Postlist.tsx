import PostCard from "./Postcard";
import img1 from "../../assets/user/03.jpg";
import img2 from "../../assets/user/01.jpg";
import img3 from "../../assets/user/07.jpg";
import parrotImg from "../../assets/user/p4.jpg";
import whiteCatImg from "../../assets/user/p3.jpg";
import dogImg from "../../assets/user/p2.jpg";

const PostList = () => {
  const posts = [
    {
      profileImg: img1,
      userName: "Bni Cyst",
      time: "1 hour ago",
      text: "Lorem ipsum dolor sit amet...",
      image: parrotImg,
      likes: 140,
      comments: 20,
      shares: 99,
      initialComments: [],
    },
    {
      profileImg: img1,
      userName: "Bni Cyst",
      time: "3 days ago",
      text: "",
      image: whiteCatImg,
      likes: 140,
      comments: 20,
      shares: 99,
      initialComments: [],
    },
    {
      profileImg: img2,
      userName: "Monty Carlo",
      time: "5 days ago",
      text: "Lorem ipsum dolor sit amet...",
      image: dogImg,
      likes: 100,
      comments: 15,
      shares: 80,
      initialComments: [],
    },
    {
      profileImg: img3,
      userName: "Paige Turner",
      time: "1 day ago",
      text: "Lorem ipsum dolor sit amet...",
      video: "https://www.youtube.com/embed/tgbNymZ7vqY",
      likes: 140,
      comments: 20,
      shares: 99,
      initialComments: [],
    },
  ];

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
    </div>
  );
};

export default PostList;
 