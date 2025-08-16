import { useState } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/sidebar";
import Footer from "../components/dashboard/Footer";  
import petImg from "../assets/img/petprofile.jpeg";
import ownerImg from "../assets/img/profile.jpeg";
import { MapPin, Calendar, Trash2  } from "lucide-react";

function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Profile Section */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl">
            {/* Pet Info */}
            <div className="flex items-center space-x-4">
              <img
                src={petImg}
                alt="Pet"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">Tom</h2>
                <p className="text-gray-600">987740 22541 <span className="text-purple-600 cursor-pointer">Change</span></p>
              </div>
              <div className="ml-auto">
                <button className="text-purple-600 font-medium hover:underline">Edit</button>
              </div>
            </div>

            {/* Pet Details */}
            <div className="mt-6 space-y-3">
              <h3 className="text-lg font-semibold">Pet Details</h3>
              <div className="flex items-center text-gray-700">
                <span className="mr-2">♂</span> Male, German Shepperd
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-2" /> Rohini sec-21, New Delhi 110086
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-2" /> 10 Oct 2023
              </div>
            </div>

            {/* Owner Info */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Owner</h3>
              <div className="flex items-center mt-2 space-x-3">
                <img
                  src={ownerImg}
                  alt="Owner"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">Esther Howard</p>
                  <p className="text-gray-600 text-sm">esther.howard@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="mt-6 space-y-2 text-gray-700">
              <p>Terms and Conditions</p>
              <p>Read it carefully</p>
              <div className="flex items-center justify-between">
                <span>Delete Your Profile</span>
                <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" />
              </div>
            </div>

            {/* Sign Out */}
            <div className="mt-6">
              <button className="flex items-center text-red-500 font-semibold">
                <span className="mr-2">↪</span> Signout your Profile
              </button>
            </div>
          </div>
        </div>

        {/* Footer ✅ */}
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
