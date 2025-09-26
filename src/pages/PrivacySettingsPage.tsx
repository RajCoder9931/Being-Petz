import { useState } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/sidebar";

function PrivacySetting() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Main Scrollable Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-white shadow rounded-2xl p-6">
            {/* Page Title */}
            <h2 className="text-xl font-semibold bg-purple-600 text-white rounded-md px-4 py-2 mb-6">
              Privacy Setting
            </h2>

            {/* Account Privacy */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold">Account Privacy</h3>
              <label className="flex items-center mt-2 space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Private Account</span>
              </label>
              <p className="text-gray-600 mt-2 text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </section>

            {/* Activity Status */}
            <section className="mb-6 border-t pt-6">
              <h3 className="text-lg font-semibold">Activity Status</h3>
              <label className="flex items-center mt-2 space-x-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span>Show Activity Status</span>
              </label>
              <p className="text-gray-600 mt-2 text-sm">
                A reader will be distracted by the readable content of a page when looking at its layout.
              </p>
            </section>

            {/* Story Sharing */}
            <section className="mb-6 border-t pt-6">
              <h3 className="text-lg font-semibold">Story Sharing</h3>
              <label className="flex items-center mt-2 space-x-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span>Allow Sharing</span>
              </label>
              <p className="text-gray-600 mt-2 text-sm">
                It has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'.
              </p>
            </section>

            {/* Photo Of You */}
            <section className="mb-6 border-t pt-6">
              <h3 className="text-lg font-semibold">Photo Of You</h3>
              <div className="mt-2 space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="photo" defaultChecked />
                  <span>Add Automatically</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="photo" />
                  <span>Add Manually</span>
                </label>
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
              </p>
            </section>

            {/* Your Profile */}
            <section className="mb-6 border-t pt-6">
              <h3 className="text-lg font-semibold">Your Profile</h3>
              <div className="mt-2 space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="profile" defaultChecked />
                  <span>Public</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="profile" />
                  <span>Friend</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="profile" />
                  <span>Specific Friend</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="profile" />
                  <span>Only Me</span>
                </label>
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                It is a long established fact that a reader will be distracted by readable content.
              </p>
            </section>

            {/* Login Notification */}
            <section className="mb-6 border-t pt-6">
              <h3 className="text-lg font-semibold">Login Notification</h3>
              <div className="mt-2 space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="login" />
                  <span>Enable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="login" defaultChecked />
                  <span>Disable</span>
                </label>
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                A reader will be distracted by the readable content of a page.
              </p>
            </section>

            {/* Privacy Help */}
            <section className="border-t pt-6">
              <h3 className="text-lg font-semibold">Privacy Help</h3>
              <button className="flex items-center text-purple-600 mt-2 hover:underline">
                <span className="mr-2">🔒</span> Support
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PrivacySetting;
