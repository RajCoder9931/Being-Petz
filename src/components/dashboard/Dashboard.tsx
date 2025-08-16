import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
// Components
import Header from "./Header";
import Sidebar from "./sidebar";
import PostCard from "./Postcard";
import FriendSuggestions from "./FriendSuggestions";
import Footer from "./Footer";
import Loader from "./Loader";
// Images
import catImg from "../../assets/banner.jpg";
import img1 from "../../assets/user/03.jpg";
import img2 from "../../assets/user/01.jpg";
import img3 from "../../assets/user/07.jpg";
import img7 from "../../assets/user/06.jpg";
import img8 from "../../assets/user/07.jpg";
import img9 from "../../assets/user/08.jpg";
import adoptPetImg from "../../assets/adopt-img.png";
import lostFoundImg from "../../assets/lost-found.png";
import parrotImg from "../../assets/user/p4.jpg";
import whiteCatImg from "../../assets/user/p3.jpg";
import dogImg from "../../assets/user/p2.jpg";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");

  const communities = [
    { name: "Dog Lovers Club", members: "10k Members", img: img1 },
    { name: "Cat Kingdom", members: "8.5k Members", img: img2 },
    { name: "Pet Buddies", members: "6.2k Members", img: img3 },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handlePost = () => {
    console.log("Post Content:", postText);
    setPostText("");
    closeModal();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 bg-gray-100 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN */}
            <div className="col-span-2 space-y-6">
              {/* Banner */}
              <div className="rounded-xl overflow-hidden">
                <img src={catImg} alt="Cat" className="w-full h-full object-cover" />
              </div>

              {/* Create Post Card */}
              <div className="bg-white rounded-xl shadow p-4">
                <h3 className="text-lg font-semibold text-purple-700 mb-3">Create Post</h3>
                <div onClick={openModal} className="flex items-center gap-3 cursor-pointer">
                  <img src={img1} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                  <input
                    type="text"
                    placeholder="Write something here..."
                    className="bg-gray-100 rounded-full px-4 py-2 flex-1 cursor-pointer"
                    readOnly
                  />
                </div>
                <div className="flex gap-3 mt-3">
                  <button className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm">
                    📷 Photo/Video
                  </button>
                  <button className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm">
                    🧍 Tag Friend
                  </button>
                  <button className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm">
                    😊 Feeling/Activity
                  </button>
                </div>
              </div>

              {/* Posts */}
              <PostCard
                profileImg={img1}
                userName="Bni Cyst"
                time="1 hour ago"
                text="Lorem ipsum dolor sit amet..."
                image={parrotImg}
                likes={140}
                comments={20}
                shares={99}
              />

              <FriendSuggestions
                suggestions={[
                  { name: "Buddy (Golden)", desc: "Loves fetching and cuddles", mutual: 3, img:img7 },
                  { name: "Kiwi (Talks-a-lot)", desc: "Can say your name!", mutual: 2, img:img8 },
                  { name: "Nibbles (Tiny Hero)", desc: "Full of energy and love!", mutual: 4, img:img9},
                ]}
              />

              <PostCard
                profileImg={img1}
                userName="Bni Cyst"
                time="3 days ago"
                image={whiteCatImg}
                likes={140}
                comments={20}
                shares={99}
              />

              <PostCard
                profileImg={img2}
                userName="Monty Carlo"
                time="5 days ago"
                text="Lorem ipsum dolor sit amet..."
                image={dogImg}
                likes={100}
                comments={15}
                shares={80}
              />

              <PostCard
                profileImg={img3}
                userName="Paige Turner"
                time="1 day ago"
                text="Lorem ipsum dolor sit amet..."
                video="https://www.youtube.com/embed/xeXV1KoX034?start=60"
                likes={140}
                comments={20}
                shares={99}
              />

            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* Communities */}
              <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col" style={{ height: "350px" }}>
                <div className="bg-purple-600 px-4 py-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Communities</h3>
                  <button className="text-white hover:text-gray-200">⋮</button>
                </div>
                <div className="p-4 overflow-y-auto">
                  <ul className="space-y-4">
                    {communities.map((com, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={com.img} alt={com.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="font-medium text-gray-800">{com.name}</p>
                            <p className="text-sm text-gray-500">{com.members}</p>
                          </div>
                        </div>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1 rounded-lg">
                          Join
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-center">
                    <Link to="/communities" className="text-purple-600 font-medium hover:underline">
                      See All Communities →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Adopt Pet */}
              <div
                className="relative rounded-2xl shadow-lg overflow-hidden h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${adoptPetImg})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-500/70 p-5 flex flex-col justify-center text-white">
                  <h3 className="text-lg font-semibold">Adopt a Pet</h3>
                  <p className="text-sm mt-1">Give a homeless pet a home and a loving family!</p>
                  <Link
                    to="/adopt-pet"
                    className="mt-2 flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-medium shadow-md hover:opacity-90 transition"
                  >
                    <FaPaw /> Adopt Now
                  </Link>
                </div>
              </div>

              {/* Lost & Found */}
              <div
                className="relative rounded-2xl shadow-lg overflow-hidden h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${lostFoundImg})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/80 to-pink-400/80 p-5 flex flex-col justify-center text-white">
                  <h3 className="text-lg font-semibold">Lost &amp; Found Pets</h3>
                  <div className="mt-4 flex gap-3">
                    <Link
                      to="/report"
                      className="px-5 py-2 rounded-full bg-purple-600 text-white text-sm font-medium shadow-md hover:bg-purple-700 transition"
                    >
                      Report
                    </Link>
                    <Link
                      to="/found"
                      className="px-5 py-2 rounded-full border border-white text-white text-sm font-medium shadow-md hover:bg-white hover:text-pink-600 transition"
                    >
                      Found
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-5 relative">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-600 hover:text-black">
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">Create Post</h3>
            <div className="flex items-center gap-3 mb-4">
              <img src={img1} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Write something here..."
                className="w-full border rounded-lg p-2 resize-none"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button className="bg-purple-600 text-white py-2 rounded-lg">📷 Photo/Video</button>
              <button className="bg-purple-600 text-white py-2 rounded-lg">🧍 Tag Friend</button>
              <button className="bg-purple-600 text-white py-2 rounded-lg">😊 Feeling/Activity</button>
              <button className="bg-purple-600 text-white py-2 rounded-lg">📍 Check In</button>
              <button className="bg-purple-600 text-white py-2 rounded-lg">🎥 Live Video</button>
              <button className="bg-purple-600 text-white py-2 rounded-lg">🎞️ Gif</button>
              <button className="bg-purple-600 text-white py-2 rounded-lg">🍿 Watch Party</button>
              <button className="bg-purple-600 text-white py-2 rounded-lg">🎮 Play with Friends</button>
            </div>
            <button
              onClick={handlePost}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
            >
              Post
            </button>
          </div>
        </div>
      )}
      <Loader />
            <Footer />

    </div>
  );
};

export default Dashboard;
