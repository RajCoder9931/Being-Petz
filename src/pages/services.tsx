// import { useState } from "react";
// import Header from "../components/dashboard/Header";
// import Sidebar from "../components/dashboard/sidebar";
// import Banner from  "../assets/banner.jpg";
// import {
//   Dog,
//   Store,
//   Scissors,
//   Home,
//   User,
//   TreePine,
//   Brain,
//   MapPin,
// } from "lucide-react";

// const services = [
//   { name: "Pet Training", icon: <Dog className="w-8 h-8" /> },
//   { name: "Pet Store", icon: <Store className="w-8 h-8" /> },
//   { name: "Grooming", icon: <Scissors className="w-8 h-8" /> },
//   { name: "Pet Shelter", icon: <Home className="w-8 h-8" /> },
//   { name: "Pet Sitters", icon: <User className="w-8 h-8" /> },
//   { name: "Pet Park", icon: <TreePine className="w-8 h-8" /> },
//   { name: "Pet Behaviourists", icon: <Brain className="w-8 h-8" /> },
//   { name: "Tracking", icon: <MapPin className="w-8 h-8" /> },
// ];

// export default function Services() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Main content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <Header onMenuClick={toggleSidebar} />

//         {/* Page Content */}
//         <div className="p-6 overflow-y-auto">
//           {/* Banner */}
//           <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow">
//             <img
//               src={Banner}  // replace with your banner image path
//               alt="Cat"
//               className="w-full h-52 object-cover"
//             />
             
//           </div>

//           {/* Services Section */}
//           <div className="mt-10 max-w-4xl mx-auto">
//             <h3 className="text-xl font-semibold text-purple-700 mb-4 border-b-2 border-purple-500 inline-block">
//               Services
//             </h3>

//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {services.map((service, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-xl flex flex-col items-center justify-center p-6 shadow hover:scale-105 transition"
//                 >
//                   <div className="text-purple-700">{service.icon}</div>
//                   <p className="mt-2 font-medium text-purple-700">
//                     {service.name}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/sidebar";
import Banner from "../assets/banner.jpg";
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

// ✅ Service specific forms
const ServiceForms = ({ service, onClose }: { service: string; onClose: () => void }) => {
  switch (service) {
    case "Tracking":
      return (
        <div className="p-6 space-y-3">
          <label className="block">Tracking Device ID</label>
          <input type="text" placeholder="Enter tracking device ID" className="w-full border p-2 rounded" />
          <label className="block">Pet Name</label>
          <input type="text" placeholder="Enter pet name" className="w-full border p-2 rounded" />
          <label className="flex items-center space-x-2">
            <input type="checkbox" /> <span>This is an emergency (pet is lost)</span>
          </label>
          <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
            Track My Pet
          </button>
        </div>
      );

    case "Pet Behaviourists":
      return (
        <div className="p-6 space-y-3">
          <label>Pet Type</label>
          <select className="w-full border p-2 rounded">
            <option>Select pet type</option>
          </select>
          <label>Behavioral Issue</label>
          <select className="w-full border p-2 rounded">
            <option>Select issue</option>
          </select>
          <textarea placeholder="Describe the issue" className="w-full border p-2 rounded"></textarea>
          <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
            Request Consultation
          </button>
        </div>
      );

    case "Pet Park":
      return (
        <div className="p-6 space-y-3">
          <label>Location</label>
          <select className="w-full border p-2 rounded">
            <option>Select location</option>
          </select>
          <label>Pet Type</label>
          <select className="w-full border p-2 rounded">
            <option>Select pet type</option>
          </select>
          <label>Visit Date</label>
          <input type="date" className="w-full border p-2 rounded" />
          <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
            Check Park Availability
          </button>
        </div>
      );

    case "Pet Sitters":
      return (
        <div className="p-6 space-y-3">
          <label>Pet Type</label>
          <select className="w-full border p-2 rounded">
            <option>Select pet type</option>
          </select>
          <label>Service Needed</label>
          <select className="w-full border p-2 rounded">
            <option>Select service</option>
          </select>
          <label>Dates Needed</label>
          <input type="date" className="w-full border p-2 rounded" />
          <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
            Find Pet Sitters
          </button>
        </div>
      );

    case "Pet Shelter":
      return (
        <div className="p-6 space-y-3">
          <label className="block">I want to:</label>
          <div className="flex space-x-4">
            <label><input type="radio" name="shelter" /> Adopt a pet</label>
            <label><input type="radio" name="shelter" /> Foster a pet</label>
            <label><input type="radio" name="shelter" /> Volunteer</label>
          </div>
          <label>Pet Type</label>
          <select className="w-full border p-2 rounded">
            <option>Any</option>
          </select>
          <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
            Continue
          </button>
        </div>
      );

    case "Grooming":
      return (
        <div className="p-6 space-y-3">
          <label>Pet Type</label>
          <select className="w-full border p-2 rounded">
            <option>Select pet type</option>
          </select>
          <label>Service</label>
          <select className="w-full border p-2 rounded">
            <option>Select service</option>
          </select>
          <label>Preferred Date & Time</label>
          <input type="datetime-local" className="w-full border p-2 rounded" />
          <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
            Book Grooming
          </button>
        </div>
      );

    case "Pet Store":
      return (
        <div className="p-6 space-y-3">
          <label>Category</label>
          <select className="w-full border p-2 rounded">
            <option>Select category</option>
          </select>
          <label>Search Products</label>
          <input type="text" placeholder="What are you looking for?" className="w-full border p-2 rounded" />
          <label className="flex items-center space-x-2">
            <input type="checkbox" /> <span>I need delivery</span>
          </label>
          <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
            Browse Store
          </button>
        </div>
      );

    case "Pet Training":
      return (
        <div className="p-6 space-y-3">
          <label>Pet Type</label>
          <select className="w-full border p-2 rounded">
            <option>Select pet type</option>
          </select>
          <label>Training Type</label>
          <select className="w-full border p-2 rounded">
            <option>Select training type</option>
          </select>
          <label>Preferred Date</label>
          <input type="date" className="w-full border p-2 rounded" />
          <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
            Request Training Session
          </button>
        </div>
      );

    default:
      return null;
  }
};

export default function Services() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeModal = () => setSelectedService(null);

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
            <img src={Banner} alt="Cat" className="w-full h-52 object-cover" />
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

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-[420px] shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold text-purple-700">{selectedService}</h2>
              <button onClick={closeModal} className="text-gray-500">✖</button>
            </div>
            <ServiceForms service={selectedService} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}


