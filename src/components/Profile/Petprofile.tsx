import React, { useState } from "react";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";
import profile from "../../assets/img/petprofile.jpeg";
import genderIcon from "../../assets/img/male.png";
import vaccinationIcon from "../../assets/img/noto_calendar.png";
import friendsIcon from "../../assets/img/Birds.png";
import  {motion} from "framer-motion";
const SlideCard = ({ img, title, subtitle, bgColor }: any) => {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.img
        src={img}
        alt={title}
        className="w-40 h-40 rounded-lg object-cover shadow-md"
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.div
        className="flex-1 p-4 rounded-lg shadow-md"
        style={{ backgroundColor: bgColor }}
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm">{subtitle}</p>
      </motion.div>
    </motion.div>
  );
};
const Petprofile: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"records" | "reminder" | "profile">("records");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Profile Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-6">
          {/* Top Banner */}
          <div className="relative bg-gradient-to-r from-purple-500 to-purple-700 h-32">
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
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 pb-6 text-center px-4">
            {/* Name & Gender */}
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              Tom
              <img src={genderIcon} alt="Male" className="w-5 h-5" />
            </h2>
            <p className="text-gray-500 text-sm">2 Year 3 months Old</p>

            {/* Breed & Weight */}
            <div className="flex items-center justify-center gap-3 mt-2 text-sm text-gray-600">
              <span>🐕 German Shepperd</span>
              <span>⚖ 4.5 Kilograms</span>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {/* Meals */}
              <div className="flex flex-col items-center rounded-lg p-3 transition-colors hover:bg-purple-50 cursor-pointer">
                <div className="relative w-12 h-12">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-purple-500"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="25, 100"
                      fill="none"
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm">
                    1/4
                  </span>
                </div>
                <p className="mt-2 font-bold text-purple-600">Meals</p>
              </div>

              {/* Vaccination */}
              <div className="flex flex-col items-center rounded-lg p-3 transition-colors hover:bg-purple-50 cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100">
                  <img
                    src={vaccinationIcon}
                    alt="Vaccination"
                    className="w-6 h-6"
                  />
                </div>
                <p className="mt-1 text-lg font-bold">25</p>
                <p className="text-purple-600 font-bold text-sm">
                  Vaccination Period
                </p>
              </div>

              {/* Friends */}
              <div className="flex flex-col items-center rounded-lg p-3 transition-colors hover:bg-purple-50 cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100">
                  <img src={friendsIcon} alt="Friends" className="w-6 h-6" />
                </div>
                <p className="mt-1 text-lg font-bold">150</p>
                <p className="text-purple-600 font-bold text-sm">Friends</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Content */}
        <div className="p-6">
          <div className="max-w-2xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-lg shadow">
              {["records", "reminder", "profile"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`flex-1 py-3 font-medium rounded-lg transition-colors duration-200 ${
                    activeTab === tab
                      ? "bg-purple-600 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="mt-6">
              {activeTab === "profile" && (
                <div className="bg-pink-100 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-bold mb-4">Pet Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-yellow-100 p-3 rounded-lg shadow">
                      <strong>Name of Pet:</strong> Tom
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-lg shadow">
                      <strong>Date of Birth:</strong> 15th May 2020
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-lg shadow">
                      <strong>Breed:</strong> German Shepard
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg shadow">
                      <strong>Gender:</strong> Male
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg shadow col-span-2">
                      <strong>Blood Group:</strong> DEA 1
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reminder" && (
                <div className="bg-pink-100 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-bold mb-4">Daily Reminders</h2>
                  <div className="flex gap-4 text-center">
                    {/* Vaccination */}
                    <div className="bg-yellow-100 p-4 rounded-lg shadow flex-1">
                      <i className="fas fa-syringe fa-2x text-yellow-500 mb-2"></i>
                      <div className="font-semibold">Next Vaccination</div>
                      <div className="text-sm">15th March 2025</div>
                    </div>

                    {/* Deworming */}
                    <div className="bg-green-100 p-4 rounded-lg shadow flex-1">
                      <i className="fas fa-bug fa-2x text-green-500 mb-2"></i>
                      <div className="font-semibold">Next Deworming</div>
                      <div className="text-sm">25th March 2025</div>
                    </div>

                    {/* Grooming */}
                    <div className="bg-blue-100 p-4 rounded-lg shadow flex-1">
                      <i className="fas fa-cut fa-2x text-blue-500 mb-2"></i>
                      <div className="font-semibold">Grooming</div>
                      <div className="text-sm">25th March 2025</div>
                    </div>
                  </div>

                  {/* Create Reminder Button */}
                  <div className="flex justify-center mt-4">
                    <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
                      Create Reminder
                    </button>
                  </div>
                </div>
              )}

{activeTab === "records" && (
                <div className="bg-pink-100 p-4 rounded-lg">
                  <div className=" rounded-xl  p-6 w-full space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold">Vaccinations for Tom</h2>
                      <a href="#" className="text-sm text-purple-600 font-semibold">
                        View all
                      </a>
                    </div>

                    {/* Vaccination Row */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Card 1 */}
                      <div className="flex items-center gap-3">
                        <img
                          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRrC1rq3ygbSkznyi0q00NyfTnBFn7XQFPFAl9WnaRKjvU1b9Zx"
                          alt="Core Vaccine"
                          className="w-40 h-40 rounded-lg object-cover shadow-md"
                        />
                        <div className="flex-1 p-4 rounded-lg shadow-md bg-pink-200">
                          <h4 className="text-xs text-gray-600">Core Vaccines</h4>
                          <p className="font-bold">DA2PP</p>
                          <p className="text-xs text-gray-600">6-8 Weeks</p>
                        </div>
                      </div>

                      {/* Card 2 */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 p-4 rounded-lg shadow-md bg-blue-100">
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
                      <button className="bg-purple-600 text-white px-6 py-2 rounded-full shadow-md">
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


