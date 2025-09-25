import { useState, useEffect } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/sidebar";
import CommunityList from "../components/community/CommunityList";
import CreateCommunityForm from "../components/community/CreateCommunityForm";
import ChatScreen from "../components/community/ChatScreen";
import SuggestedCommunities from "../components/community/SuggestedCommunities";
import axios from "axios";
import catIcon from "../assets/img/cat.jpg";

// Define Community type
type Community = {
  id: number;
  name: string;
  image?: string;
  creator?: string;
  usersCount?: number;
  message?: string;
  time?: string;
  unread?: number;
  is_member?: boolean;
};

function CommunityApp() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [suggestedCommunities, setSuggestedCommunities] = useState<Community[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [activeChat, setActiveChat] = useState<Community | null>(null);
  const [selectedCommunityDetails, setSelectedCommunityDetails] = useState<Community | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch communities from API
  const fetchCommunities = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://argosmob.uk/being-petz/public/api/v1/pet/community/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.data) {
        const allCommunities = response.data.data;

        // Separate communities user is member of and suggested communities
        const userCommunities = allCommunities.filter((comm: Community) => comm.is_member);
        const suggested = allCommunities.filter((comm: Community) => !comm.is_member);

        setCommunities(userCommunities);
        setSuggestedCommunities(suggested);
      }
    } catch (error) {
      console.error("Failed to fetch communities", error);
    }
  };

  // Join community function
  const handleJoinCommunity = async (communityId: number) => {
    try {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const userId = userData.id;

      await axios.post(
        "https://argosmob.uk/being-petz/public/api/v1/pet/community/join",
        {
          user_id: userId,
          community_id: communityId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh communities after joining
      fetchCommunities();
    } catch (error) {
      console.error("Failed to join community", error);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleCreateCommunity = (community: Community) => {
    setCommunities((prev) => [
      { ...community, id: Date.now(), time: "Just now", unread: 0, is_member: true },
      ...prev,
    ]);
    setShowForm(false);
  };

  const handleSelectCommunity = async (community: Community) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://argosmob.uk/being-petz/public/api/v1/pet/community/details",
        { community_id: community.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data?.data;

      if (data) {
        setSelectedCommunityDetails({
          id: data.id,
          name: data.name,
          image: data.profile ? `https://argosmob.uk/being-petz/public/${data.profile}` : undefined,
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
    <div className="flex h-screen bg-gray-100 overflow-hidden pt-12">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 w-full">
        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <div className="w-full border-b bg-white shadow-sm">
            <Header onMenuClick={toggleSidebar} />
          </div>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            {!activeChat ? (
              <div className="w-full max-w-4xl mx-auto">
                {/* Communities List */}
                <CommunityList
                  communities={communities}
                  onCreate={() => setShowForm(true)}
                  onSelectCommunity={handleSelectCommunity}
                  title="MY COMMUNITIES"
                />

                {/* Instagram-style Horizontal Scroll */}
                {communities.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-3">Joined Communities</h2>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {communities.map((comm) => (
                        <div
                          key={comm.id}
                          className="flex-shrink-0 w-20 text-center cursor-pointer"
                          onClick={() => handleSelectCommunity(comm)}
                        >
                          {/* Profile Image */}
                          <div className="w-16 h-16 mx-auto rounded-full border-2 border-purple-500 overflow-hidden">
                            <img
                              src={comm.image || catIcon}
                              alt={comm.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Community Name */}
                          <p className="mt-1 text-xs text-gray-700 truncate">{comm.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chats Section */}
                {communities.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-3">Chats</h2>
                    <div className="bg-white rounded-xl shadow divide-y">
                      {communities.map((comm) => (
                        <div
                          key={comm.id}
                          className="flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-50 transition"
                          onClick={() => handleSelectCommunity(comm)}
                        >
                          {/* Community Image */}
                          <img
                            src={comm.image || catIcon}
                            alt={comm.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                          />

                          {/* Chat Info */}
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{comm.name}</p>
                            <p className="text-sm text-gray-500 truncate">
                              {comm.message || "No messages yet..."}
                            </p>
                          </div>

                          {/* Time + Unread */}
                          <div className="text-right">
                            <p className="text-xs text-gray-400">{comm.time || ""}</p>
                            {comm.unread && comm.unread > 0 && (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-600 text-white text-xs">
                                {comm.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Create Community Form */}
                {showForm && (
                  <CreateCommunityForm
                    onClose={() => setShowForm(false)}
                    onCreateCommunity={handleCreateCommunity}
                  />
                )}
              </div>
            ) : (
              <div className="w-full max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-4">
                  <img
                    src={selectedCommunityDetails?.image || catIcon}
                    alt={selectedCommunityDetails?.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{selectedCommunityDetails?.name}</h2>
                    <p className="text-sm text-gray-500">
                      Creator: {selectedCommunityDetails?.creator} | Members:{" "}
                      {selectedCommunityDetails?.usersCount}
                    </p>
                  </div>
                </div>

                <ChatScreen
                  community={activeChat}
                  onBack={() => setActiveChat(null)}
                />
              </div>
            )}
          </main>
        </div>

        {/* Suggested Communities Sidebar */}
        <div className="hidden lg:block w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6">
            <SuggestedCommunities
              communities={suggestedCommunities}
              onJoinCommunity={handleJoinCommunity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityApp;
