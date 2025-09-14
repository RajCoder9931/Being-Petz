
import React, { useState, useEffect } from "react";
import axios from "axios";
import vaccinationIcon from "../../assets/img/noto_calendar.png";
import friendsIcon from "../../assets/img/Birds.png";
import femaleIcon from "../../assets/img/female.png";
import maleIcon from "../../assets/img/male.png";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// 🟢 Header & Sidebar import karo
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/Sidebar";

const SlideCard = ({ img, title, subtitle, bgColor }: any) => (
  <motion.div
    className="flex flex-col sm:flex-row items-center gap-3"
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <motion.img
      src={img}
      alt={title}
      className="w-full sm:w-40 h-40 rounded-lg object-cover shadow-md"
    />
    <motion.div
      className="flex-1 w-full p-3 sm:p-4 rounded-lg shadow-md"
      style={{ backgroundColor: bgColor }}
    >
      <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
      <p className="text-xs sm:text-sm">{subtitle}</p>
    </motion.div>
  </motion.div>
);

const Petprofile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"records" | "reminder" | "profile">("records");
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [pets, setPets] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 🟢 Sidebar state

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

   // Example Data
   const friends = [
    { id: 1, name: "Bella", date: "Oct 20", image: "https://placedog.net/300/300?id=10" },
    { id: 2, name: "Max", date: "Oct 22", image: "https://placedog.net/300/300?id=20" },
    { id: 3, name: "Luna", date: "Oct 25", image: "https://placedog.net/300/300?id=30" },
  ];

  const [selectedFriend, setSelectedFriend] = useState(friends[0]);
  const [showList, setShowList] = useState(false);


  useEffect(() => {
    if (user?.id || user?.user_id) {
      const userId = user.id || user.user_id;
      axios
        .post("https://argosmob.com/being-petz/public/api/v1/pet/get/my", {
          user_id: userId,
        })
        .then((res) => {
          if (res.data && res.data.data) {
            setPets(res.data.data);
          }
        })
        .catch((err) => {
          console.error("Error fetching pets:", err);
        });
    }
  }, [user]);

  const calculateAge = (dob: string) => {
    if (!dob) return "Age N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    if (years <= 0 && months <= 0) return "Just Born 🐾";
    if (years <= 0) return `${months} Month${months > 1 ? "s" : ""} Old`;
    if (months <= 0) return `${years} Year${years > 1 ? "s" : ""} Old`;
    return `${years} Year${years > 1 ? "s" : ""} ${months} Month${months > 1 ? "s" : ""} Old`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 🟢 Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {/* 🟢 Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Page Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Contest Reward Section */}
      <div className="bg-gradient-to-b from-purple-600 to-purple-700 rounded-2xl shadow-lg text-white overflow-hidden">
        {/* Upper (Pet Info) */}
        <div className="text-center p-6">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white">
            <img
              src="https://placedog.net/400/300?id=9" // Pet image
              alt="Pet"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-bold mt-3">LUNA</h3>
          <p className="text-sm">by Jessica S</p>
        </div>

        {/* Bottom White Section */}
        <div className="bg-white text-gray-800 text-center px-6 py-4 rounded-9xl">
          <p className="text-4xl font-bold">
            350 <span className="text-yellow-500">★</span>
          </p>
          <p className="mt-1 text-sm font-medium">Points Earned</p>
          <p className="mt-2 text-xs text-gray-600">
            From the "Purr-fect Pounce!" Contest
          </p>
          <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow hover:bg-purple-700 transition">
            View Full Leaderboard
          </button>
        </div>
      </div>

      {/* Reminder Section */}
      <div className="bg-white text-gray-800 rounded-2xl shadow-md p-4">
        {/* Upcoming Reminder with Shadow */}
        <div className="flex items-center space-x-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-lg px-3 py-2 shadow-sm shadow-purple-200">
          <span className="text-lg">🐾</span>
          <p>
            Upcoming:{" "}
            <span className="text-gray-800">Oct 25 - Grooming Reminder</span>
          </p>
        </div>

        {/* Pet Image */}
        <div className="mt-3 rounded-xl overflow-hidden">
          <img
            src="https://placedog.net/400/300?id=3" // Dog image
            alt="Dog"
            className="w-full h-50 object-cover"
          />
        </div>

        {/* Latest Moment */}
        <p className="mt-3 text-sm">
          <span className="font-semibold text-gray-800">Latest Moment:</span>{" "}
          <span className="text-gray-600">"My new favorite sunspot!"</span> ☀️
        </p>
      </div>
            </div>

            {/* Middle Column (Profile Section) */}
            <div>
              {/* Pet Selection */}
              <div className="bg-purple-100 p-6 rounded-2xl flex items-center justify-center gap-6 flex-wrap">
                {pets.length > 0 ? (
                  pets.map((pet, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
                    >
                      <div className="w-20 h-20 rounded-full border-4 border-purple-600 overflow-hidden">
                        <img
                          src={
                            pet.avatar
                              ? `https://argosmob.com/being-petz/public/${pet.avatar}`
                              : "https://placekitten.com/200/200"
                          }
                          alt={pet.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-2 font-semibold text-purple-600 text-sm">
                        {pet.name}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No pets found. Add a new one!</p>
                )}

                {/* Add Pet */}
                <div
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
                  onClick={() => navigate("/petform")}
                >
                  <div className="w-20 h-20 rounded-full border-4 border-purple-600 flex items-center justify-center text-purple-600 text-3xl">
                    +
                  </div>
                  <p className="mt-2 font-semibold text-purple-600 text-sm">
                    Add new pet
                  </p>
                </div>
              </div>

              {/* Profile Card */}
              {pets.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-6">
                  {/* Top Banner */}
                  <div className="relative bg-gradient-to-r from-purple-500 to-purple-700 h-32">
                    <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">
                      <img
                        src={
                          pets[0].avatar
                            ? `https://argosmob.com/being-petz/public/${pets[0].avatar}`
                            : "https://placekitten.com/200/200"
                        }
                        alt={pets[0].name}
                        className="w-28 h-28 rounded-full border-4 border-white object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-20 pb-6 text-center px-4">
                    <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                      {pets[0].name}
                      {pets[0].gender === "Male" ? (
                        <img src={maleIcon} alt="Male" className="w-5 h-5" />
                      ) : pets[0].gender === "Female" ? (
                        <img src={femaleIcon} alt="Female" className="w-5 h-5" />
                      ) : null}
                    </h2>
                    <p className="text-gray-500 text-sm">{calculateAge(pets[0].dob)}</p>
                    <div className="flex items-center justify-center gap-3 mt-2 text-sm text-gray-600">
                      <span>🐾 {pets[0].type}</span>
                      <span>🐕 {pets[0].breed}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tabs */}
              <div className="mt-6">
                <div className="flex bg-gray-100 rounded-lg shadow overflow-hidden">
                  {["records", "reminder", "profile"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`flex-1 py-2 font-medium ${
                        activeTab === tab
                          ? "bg-purple-600 text-white"
                          : "text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
            <div className="relative bg-gradient-to-r from-orange-200 via-yellow-100 to-teal-100 rounded-2xl shadow-md overflow-hidden">
        {/* Sponsored Badge */}
        <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
          Sponsored !
        </span>

        {/* Content */}
        <div className="flex items-center p-5 min-h-[200px]">
          {/* Pet Image */}
          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <img
              src="https://png.pngtree.com/png-clipart/20231002/original/pngtree-cute-cartoon-cat-png-image_13060428.png"
              alt="Pet Bed"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text + Button */}
          <div className="ml-5 flex-1 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-bold text-gray-800">PURR-FECT REST!</h3>
              <p className="text-base text-gray-600">
                Luxury Beds for Dreamy Naps
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-4">
              <button className="w-50% bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-2.5 rounded-full font-semibold text-base shadow-md hover:opacity-90 transition">
                Shop Comfort 🐾
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />


      {/* Birthday Card */}
      <div className="relative bg-gradient-to-r from-pink-200 via-pink-100 to-purple-200 rounded-2xl shadow-md overflow-hidden">
        {/* 🎉 Birthday Badge */}
        <button
          onClick={() => setShowList(!showList)}
          className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-3 py-1 rounded-full hover:bg-pink-700 transition"
        >
          🎉 {friends.length} Birthdays
        </button>

        {/* Dropdown Friend List */}
        {showList && (
          <div className="absolute right-2 top-10 bg-white shadow-md rounded-lg w-40 z-10">
            <ul className="divide-y divide-gray-200">
              {friends.map((f) => (
                <li
                  key={f.id}
                  className="px-3 py-2 text-sm text-gray-800 hover:bg-pink-100 cursor-pointer"
                  onClick={() => {
                    setSelectedFriend(f);
                    setShowList(false);
                  }}
                >
                  {f.name} 🎂
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Selected Friend Details */}
        <div className="flex items-center p-5 min-h-[200px]">
          {/* Pet Image */}
          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <img
              src={selectedFriend.image}
              alt={selectedFriend.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text + Button */}
          <div className="ml-5 flex-1 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                🎂 {selectedFriend.name}’s Birthday!
              </h3>
              <p className="text-base text-gray-600">
                Coming up on{" "}
                <span className="font-semibold text-gray-800">{selectedFriend.date}</span>
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-4">
              <button
                onClick={() =>
                  alert(`🎉 You’ve sent wishes to ${selectedFriend.name}! 🐾`)
                }
                className="w-50% bg-gradient-to-r from-pink-500 to-rose-600 text-white px-5 py-2.5 rounded-full font-semibold text-base shadow-md hover:opacity-90 transition"
              >
                Send Wishes 🎁
              </button>
            </div>
          </div>
        </div>
      </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Petprofile;
