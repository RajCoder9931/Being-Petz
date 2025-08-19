import user1 from "../../assets/user/01.jpg";
import user2 from "../../assets/user/02.jpg";
import user3 from "../../assets/user/05.jpg";
import user4 from "../../assets/user/08.jpg";
import { useNavigate } from "react-router-dom";
const requests = [
    { id: 1, name: "Jaques Amole", friends: "40 friends", img: user1 },
    { id: 2, name: "Lucy Tania", friends: "12 friends", img: user2 },
    { id: 3, name: "Manny Petty", friends: "3 friends", img: user3 },
    { id: 4, name: "Marsha Mello", friends: "15 friends", img: user4 },
];

function FriendRequestPanel() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Friend Request</h3>
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {requests.length}
                </span>
            </div>
            <ul className="space-y-3">
                {requests.map((req) => (
                    <li key={req.id} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <img src={req.img} alt={req.name} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <p className="font-medium">{req.name}</p>
                                <p className="text-xs text-gray-500">{req.friends}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm">Confirm</button>
                            <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button
                className="mt-3 text-purple-600 text-sm font-medium hover:underline"
                onClick={() => navigate("/friend-requests")}
            >
                View More Request
            </button>
        </div>
    );
}

export default FriendRequestPanel;
