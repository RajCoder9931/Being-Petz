import React, { useState } from "react";
import { Menu, Bell, UserCircle, Search, Home, MessageSquare, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import logo from "../../assets/img/logo.png";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const navigate = useNavigate();

  const togglePanel = (panel: string) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  return (
    <header className="flex items-center justify-between bg-[#8337B2] text-white px-4 py-3 shadow-md relative">
      {/* LEFT SECTION - Logo + Toggle + Search */}
      <div className="flex items-center gap-3 flex-1">
        <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />

        <button
          onClick={onMenuClick}
          className="p-2 rounded hover:bg-[#6e2e96] transition-colors"
        >
          <Menu size={22} />
        </button>

        <div className="hidden md:flex items-center bg-[#6e2e96] rounded px-2 py-1 ml-4 w-full max-w-sm">
          <Search size={18} className="text-gray-200" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none px-2 text-white w-full placeholder-gray-300"
          />
        </div>
      </div>

      {/* RIGHT SECTION - Icons + Profile */}
      <div className="flex items-center gap-4 relative">
        {/* Home - Navigate */}
        <button
          className="p-2 rounded hover:bg-[#6e2e96] transition-colors"
          onClick={() => navigate("/")}
        >
          <Home size={20} />
        </button>

        {/* Messages */}
        <button
          className="p-2 rounded hover:bg-[#6e2e96] transition-colors"
          onClick={() => togglePanel("messages")}
        >
          <MessageSquare size={20} />
        </button>

        {/* Users */}
        <button
          className="p-2 rounded hover:bg-[#6e2e96] transition-colors"
          onClick={() => togglePanel("users")}
        >
          <Users size={20} />
        </button>

        {/* Notifications */}
        <button
          className="p-2 rounded hover:bg-[#6e2e96] transition-colors"
          onClick={() => togglePanel("notifications")}
        >
          <Bell size={20} />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 p-2 rounded hover:bg-[#6e2e96] transition-colors"
          >
            <UserCircle size={24} />
          </button>
          {profileOpen && <ProfileMenu />}
        </div>

        {/* Panel Dropdown */}
        {activePanel && (
          <div className="absolute top-12 right-0 w-64 bg-white text-black shadow-lg rounded-lg p-4 z-50">
            {activePanel === "messages" && <p>📩 Messages Panel Content</p>}
            {activePanel === "users" && <p>👥 Users Panel Content</p>}
            {activePanel === "notifications" && <p>🔔 Notifications Panel Content</p>}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
