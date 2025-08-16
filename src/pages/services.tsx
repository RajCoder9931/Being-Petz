import { useState } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/sidebar";
import Banner from  "../assets/banner.jpg";
import {
  Dog,
  Store,
  Scissors,
  Home,
  User,
  TreePine,
  Brain,
  MapPin,
} from "lucide-react";

const services = [
  { name: "Pet Training", icon: <Dog className="w-8 h-8" /> },
  { name: "Pet Store", icon: <Store className="w-8 h-8" /> },
  { name: "Grooming", icon: <Scissors className="w-8 h-8" /> },
  { name: "Pet Shelter", icon: <Home className="w-8 h-8" /> },
  { name: "Pet Sitters", icon: <User className="w-8 h-8" /> },
  { name: "Pet Park", icon: <TreePine className="w-8 h-8" /> },
  { name: "Pet Behaviourists", icon: <Brain className="w-8 h-8" /> },
  { name: "Tracking", icon: <MapPin className="w-8 h-8" /> },
];

export default function Services() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Page Content */}
        <div className="p-6 overflow-y-auto">
          {/* Banner */}
          <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow">
            <img
              src={Banner}  // replace with your banner image path
              alt="Cat"
              className="w-full h-52 object-cover"
            />
             
          </div>

          {/* Services Section */}
          <div className="mt-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-purple-700 mb-4 border-b-2 border-purple-500 inline-block">
              Services
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-xl flex flex-col items-center justify-center p-6 shadow hover:scale-105 transition"
                >
                  <div className="text-purple-700">{service.icon}</div>
                  <p className="mt-2 font-medium text-purple-700">
                    {service.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
