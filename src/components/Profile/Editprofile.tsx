import React, { useState } from "react";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";
import profile from "../../assets/img/profile.jpeg";

 

const EditProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto w-full">
          {/* Tabs */}
          <div className="bg-white shadow-sm rounded-t-md">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {[
                { id: "personal", label: "Personal Information" },
                { id: "password", label: "Change Password" },
                { id: "email", label: "Email and SMS" },
                { id: "contact", label: "Manage Contact" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-3 font-medium whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-purple-600 text-white rounded-t-md"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 border rounded-b-md shadow-sm bg-white mt-2">
            {/* Personal Info */}
            {activeTab === "personal" && (
              <div>
                <h2 className="text-lg font-semibold bg-purple-600 text-white px-4 py-2 rounded-md">
                  Personal Information
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                  <img
                    src={profile}
                    alt="profile"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border"
                  />
                  <button className="text-blue-500 text-sm">Edit</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-md px-3 py-2"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-md px-3 py-2"
                      placeholder="Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      User Name
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-md px-3 py-2"
                      placeholder="John@01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">City</label>
                    <input
                      type="text"
                      className="w-full border rounded-md px-3 py-2"
                      placeholder="Atlanta"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Age</label>
                    <select className="w-full border rounded-md px-3 py-2">
                      <option>18-25</option>
                      <option>26-35</option>
                      <option>36-45</option>
                      <option>46-62</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Marital Status
                    </label>
                    <select className="w-full border rounded-md px-3 py-2">
                      <option>Single</option>
                      <option>Married</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Country</label>
                    <select className="w-full border rounded-md px-3 py-2">
                      <option>USA</option>
                      <option>India</option>
                      <option>UK</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">State</label>
                    <select className="w-full border rounded-md px-3 py-2">
                      <option>Georgia</option>
                      <option>California</option>
                    </select>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium">Address</label>
                    <textarea
                      rows={3}
                      className="w-full border rounded-md px-3 py-2"
                      placeholder="Your address"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
                    Submit
                  </button>
                  <button className="bg-red-100 text-red-600 px-4 py-2 rounded-md">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Change Password */}
            {activeTab === "password" && (
              <div>
                <h2 className="text-lg font-semibold bg-purple-600 text-white px-4 py-2 rounded-md">
                  Change Password
                </h2>
                <div className="space-y-4 mt-6">
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <input
                    type="password"
                    placeholder="Verify Password"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
                    Submit
                  </button>
                  <button className="bg-red-100 text-red-600 px-4 py-2 rounded-md">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Email & SMS */}
            {activeTab === "email" && (
              <div>
                <h2 className="text-lg font-semibold bg-purple-600 text-white px-4 py-2 rounded-md">
                  Email and SMS
                </h2>
                <div className="mt-6 space-y-3">
                  <div>
                    <label className="mr-2">Email Notification:</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div>
                    <label className="mr-2">SMS Notification:</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div>
                    <p className="font-medium">When To Email:</p>
                    <label className="block">
                      <input type="checkbox" /> You have new notifications
                    </label>
                    <label className="block">
                      <input type="checkbox" /> You're sent a direct message
                    </label>
                    <label className="block">
                      <input type="checkbox" defaultChecked /> Someone adds you
                      as a connection
                    </label>
                  </div>
                  <div>
                    <p className="font-medium">When To Escalate Emails:</p>
                    <label className="block">
                      <input type="checkbox" /> Upon new order
                    </label>
                    <label className="block">
                      <input type="checkbox" /> New membership approval
                    </label>
                    <label className="block">
                      <input type="checkbox" defaultChecked /> Member
                      registration
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
                    Submit
                  </button>
                  <button className="bg-red-100 text-red-600 px-4 py-2 rounded-md">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Manage Contact */}
            {activeTab === "contact" && (
              <div>
                <h2 className="text-lg font-semibold bg-purple-600 text-white px-4 py-2 rounded-md">
                  Manage Contact
                </h2>
                <div className="space-y-4 mt-6">
                  <input
                    type="text"
                    placeholder="Contact Number"
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <input
                    type="url"
                    placeholder="Website URL"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
                    Submit
                  </button>
                  <button className="bg-red-100 text-red-600 px-4 py-2 rounded-md">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        </div>
    </div>
  );
};

export default EditProfile;
