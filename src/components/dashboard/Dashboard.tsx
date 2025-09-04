import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
// Components
import Header from "./Header";
import Sidebar from "./sidebar";
import FriendSuggestions from "./FriendSuggestions";
import Loader from "./Loader";
import CreatePost from "./CreatePost";
import PostList from "./Postlist";
// Images
import catImg from "../../assets/banner.jpg";
import img1 from "../../assets/user/03.jpg";
import img2 from "../../assets/user/01.jpg";
import img3 from "../../assets/user/07.jpg";
import img4 from "../../assets/user/p2.jpg"
import img7 from "../../assets/user/06.jpg";
import img8 from "../../assets/user/07.jpg";
import img9 from "../../assets/user/08.jpg";
import adoptPetImg from "../../assets/adopt-img.png";
import lostFoundImg from "../../assets/lost-found.png";


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  const communities = [
    { name: "Dog Lovers Club", members: "10k Members", img: img1 },
    { name: "Cat Kingdom", members: "8.5k Members", img: img2 },
    { name: "Pet Buddies", members: "6.2k Members", img: img3 },
    { name: "Pet Kings", members: "4.2k Members", img: img4 },
  ];

   

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

               {/* Create Post Component */}
                <CreatePost />

                {/* Post List */}
                <PostList />


              <FriendSuggestions
                suggestions={[
                  { name: "Buddy (Golden)", desc: "Loves fetching and cuddles", mutual: 3, img: img7 },
                  { name: "Kiwi (Talks-a-lot)", desc: "Can say your name!", mutual: 2, img: img8 },
                  { name: "Nibbles (Tiny Hero)", desc: "Full of energy and love!", mutual: 4, img: img9 },
                ]}
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
                    <Link to="/chats" className="text-purple-600 font-medium hover:underline">
                      See All Communities →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Adopt Pet */}
              <div
                className="relative rounded-2xl shadow-lg overflow-hidden h-60 bg-cover bg-center"
                style={{ backgroundImage: `url(${adoptPetImg})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-500/70 p-5 flex flex-col justify-center text-white">
                  <h3 className="text-xl font-semibold">Adopt a Pet</h3>
                  <p className="text-sm mt-2">Give a homeless pet a home and a loving family!</p>
                  <Link
                    to="/adopt-pet"
                    className="mt-3 ml-auto flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-medium shadow-md hover:opacity-90 transition"
                  >
                    <FaPaw className="text-white text-sm" /> Adopt Now
                  </Link>

                </div>
              </div>

              {/* Lost & Found */}
              <div
                className="relative rounded-2xl shadow-lg overflow-hidden h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${lostFoundImg})` }}
              >
                {/* gradient left → right: pink → purple */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 to-purple-600/90 p-5 flex flex-col justify-center text-white">
                  <h3 className="text-xl font-semibold">Lost &amp; Found Pets</h3>
                  <div className="mt-4 flex gap-3">
                    {/* Report button (gradient) */}
                    <Link
                      to="/report-found-pet"
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-medium shadow-md hover:opacity-90 transition"
                    >
                      Report
                    </Link>
                    {/* Found button (white with purple border) */}
                    <Link
                      to="/report-found-pet"
                      className="px-6 py-2 rounded-full bg-white text-purple-600 border border-purple-600 text-sm font-medium shadow-md hover:bg-purple-600 hover:text-white transition"
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

       
      <Loader />
 
    </div>
  );
};

export default Dashboard;
