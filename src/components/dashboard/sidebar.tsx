import React from "react";
import { Home, User, Users, MessageSquare, Wrench, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: "Home", icon: Home, path: "/dashboard" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "Pet Parents", icon: Users, path: "/pet-parents" },
  { name: "Chats", icon: MessageSquare, path: "/chats" },
  { name: "All Services", icon: Wrench, path: "/services" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-64 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
      style={{ backgroundColor: "#8337B2" }} // Sidebar background color
    >
      <nav className="mt-4 space-y-2">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out ${
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
  );
};

export default Sidebar;
