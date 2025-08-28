// // src/components/ProfileMenu.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { User, Edit, Settings, Lock, LogOut } from 'lucide-react';

// const ProfileMenu: React.FC = () => {
//   return (
//     <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg overflow-hidden z-50">
//       {/* Header */}
//       <div className="bg-purple-600 text-white p-4">
//         <h3 className="text-lg font-semibold">Hello Bni Cyst</h3>
//         <p className="text-green-300 text-sm">Available</p>
//       </div>

//       {/* Menu Items */}
//       <ul className="divide-y divide-gray-200">
//         <li>
//           <Link
//             to="/profile"
//             className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
//           >
//             <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
//               <User size={20} />
//             </div>
//             <div>
//               <p className="font-medium text-gray-800">My Profile</p>
//               <p className="text-sm text-gray-500">View personal profile details.</p>
//             </div>
//           </Link>
//         </li>

//         <li>
//           <Link
//             to="/edit-profile"
//             className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
//           >
//             <div className="bg-orange-100 p-2 rounded-lg text-orange-500">
//               <Edit size={20} />
//             </div>
//             <div>
//               <p className="font-medium text-gray-800">Edit Profile</p>
//               <p className="text-sm text-gray-500">Modify your personal details.</p>
//             </div>
//           </Link>
//         </li>

//         <li>
//           <Link
//             to="/settings"
//             className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
//           >
//             <div className="bg-purple-100 p-2 rounded-lg text-purple-500">
//               <Settings size={20} />
//             </div>
//             <div>
//               <p className="font-medium text-gray-800">Account settings</p>
//               <p className="text-sm text-gray-500">Manage your account parameters.</p>
//             </div>
//           </Link>
//         </li>

//         <li>
//           <Link
//             to="/privacy-settings"
//             className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
//           >
//             <div className="bg-red-100 p-2 rounded-lg text-red-500">
//               <Lock size={20} />
//             </div>
//             <div>
//               <p className="font-medium text-gray-800">Privacy Settings</p>
//               <p className="text-sm text-gray-500">Control your privacy parameters.</p>
//             </div>
//           </Link>
//         </li>
//       </ul>

//       {/* Sign Out */}
//       <div className="p-4">
//         <Link
//           to="/login"
//           className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition"
//         >
//           <LogOut size={18} /> Sign out
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProfileMenu;



// src/components/ProfileMenu.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Edit, Settings, Lock, LogOut } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  profile_pic?: string;
  status?: string;
}

const ProfileMenu: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg overflow-hidden z-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 flex items-center gap-3">
        {/* Profile Picture */}
        {user?.profile_pic ? (
          <img
            src={user.profile_pic}
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center text-xl font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
        )}

        {/* User Info */}
        <div>
          <h3 className="text-lg font-semibold">
            Hello {user?.name || "Guest"}
          </h3>
          <p className="text-green-300 text-sm">{user?.status || "Available"}</p>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="divide-y divide-gray-200">
        <li>
          <Link
            to="/pet-parents"
            className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
              <User size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-800">My Profile</p>
              <p className="text-sm text-gray-500">{user?.email || "View personal profile details."}</p>
            </div>
          </Link>
        </li>

        <li>
          <Link
            to="/edit-profile"
            className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="bg-orange-100 p-2 rounded-lg text-orange-500">
              <Edit size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-800">Edit Profile</p>
              <p className="text-sm text-gray-500">Modify your personal details.</p>
            </div>
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="bg-purple-100 p-2 rounded-lg text-purple-500">
              <Settings size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-800">Account settings</p>
              <p className="text-sm text-gray-500">Manage your account parameters.</p>
            </div>
          </Link>
        </li>

        <li>
          <Link
            to="/privacy-settings"
            className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="bg-red-100 p-2 rounded-lg text-red-500">
              <Lock size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-800">Privacy Settings</p>
              <p className="text-sm text-gray-500">Control your privacy parameters.</p>
            </div>
          </Link>
        </li>
      </ul>

      {/* Sign Out */}
      <div className="p-4">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition"
        >
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
