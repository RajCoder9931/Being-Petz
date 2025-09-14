import React, { useState, useEffect, useRef } from "react";
import {Menu,Bell,UserCircle,Search,Home,MessageSquare,Users,MoreVertical} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import MessagesPanel from "./MessagesPanel";
import FriendRequestPanel from "./FriendRequestPanel";
import NotificationsPanel from "./NotificationsPanel";
import logo from "../../assets/img/Website & Digital Branding_YouTube Banner Logo.png";

interface HeaderProps {
  onMenuClick: () => void;
}
const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);

  // Toggle Panels
  const togglePanel = (panel: string) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
    setProfileOpen(false);
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setActivePanel(null);
        setProfileOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between bg-[#8337B2] text-white px-4 py-3 shadow-md fixed top-0 left-0 w-full z-50">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3 flex-1">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-10 object-contain" />

        {/* Sidebar Toggle */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded hover:bg-[#6e2e96] transition-colors"
        >
          <Menu size={22} />
        </button>

        {/* Search (hidden on mobile) */}
        <div className="hidden md:flex items-center bg-[#6e2e96] rounded px-2 py-1 ml-4 w-full max-w-sm">
          <Search size={18} className="text-gray-200" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none px-2 text-white w-full placeholder-gray-300"
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4 relative" ref={panelRef}>
        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className="p-2 rounded hover:bg-[#6e2e96] transition-colors"
            onClick={() => navigate("/home")}
          >
            <Home size={20} />
          </button>

          <button
            className="p-2 rounded hover:bg-[#6e2e96] transition-colors"
            onClick={() => togglePanel("messages")}
          >
            <MessageSquare size={20} />
          </button>

          <button
            className="p-2 rounded hover:bg-[#6e2e96] transition-colors"
            onClick={() => togglePanel("users")}
          >
            <Users size={20} />
          </button>

          <button
            className="p-2 rounded hover:bg-[#6e2e96] transition-colors"
            onClick={() => togglePanel("notifications")}
          >
            <Bell size={20} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden relative">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded hover:bg-[#6e2e96] transition-colors"
          >
            <MoreVertical size={22} />
          </button>

          {mobileMenuOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white text-black shadow-lg rounded-lg z-50">
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  navigate("/home");
                  setMobileMenuOpen(false);
                }}
              >
                <Home size={18} /> Home
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  togglePanel("messages");
                  setMobileMenuOpen(false);
                }}
              >
                <MessageSquare size={18} /> Messages
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  togglePanel("users");
                  setMobileMenuOpen(false);
                }}
              >
                <Users size={18} /> Users
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  togglePanel("notifications");
                  setMobileMenuOpen(false);
                }}
              >
                <Bell size={18} /> Notifications
              </button>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setActivePanel(null);
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 p-2 rounded hover:bg-[#6e2e96] transition-colors"
          >
            <UserCircle size={24} />
          </button>
          {profileOpen && <ProfileMenu />}
        </div>

        {/* Panel Dropdown */}
        {activePanel && (
          <div className="absolute top-12 right-0 w-80 bg-white text-black shadow-lg rounded-lg p-4 z-50">
            {activePanel === "messages" && <MessagesPanel />}
            {activePanel === "users" && <FriendRequestPanel />}
            {activePanel === "notifications" && <NotificationsPanel />}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
