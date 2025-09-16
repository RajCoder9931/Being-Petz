import React, { useState, useEffect } from "react";
import axios from "axios";
import vaccinationIcon from "../../assets/img/noto_calendar.png";
import friendsIcon from "../../assets/img/Birds.png";
import femaleIcon from "../../assets/img/female.png";
import maleIcon from "../../assets/img/male.png";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  

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

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Luna",
    dob: "2020-05-15",
    breed: "German Shepherd",
    gender: "Male",
    blood: "DEA 1",
  });




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


  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Data:", formData);
  };

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
      {/*   Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {/*  Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Page Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-8xl mx-auto">

            {/* Left Column */}
            <div className="space-y-4 pr-4 md:pr-6 lg:pr-8 h-fit">
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
            <div className="overflow-y-auto    md:-ml-6  ">
              {/* Pet Selection */}
              <div className="bg-purple-100 p-8 w-450px rounded-2xl flex items-center justify-center gap-6 flex-wrap">
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
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-6 w-full">
                  {/* Top Banner */}
                  <div className="relative bg-gradient-to-r from-purple-500 to-purple-700 h-32 sm:h-40">
                    <svg
                      className="absolute bottom-0 left-0 w-full"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1440 320"
                    >
                      <path
                        fill="rgba(255,255,255,0.1)"
                        d="M0,64L1440,160L1440,0L0,0Z"
                      ></path>
                    </svg>

                    {/* Profile Image */}
                    <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">
                      <img
                        src={
                          pets[0].avatar
                            ? `https://argosmob.com/being-petz/public/${pets[0].avatar}`
                            : "https://placekitten.com/200/200"
                        }
                        alt={pets[0].name}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-20 pb-6 text-center px-4">
                    {/* Name & Gender */}
                    <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
                      {pets[0].name}
                      {pets[0].gender === "Male" ? (
                        <img
                          src={maleIcon}
                          alt="Male"
                          className="w-4 h-4 sm:w-5 sm:h-5 inline-block"
                        />
                      ) : pets[0].gender === "Female" ? (
                        <img
                          src={femaleIcon}
                          alt="Female"
                          className="w-4 h-4 sm:w-5 sm:h-5 inline-block"
                        />
                      ) : null}
                    </h2>

                    {/*  Age from DOB */}
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {calculateAge(pets[0].dob)}
                    </p>

                    {/* Type & Breed */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-gray-600">
                      <span>🐾 {pets[0].type}</span>
                      <span>🐕 {pets[0].breed}</span>
                    </div>
                    {/* Stats */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {/* Meals */}
                      <div className="flex flex-col items-center rounded-lg p-2 sm:p-3 hover:bg-purple-50 cursor-pointer">
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                          <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 36 36"
                          >
                            <path
                              className="text-gray-200"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-purple-500"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeDasharray="25, 100"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm">
                            1/4
                          </span>
                        </div>
                        <p className="mt-2 font-bold text-xs sm:text-sm text-purple-600">
                          Meals
                        </p>
                      </div>

                      {/* Vaccination */}
                      <div className="flex flex-col items-center rounded-lg p-2 sm:p-3 hover:bg-purple-50 cursor-pointer">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-purple-100">
                          <img
                            src={vaccinationIcon}
                            alt="Vaccination"
                            className="w-5 h-5 sm:w-6 sm:h-6"
                          />
                        </div>
                        <p className="mt-1 text-base sm:text-lg font-bold">25</p>
                        <p className="text-purple-600 font-bold text-xs sm:text-sm">
                          Vaccination Period
                        </p>
                      </div>

                      {/* Friends */}
                      <div className="flex flex-col items-center rounded-lg p-2 sm:p-3 hover:bg-purple-50 cursor-pointer">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-purple-100">
                          <img
                            src={friendsIcon}
                            alt="Friends"
                            className="w-5 h-5 sm:w-6 sm:h-6"
                          />
                        </div>
                        <p className="mt-1 text-base sm:text-lg font-bold">150</p>
                        <p className="text-purple-600 font-bold text-xs sm:text-sm">
                          Friends
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              )}

              {/* Tabs & Content */}
              <div className="p-4 sm:p-6">
                <div className="max-w-2xl mx-auto">
                  {/* Tab Navigation */}
                  <div className="flex flex-col sm:flex-row bg-gray-100 rounded-lg shadow overflow-hidden">
                    {["records", "reminder", "profile"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors duration-200 ${activeTab === tab
                          ? "bg-purple-600 text-white"
                          : "text-gray-600 hover:bg-gray-200"
                          }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="mt-4 sm:mt-6 w-full max-w-4xl mx-auto">
                    {/* Profile Tab */}
                    {activeTab === "profile" && (
                      <div className="bg-pink-100 p-3 sm:p-4 rounded-lg shadow w-full">
                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                          <h2 className="text-base sm:text-lg font-bold">Pet Details</h2>
                          {!isEditing ? (
                            <button
                              onClick={() => setIsEditing(true)}
                              className="px-3 py-1 "
                            >
                              <FaEdit />
                            </button>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={handleSave}
                                className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setIsEditing(false)}
                                className="px-3 py-1 bg-gray-400 text-white rounded-lg text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {isEditing ? (
                            <>
                              <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({ ...formData, name: e.target.value })
                                }
                                className="bg-white p-2 rounded-lg shadow text-sm sm:text-base w-full"
                                placeholder="Name of Pet"
                              />
                              <input
                                type="date"
                                value={formData.dob}
                                onChange={(e) =>
                                  setFormData({ ...formData, dob: e.target.value })
                                }
                                className="bg-white p-2 rounded-lg shadow text-sm sm:text-base w-full"
                              />
                              <input
                                type="text"
                                value={formData.breed}
                                onChange={(e) =>
                                  setFormData({ ...formData, breed: e.target.value })
                                }
                                className="bg-white p-2 rounded-lg shadow text-sm sm:text-base w-full"
                                placeholder="Breed"
                              />
                              <select
                                value={formData.gender}
                                onChange={(e) =>
                                  setFormData({ ...formData, gender: e.target.value })
                                }
                                className="bg-white p-2 rounded-lg shadow text-sm sm:text-base w-full"
                              >
                                <option>Male</option>
                                <option>Female</option>
                              </select>
                              <input
                                type="text"
                                value={formData.blood}
                                onChange={(e) =>
                                  setFormData({ ...formData, blood: e.target.value })
                                }
                                className="bg-white p-2 rounded-lg shadow text-sm sm:text-base w-full sm:col-span-2"
                                placeholder="Blood Group"
                              />
                            </>
                          ) : (
                            <>
                              <div className="bg-yellow-100 p-2 sm:p-3 rounded-lg shadow text-sm sm:text-base">
                                <strong>Name of Pet:</strong> {formData.name}
                              </div>
                              <div className="bg-yellow-100 p-2 sm:p-3 rounded-lg shadow text-sm sm:text-base">
                                <strong>Date of Birth:</strong> {formData.dob}
                              </div>
                              <div className="bg-yellow-100 p-2 sm:p-3 rounded-lg shadow text-sm sm:text-base">
                                <strong>Breed:</strong> {formData.breed}
                              </div>
                              <div className="bg-green-100 p-2 sm:p-3 rounded-lg shadow text-sm sm:text-base">
                                <strong>Gender:</strong> {formData.gender}
                              </div>
                              <div className="bg-green-100 p-2 sm:p-3 rounded-lg shadow text-sm sm:text-base sm:col-span-2">
                                <strong>Blood Group:</strong> {formData.blood}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Reminder Tab */}
                    {activeTab === "reminder" && (
                      <div className="bg-pink-100 p-3 sm:p-4 rounded-lg shadow w-full">
                        <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
                          Daily Reminders
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-center">
                          {/* Vaccination */}
                          <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg shadow flex-1">
                            <i className="fas fa-syringe fa-lg sm:fa-2x text-yellow-500 mb-2"></i>
                            <div className="font-semibold">Next Vaccination</div>
                            <div className="text-xs sm:text-sm">15th March 2025</div>
                          </div>

                          {/* Deworming */}
                          <div className="bg-green-100 p-3 sm:p-4 rounded-lg shadow flex-1">
                            <i className="fas fa-bug fa-lg sm:fa-2x text-green-500 mb-2"></i>
                            <div className="font-semibold">Next Deworming</div>
                            <div className="text-xs sm:text-sm">25th March 2025</div>
                          </div>

                          {/* Grooming */}
                          <div className="bg-blue-100 p-3 sm:p-4 rounded-lg shadow flex-1">
                            <i className="fas fa-cut fa-lg sm:fa-2x text-blue-500 mb-2"></i>
                            <div className="font-semibold">Grooming</div>
                            <div className="text-xs sm:text-sm">25th March 2025</div>
                          </div>
                        </div>

                        {/* Create Reminder Button */}
                        <div className="flex justify-center mt-4">
                          <button className="px-3 sm:px-4 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition text-sm sm:text-base">
                            Create Reminder
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Records Tab */}
                    {activeTab === "records" && (
                      <div className="bg-pink-100 p-3 sm:p-4 rounded-lg w-full">
                        <div className="rounded-xl p-4 sm:p-6 w-full space-y-4 sm:space-y-6">
                          {/* Header */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <h2 className="text-base sm:text-lg font-bold">
                              Vaccinations for Tom
                            </h2>
                            <a
                              href="#"
                              className="text-xs sm:text-sm text-purple-600 font-semibold"
                            >
                              View all
                            </a>
                          </div>

                          {/* Vaccination Row */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Card 1 */}
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                              <img
                                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRrC1rq3ygbSkznyi0q00NyfTnBFn7XQFPFAl9WnaRKjvU1b9Zx"
                                alt="Core Vaccine"
                                className="w-full sm:w-40 h-40 rounded-lg object-cover shadow-md"
                              />
                              <div className="flex-2 p-5 sm:p-4 rounded-lg shadow-md bg-pink-200 w-full sm:w-auto">
                                <h4 className="text-xs text-gray-600">Core Vaccines</h4>
                                <p className="font-bold">DA2PP</p>
                                <p className="text-xs text-gray-600">6-8 Weeks</p>
                              </div>
                            </div>

                            {/* Card 2 */}
                            <div className="flex items-center gap-3">
                              <div className="flex-1 p-3 sm:p-4 rounded-lg shadow-md bg-blue-100">
                                <h4 className="text-xs text-gray-600">Lifestyle Vaccine</h4>
                                <p className="font-bold text-purple-600">Bordetella</p>
                                <p className="text-xs text-gray-600">6-8 Weeks</p>
                              </div>
                            </div>
                          </div>

                          {/* Deworming */}
                          <SlideCard
                            img="https://placedog.net/200/200"
                            title="Deworming"
                            subtitle="Flea Control (Once in a month)"
                            bgColor="#FFF59D"
                          />

                          {/* Grooming */}
                          <SlideCard
                            img="https://placebear.com/200/200"
                            title="Grooming"
                            subtitle="Flea Control (Once in a month)"
                            bgColor="#B2DFDB"
                          />

                          {/* Weight */}
                          <SlideCard
                            img="https://placedog.net/201/200"
                            title="Weight"
                            subtitle="10 Kilograms (Check Every Month)"
                            bgColor="#BBDEFB"
                          />

                          {/* Button */}
                          <div className="text-center">
                            <button
                              onClick={() => navigate("/managerecord")}
                              className="bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-purple-700 transition"
                            >
                              Manage Records
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4   md:ml-6 h-fit  ">
              {/* Sponsored Card */}
              <div className="relative bg-gradient-to-r from-orange-200 via-yellow-100 to-teal-100 rounded-2xl shadow-md overflow-hidden">
                {/* Sponsored Badge */}
                <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
                  Sponsored !
                </span>

                <div className="flex items-center p-5 min-h-[200px]">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src="https://png.pngtree.com/png-clipart/20231002/original/pngtree-cute-cartoon-cat-png-image_13060428.png"
                      alt="Pet Bed"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-5 flex-1 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">PURR-FECT REST!</h3>
                      <p className="text-base text-gray-600">
                        Luxury Beds for Dreamy Naps
                      </p>
                    </div>

                    <div className="mt-4">
                      <button className="w-50% bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-2.5 rounded-full font-semibold text-base shadow-md hover:opacity-90 transition">
                        Shop Comfort 🐾
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Birthday Card */}
              <div className="relative bg-gradient-to-r from-pink-200 via-pink-100 to-purple-200 rounded-2xl shadow-md overflow-hidden">
                <button
                  onClick={() => setShowList(!showList)}
                  className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-3 py-1 rounded-full hover:bg-pink-700 transition"
                >
                  🎉 {friends.length} Birthdays
                </button>

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

                <div className="flex items-center p-5 min-h-[200px]">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={selectedFriend.image}
                      alt={selectedFriend.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

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


