import { useState } from "react";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";
import CommunityList from "./CommunityList";
import CreateCommunityForm from "./CreateCommunityForm";
import ChatScreen from "./ChatScreen";
import axios from "axios";
import catIcon from "../../assets/img/cat.jpg";

 function CommunityApp() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [activeChat, setActiveChat] = useState<Community | null>(null);
  const [selectedCommunityDetails, setSelectedCommunityDetails] = useState<Community | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleCreateCommunity = (community: Community) => {
    setCommunities((prev) => [
      { ...community, id: Date.now(), time: "Just now", unread: 0 },
      ...prev,
    ]);
    setShowForm(false);
  };

  // commmunity details 
  const handleSelectCommunity = async (community: Community) => {
    try {
      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/pet/community/details",
        { community_id: community.id }
      );
      const data = res.data?.data;

      if (data) {
        setSelectedCommunityDetails({
          id: data.id,
          name: data.name,
          image: data.profile ? `https://argosmob.com/being-petz/public/${data.profile}` : undefined,
          creator: data.creator ? `${data.creator.first_name} ${data.creator.last_name}` : "Unknown",
          usersCount: data.users_count || 0,
        });
        setActiveChat({
          id: data.id,
          name: data.name,
          message: "", 
          time: "",
          unread: 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch community details", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1 w-full">
        <div className="w-full border-b bg-white shadow-sm">
          <Header onMenuClick={toggleSidebar} />
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!activeChat && (
            <div className="w-full max-w-5xl mx-auto">
              <CommunityList
                communities={communities}
                onCreate={() => setShowForm(true)}
                onSelectCommunity={handleSelectCommunity} // use new handler
              />

              {showForm && (
                <CreateCommunityForm
                  onClose={() => setShowForm(false)}
                  onCreateCommunity={handleCreateCommunity}
                />
              )}
            </div>
          )}

          {activeChat && selectedCommunityDetails && (
            <div className="w-full max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-4">
                <img
                  src={selectedCommunityDetails.image || catIcon}
                  alt={selectedCommunityDetails.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
                />
                <div>
                  <h2 className="text-xl font-bold">{selectedCommunityDetails.name}</h2>
                  <p className="text-sm text-gray-500">
                    Creator: {selectedCommunityDetails.creator} | Members: {selectedCommunityDetails.usersCount}
                  </p>
                </div>
              </div>

              {/* ChatScreen */}
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
export default CommunityApp;
