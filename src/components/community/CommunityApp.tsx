import  { useState } from "react";
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
}

const communities: Community[] = [
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

export default function CommunityApp() {
  const [showForm, setShowForm] = useState(false);
  const [activeChat, setActiveChat] = useState<Community | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {!activeChat && (
            <>
              <CommunityList
                communities={communities}
                onCreate={() => setShowForm(true)}
                onSelectCommunity={setActiveChat}
              />
              {showForm && (
                <CreateCommunityForm onClose={() => setShowForm(false)} />
              )}
            </>
          )}

          {activeChat && (
            <ChatScreen
              community={activeChat}
              onBack={() => setActiveChat(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
