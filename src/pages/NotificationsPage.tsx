import { useState } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/sidebar";
import Footer from "../components/dashboard/Footer";
import user1 from "../assets/user/01.jpg";
import user2 from "../assets/user/02.jpg";
import user3 from "../assets/user/03.jpg";

const notifications = [
  { id: 1, name: "Paige Turner posted in UI/UX Community", time: "30s ago", img: user1 },
  { id: 2, name: "Anne Fibbyon liked your post", time: "15s ago", img: user2 },
  { id: 3, name: "Barry Cuda added a story", time: "40s ago", img: user3 },
];

const NotificationsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col pt-12">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main */}
        <main className="flex-1 bg-gray-100 p-4 sm:p-6 flex justify-center">
          <div className="bg-white shadow rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4 text-center">Notifications</h2>
            <ul className="space-y-4">
              {notifications.map((n) => (
                <li key={n.id} className="flex items-center gap-4 border-b pb-3">
                  <img src={n.img} alt={n.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-gray-800">{n.name}</p>
                    <p className="text-sm text-gray-500">{n.time}</p>
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

export default NotificationsPage;
