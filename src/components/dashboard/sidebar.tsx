import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Users,
  MessageSquare,
  Wrench,
  Newspaper,
  Calendar,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

const menuItems = [
  { name: "Home", icon: Home, path: "/home" },
  { name: "Profile", icon: User, path: "/pet-profile" },
  { name: "Pet Parents", icon: Users, path: "/pet-parents" },
  { name: "Chats", icon: MessageSquare, path: "/chats" },
  { name: "All Services", icon: Wrench, path: "/services" },
  { name: "Blog", icon: Newspaper, path: "/blog" },
  { name: "Events", icon: Calendar, path: "/events" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen: externalIsOpen, onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const actualIsOpen = externalIsOpen !== undefined ? externalIsOpen : isOpen;

   useEffect(() => {
    if (window.innerWidth > 768 && !actualIsOpen) {
      const newState = true;
      if (onToggle) {
        onToggle(newState);
      } else {
        setIsOpen(newState);
      }
    }
  }, [location.pathname]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-14 left-0 h-[calc(100%-4rem)] text-white z-40 transform transition-all duration-300 ease-in-out
          ${actualIsOpen ? "w-64 translate-x-0" : "w-16 -translate-x-0"}
        `}
        style={{ backgroundColor: "#8337B2" }}
      >
        <nav className="mt-8 space-y-2 px-2">
          {menuItems.map(({ name, icon: Icon, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-all duration-300 ease-in-out ${
                  isActive
                    ? "bg-white text-[#8337B2]"
                    : "hover:bg-white hover:text-[#8337B2]"
                } ${!actualIsOpen ? "justify-center" : ""}`
              }
              title={!actualIsOpen ? name : ""}
            >
              <Icon
                size={20}
                className="transition-colors duration-300 ease-in-out group-hover:text-[#8337B2] flex-shrink-0"
              />
              <span className={`transition-all duration-300 ${actualIsOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
                {name}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>
      
      {/* Content area with the  dynamic margin */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          actualIsOpen ? "ml-64" : "ml-16"
        }`}
      >
      </div>
    </div>
  );
};

export default Sidebar;