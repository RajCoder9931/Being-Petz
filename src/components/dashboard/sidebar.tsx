import React from "react";
import {
  Home,
  User,
  Users,
  MessageSquare,
  Wrench,
  Newspaper,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: "Home", icon: Home, path: "/home" },
  { name: "Profile", icon: User, path: "/pet-profile" },
  { name: "Pet Parents", icon: Users, path: "/pet-parents" },
  { name: "Chats", icon: MessageSquare, path: "/chats" },
  { name: "All Services", icon: Wrench, path: "/services" },
  { name: "Blog", icon: Newspaper, path: "/blog" },
  { name: "Contest", icon: Newspaper, path: "/contest" },
  { name: "Events", icon: Newspaper, path: "/events" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-14 left-0 h-[calc(100%-4rem)] w-64 text-white z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ backgroundColor: "#8337B2" }}
      >
        <nav className="mt-4 space-y-2">
          {menuItems.map(({ name, icon: Icon, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-1.5 rounded-md font-medium transition-all duration-300 ease-in-out ${
                  isActive
                    ? "bg-white text-[#8337B2]"
                    : "hover:bg-white hover:text-[#8337B2]"
                }`
              }
              onClick={onClose}
            >
              <Icon
                size={20}
                className="transition-colors duration-300 ease-in-out group-hover:text-[#8337B2]"
              />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
              {/* Shift the content when a open a sidebar */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isOpen ? "ml-64" : "ml-0"
        }`}
      >
      </div>
    </div>
  );
};

export default Sidebar;
