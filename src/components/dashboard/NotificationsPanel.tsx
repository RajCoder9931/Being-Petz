import user1 from "../../assets/user/01.jpg";
import user2 from "../../assets/user/02.jpg";
import user3 from "../../assets/user/05.jpg";
import user4 from "../../assets/user/08.jpg";
import { useNavigate } from "react-router-dom";
const notifications = [
    { id: 1, name: "Emma Watson Bni", desc: "95 MB", time: "Just Now", img: user1 },
    { id: 2, name: "New customer is join", desc: "Cyst Bni", time: "5 days ago", img: user2 },
    { id: 3, name: "Two customer is left", desc: "Cyst Bni", time: "2 days ago", img: user3 },
    { id: 4, name: "New Mail from Fenny", desc: "Cyst Bni", time: "3 days ago", img: user4 },
];

function NotificationsPanel() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">All Notifications</h3>
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {notifications.length}
                </span>
            </div>
            <ul className="space-y-3">
                {notifications.map((notif) => (
                    <li key={notif.id} className="flex items-center gap-3">
                        <img src={notif.img} alt={notif.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1">
                            <p className="font-medium">{notif.name}</p>
                            <p className="text-xs text-gray-500">{notif.desc}</p>
                        </div>
                        <span className="text-xs text-gray-400">{notif.time}</span>
                    </li>
                ))}
            </ul>
            <button
                className="mt-3 text-purple-600 text-sm font-medium hover:underline"
                onClick={() => navigate("/notifications")}
            >
                See All Notifications
            </button>

        </div>
    );
}

export default NotificationsPanel;
