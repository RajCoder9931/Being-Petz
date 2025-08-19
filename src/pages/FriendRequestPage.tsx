import { useState } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/sidebar";
import Footer from "../components/dashboard/Footer";

import user1 from "../assets/user/01.jpg";
import user2 from "../assets/user/02.jpg";
import user3 from "../assets/user/03.jpg";
const friendRequests = [
  { id: 1, name: "Alice Johnson", mutual: "5 mutual friends", img: user1 },
  { id: 2, name: "David Smith", mutual: "2 mutual friends", img: user2 },
  { id: 3, name: "Emily Carter", mutual: "8 mutual friends", img: user3 },
];

const FriendRequestPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main */}
        <main className="flex-1 bg-gray-100 p-4 sm:p-6 flex justify-center">
          <div className="bg-white shadow rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4 text-center">Friend Requests</h2>
            <ul className="space-y-4">
              {friendRequests.map((req) => (
                <li key={req.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-4">
                    <img src={req.img} alt={req.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="text-gray-800">{req.name}</p>
                      <p className="text-sm text-gray-500">{req.mutual}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
                      Accept
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FriendRequestPage;
