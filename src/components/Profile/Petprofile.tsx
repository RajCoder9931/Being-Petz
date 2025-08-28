import React, { useState } from "react";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";
import profile from "../../assets/img/petprofile.jpeg";
import genderIcon from "../../assets/img/male.png";
import vaccinationIcon from "../../assets/img/noto_calendar.png";
import friendsIcon from "../../assets/img/Birds.png";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";

const SlideCard = ({ img, title, subtitle, bgColor }: any) => {
  return (
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
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.div
        className="flex-1 w-full p-3 sm:p-4 rounded-lg shadow-md"
        style={{ backgroundColor: bgColor }}
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
        <p className="text-xs sm:text-sm">{subtitle}</p>
      </motion.div>
    </motion.div>
  );
};

const Petprofile: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "records" | "reminder" | "profile"
  >("records");

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Tom",
    dob: "2020-05-15",
    breed: "German Shepherd",
    gender: "Male",
    blood: "DEA 1",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Data:", formData); // later send to API
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Pet Selection Section */}
        <div className="max-w-2xl mx-auto bg-purple-100 p-6 rounded-2xl p-6 mt-6 flex items-center justify-center gap-6 flex-wrap">
          {/* Existing Pets */}
          {[
            { name: "MAX", img: "Pic" },
            { name: "Rocky", img: "Pic" },
            { name: "Pinto", img: "Pic" },
          ].map((pet, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
            >
              <div className="w-20 h-20 rounded-full border-4 border-purple-600 flex items-center justify-center text-purple-600 font-bold text-sm">
                {pet.img}
              </div>
              <p className="mt-2 font-semibold text-purple-600 text-sm">{pet.name}</p>
            </div>
          ))}

          {/* Add New Pet */}
          <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition">
            <div className="w-20 h-20 rounded-full border-4 border-purple-600 flex items-center justify-center text-purple-600 text-3xl">
              +
            </div>
            <p className="mt-2 font-semibold text-purple-600 text-sm">Add new pet</p>
          </div>
        </div>



        {/* Profile Card */}
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
                src={profile}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 pb-6 text-center px-4">
            {/* Name & Gender */}
            <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
              Luna
              <img
                src={genderIcon}
                alt="Male"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">2 Year Old</p>

            {/* Breed & Weight */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-gray-600">
              <span>🐕 German Shepherd</span>
              <span>⚖ 4.5 Kilograms</span>
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
            <div className="mt-4 sm:mt-6">
              {activeTab === "profile" && (
                <div className="bg-pink-100 p-3 sm:p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h2 className="text-base sm:text-lg font-bold">
                      Pet Details
                    </h2>
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
                            setFormData({
                              ...formData,
                              gender: e.target.value,
                            })
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

              {/* Reminder tab */}
              {activeTab === "reminder" && (
                <div className="bg-pink-100 p-3 sm:p-4 rounded-lg shadow">
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

              {/* Records tab */}
              {activeTab === "records" && (
                <div className="bg-pink-100 p-3 sm:p-4 rounded-lg">
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
                        <div className="flex-1 p-3 sm:p-4 rounded-lg shadow-md bg-pink-200 w-full sm:w-auto">
                          <h4 className="text-xs text-gray-600">
                            Core Vaccines
                          </h4>
                          <p className="font-bold">DA2PP</p>
                          <p className="text-xs text-gray-600">6-8 Weeks</p>
                        </div>
                      </div>

                      {/* Card 2 */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 p-3 sm:p-4 rounded-lg shadow-md bg-blue-100">
                          <h4 className="text-xs text-gray-600">
                            Lifestyle Vaccine
                          </h4>
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
                      <button className="bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-purple-700 transition">
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
    </div>
  );
};

export default Petprofile;

