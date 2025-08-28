import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/sidebar";
import Footer from "../components/dashboard/Footer";

import user1 from "../assets/user/01.jpg";
import user2 from "../assets/user/02.jpg";
import user3 from "../assets/user/03.jpg";

const initialFriendRequests = [
  { id: 1, name: "Jaques Amole", friends: "40 friends", img: user1, status: "pending" },
  { id: 2, name: "Lucy Tania", friends: "12 friends", img: user2, status: "pending" },
  { id: 3, name: "Val Adictorian", friends: "0 friends", img: user3, status: "pending" },
  { id: 4, name: "Manny Petty", friends: "3 friends", img: user2, status: "pending" },
  { id: 5, name: "Marsha Mello", friends: "15 friends", img: user1, status: "pending" },
];

const initialPeopleYouMayKnow = [
  { id: 6, name: "Jen Youfelct", friends: "4 friends", img: user1, status: "none" },
  { id: 7, name: "Cooke Edoh", friends: "20 friends", img: user2, status: "none" },
  { id: 8, name: "Earl E. Riser", friends: "30 friends", img: user3, status: "none" },
  { id: 9, name: "Cliff Diver", friends: "5 friends", img: user2, status: "none" },
  { id: 10, name: "Vinny Gret", friends: "50 friends", img: user3, status: "none" },
];

const FriendRequestPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [friendRequests, setFriendRequests] = useState(initialFriendRequests);
  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState(initialPeopleYouMayKnow);

  const navigate = useNavigate();

  const handleConfirm = (id: number) => {
    setFriendRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "confirmed" } : req))
    );
  };

  const handleDeleteRequest = (id: number) => {
    setFriendRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const handleAddFriend = (id: number) => {
    setPeopleYouMayKnow((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "following" } : p))
    );
  };

  const handleRemove = (id: number) => {
    setPeopleYouMayKnow((prev) => prev.filter((p) => p.id !== id));
  };

  const goToProfile = (user: any) => {
    navigate(`/profile/${user.id}`, { state: user });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 bg-gray-100 p-4 sm:p-6 flex justify-center">
          <div className="w-full max-w-2xl space-y-8">
            {/* Friend Requests */}
            <div className="bg-white shadow rounded-xl">
              <h2 className="bg-purple-700 text-white px-4 py-3 rounded-t-xl font-semibold">
                Friend Request
              </h2>
              <ul className="divide-y">
                {friendRequests.map((req) => (
                  <li key={req.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <img src={req.img} alt={req.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-gray-800">{req.name}</p>
                        <p className="text-sm text-gray-500">{req.friends}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {req.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleConfirm(req.id)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleDeleteRequest(req.id)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm"
                          >
                            Delete Request
                          </button>
                        </>
                      )}
                      {req.status === "confirmed" && (
                        <button
                          onClick={() => goToProfile(req)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                        >
                          View Profile
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* People You May Know */}
            <div className="bg-white shadow rounded-xl">
              <h2 className="bg-purple-700 text-white px-4 py-3 rounded-t-xl font-semibold">
                People You May Know
              </h2>
              <ul className="divide-y">
                {peopleYouMayKnow.map((person) => (
                  <li key={person.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <img src={person.img} alt={person.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-gray-800">{person.name}</p>
                        <p className="text-sm text-gray-500">{person.friends}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {person.status === "none" && (
                        <>
                          <button
                            onClick={() => handleAddFriend(person.id)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
                          >
                            + Add Friend
                          </button>
                          <button
                            onClick={() => handleRemove(person.id)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm"
                          >
                            Remove
                          </button>
                        </>
                      )}
                      {person.status === "following" && (
                        <>
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                            Following
                          </button>
                          <button
                            onClick={() => goToProfile(person)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                          >
                            View Profile
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default FriendRequestPage;
