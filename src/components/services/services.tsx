import { useState } from "react";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";
import Banner from "../../assets/banner.jpg";
import { Dog, Store, Scissors, Home, User, TreePine, Brain, MapPin } from "lucide-react";
import ServiceDetailsCard from "./ServiceDetailsCard";

const services = [
  { name: "Pet Training", icon: <Dog className="w-8 h-8" /> },
  { name: "Pet Store", icon: <Store className="w-8 h-8" /> },
  { name: "Grooming", icon: <Scissors className="w-8 h-8" /> },
  { name: "Pet Shelter", icon: <Home className="w-8 h-8" /> },
  { name: "Pet Sitting", icon: <User className="w-8 h-8" /> },
  { name: "Pet Walkers", icon: <TreePine className="w-8 h-8" /> },
  { name: "Pet Behaviourists", icon: <Brain className="w-8 h-8" /> },
  { name: "Pet Resort", icon: <Dog className="w-8 h-8" /> },
];

export default function Services() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeModal = () => {
    setSelectedService(null);
    setShowForm(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <Header onMenuClick={toggleSidebar} />

        <div className="p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow">
            <img src={Banner} alt="Cat" className="w-full h-full object-cover" />
          </div>

          <div className="mt-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-purple-700 mb-4 border-b-2 border-purple-500 inline-block">
              Services
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedService(service.name)}
                  className="cursor-pointer bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-xl flex flex-col items-center justify-center p-6 shadow hover:scale-105 transition"
                >
                  <div className="text-purple-700">{service.icon}</div>
                  <p className="mt-2 font-medium text-purple-700">{service.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {!showForm ? (
            <ServiceDetailsCard
              service={selectedService}
              onBook={() => setShowForm(true)}
              onClose={closeModal}
            />
          ) : (
            <div className="bg-white rounded-lg w-[420px] shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="font-bold text-purple-700">{selectedService}</h2>
                <button onClick={closeModal} className="text-gray-500">✖</button>
              </div>
             </div>
          )}

        </div>
        
      )}
      
    </div>
  );
}