import { MapPin } from "lucide-react";
import { useState } from "react";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";
import profile from "../../assets/img/profile.jpeg";
import Sarah from "../../assets/adopt-img.png";
import Max from "../../assets/img/postdog.avif";

function PetParent() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header onMenuClick={toggleSidebar} />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* LEFT SIDE */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Profile Card */}
                            <div className="bg-white rounded-2xl shadow p-6">
                                {/* Cover Image */}
                                <div className="bg-gradient-to-r from-purple-400 to-pink-300 h-32 rounded-t-2xl -m-6 mb-6"></div>

                                <div className="flex items-center -mt-16">
                                    <img
                                        src={profile}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full border-4 border-white shadow" // reduced size
                                    />
                                    <div className="ml-4">
                                        <h2 className="text-2xl font-bold text-purple-700">
                                            Sarah Johnson
                                        </h2>
                                        <div className="flex items-center text-gray-500 text-sm mt-1">
                                            <MapPin size={16} className="mr-1" />
                                            San Francisco, CA
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 mt-4">
                                    Pet lover and proud parent of 3 furry babies. Passionate about
                                    animal welfare and connecting with other pet parents.
                                </p>

                                <div className="flex space-x-8 mt-4 text-center">
                                    <div>
                                        <p className="text-lg font-bold text-purple-700">3</p>
                                        <p className="text-sm text-gray-500">Pets</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-purple-700">128</p>
                                        <p className="text-sm text-gray-500">Friends</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-purple-700">342</p>
                                        <p className="text-sm text-gray-500">Posts</p>
                                    </div>
                                </div>
                            </div>

                            {/* About */}
                            <div className="bg-white rounded-2xl shadow p-6 max-w-md">
                                <h3 className="text-xl font-bold text-purple-700 mb-4">About</h3>
                                <div className="grid grid-cols-2 gap-4 text-gray-700">
                                    <div>
                                        <p className="font-semibold">Occupation</p>
                                        <p>Veterinary Technician</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Education</p>
                                        <p>Animal Science Degree, UC Davis</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Interests</p>
                                        <p>Dog training, Animal rescue, Pet photography</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Joined</p>
                                        <p>March 2019</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Posts */}
                            <div className="bg-white rounded-2xl shadow p-6">
                                <h3 className="text-xl font-bold text-purple-700 mb-4">
                                    Recent Posts
                                </h3>
                                <div className="mb-6">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={Sarah}
                                            alt="Sarah"
                                            className="w-7 h-7 rounded-full"
                                        />
                                        <div>
                                            <p className="font-semibold">Sarah Johnson</p>
                                            <p className="text-xs text-gray-500">2 hours ago</p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-gray-700">
                                        Just took Max to his first agility class today! He did amazing
                                        for his first time. 🐕💛 #DogTraining #GoldenRetriever
                                    </p>
                                    <img
                                src={Max as string}
                                alt="Max"
                                className="w-full max-w-[400px] aspect-square object-cover rounded-lg mt-3"
                                />

                                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                                        <span>24 Likes</span>
                                        <span>8 Comments</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="space-y-6">
                            {/* Upcoming Events */}
                            <div className="bg-white rounded-2xl shadow p-6">
                                <h3 className="text-xl font-bold text-purple-700 mb-4">
                                    Upcoming Events
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { date: "15 JUN", event: "Dog Park Meetup" },
                                        { date: "22 JUN", event: "Pet First Aid Workshop" },
                                        { date: "05 JUL", event: "Adoption Fair" },
                                    ].map((e, i) => (
                                        <div key={i} className="flex items-center space-x-3">
                                            <div className="bg-purple-100 text-purple-700 p-2 rounded-lg text-center w-14">
                                                <p className="text-xs font-bold">{e.date}</p>
                                            </div>
                                            <p className="text-gray-700">{e.event}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* My Groups */}
                            <div className="bg-white rounded-2xl shadow p-6">
                                <h3 className="text-xl font-bold text-purple-700 mb-4">My Groups</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src="../../assets/user/01.jpg"
                                            alt="Group"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="font-semibold">Golden Retriever Lovers</p>
                                            <p className="text-xs text-gray-500">12.5k members</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src="../../assets/img/cat.jpg"
                                            alt="Group"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="font-semibold">Bay Area Cat Owners</p>
                                            <p className="text-xs text-gray-500">8.2k members</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src="../../assets/img/07.jpg"
                                            alt="Group"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="font-semibold">Rescue Dog Support</p>
                                            <p className="text-xs text-gray-500">5.7k members</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pet Friends */}
                            <div className="bg-white rounded-2xl shadow p-6">
                                <h3 className="text-xl font-bold text-purple-700 mb-4">
                                    Pet Friends
                                </h3>
                                <div className="space-y-3">
                                    {["Michael Chen", "Jessica Wong", "David Kim", "Amanda Lee"].map(
                                        (name, i) => (
                                            <div key={i} className="flex items-center space-x-3">
                                                <img
                                                    src={`/images/friend${i + 1}.jpg`}
                                                    alt={name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <p>{name}</p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default PetParent;
