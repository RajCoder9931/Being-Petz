// import { useState } from "react";
// import Header from "../dashboard/Header";
// import Sidebar from "../dashboard/sidebar";
// import CommunityList from "./CommunityList";
// import CreateCommunityForm from "./CreateCommunityForm";
// import ChatScreen from "./ChatScreen";

// export interface Community {
//   id: number;
//   name: string;
//   message: string;
//   time: string;
//   unread: number;
//   image?: string;
//   location?: string;
//   category?: string;
// }

// export default function CommunityApp() {
//   const [communities, setCommunities] = useState<Community[]>([
//     {
//       id: 1,
//       name: "Doberman Wing",
//       message: "Let's meet today on green park we can play fetch...",
//       time: "10:30 AM",
//       unread: 3,
//     },
//     {
//       id: 2,
//       name: "Labrador Friends",
//       message: "Anyone for a playdate this weekend? We're planning...",
//       time: "Yesterday",
//       unread: 0,
//     },
//     {
//       id: 3,
//       name: "Persian Cat Club",
//       message: "New grooming tips posted! Check our recommendations...",
//       time: "2 days ago",
//       unread: 1,
//     },
//     {
//       id: 4,
//       name: "Beagle Buddies",
//       message: "Check out the new walking trail in the north park...",
//       time: "3 days ago",
//       unread: 0,
//     },
//   ]);

//   const [showForm, setShowForm] = useState(false);
//   const [activeChat, setActiveChat] = useState<Community | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // ✅ Handle new community creation
//   const handleCreateCommunity = (community: Community) => {
//     setCommunities((prev) => [
//       { ...community, id: Date.now(), time: "Just now", unread: 0 },
//       ...prev, // latest at top
//     ]);
//     setShowForm(false);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Main Area */}
//       <div className="flex flex-col flex-1 w-full">
//         {/* ✅ Header always full width */}
//         <div className="w-full border-b bg-white shadow-sm">
//           <Header onMenuClick={toggleSidebar} />
//         </div>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-4 sm:p-6">
//           {!activeChat && (
//             <div className="w-full max-w-5xl mx-auto">
//               <CommunityList
//                 communities={communities}
//                 onCreate={() => setShowForm(true)}
//                 onSelectCommunity={setActiveChat}
//               />

//               {showForm && (
//                 <CreateCommunityForm
//                   onClose={() => setShowForm(false)}
//                   onCreateCommunity={handleCreateCommunity}
//                 />
//               )}
//             </div>
//           )}

//           {activeChat && (
//             <div className="w-full max-w-4xl mx-auto">
//               <ChatScreen
//                 community={activeChat}
//                 onBack={() => setActiveChat(null)}
//               />
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }
 

// api se fetch 
import { useState, useEffect } from "react";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";
import CommunityList from "./CommunityList";
import CreateCommunityForm from "./CreateCommunityForm";
import ChatScreen from "./ChatScreen";

export interface Community {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
  image?: string;
  location?: string;
  category?: string;
}

export default function CommunityApp() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [activeChat, setActiveChat] = useState<Community | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ✅ Dummy messages (sirf chat list ke liye)
  const dummyMessages: Community[] = [
    {
      id: 1,
      name: "Doberman Wing",
      message: "Let's meet today on green park we can play fetch...",
      time: "10:30 AM",
      unread: 3,
    },
    {
      id: 2,
      name: "Labrador Friends",
      message: "Anyone for a playdate this weekend? We're planning...",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Persian Cat Club",
      message: "New grooming tips posted! Check our recommendations...",
      time: "2 days ago",
      unread: 1,
    },
    {
      id: 4,
      name: "Beagle Buddies",
      message: "Check out the new walking trail in the north park...",
      time: "3 days ago",
      unread: 0,
    },
  ];

  // ✅ Handle new community creation
  const handleCreateCommunity = (community: Community) => {
    setCommunities((prev) => [
      { ...community, id: Date.now(), time: "Just now", unread: 0 },
      ...prev,
    ]);
    setShowForm(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Area */}
      <div className="flex flex-col flex-1 w-full">
        {/* ✅ Header always full width */}
        <div className="w-full border-b bg-white shadow-sm">
          <Header onMenuClick={toggleSidebar} />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!activeChat && (
            <div className="w-full max-w-5xl mx-auto">
              <CommunityList
                communities={dummyMessages} // sirf chat list ke liye
                onCreate={() => setShowForm(true)}
                onSelectCommunity={setActiveChat}
              />

              {showForm && (
                <CreateCommunityForm
                  onClose={() => setShowForm(false)}
                  onCreateCommunity={handleCreateCommunity}
                />
              )}
            </div>
          )}

          {activeChat && (
            <div className="w-full max-w-4xl mx-auto">
              <ChatScreen
                community={activeChat}
                onBack={() => setActiveChat(null)}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
