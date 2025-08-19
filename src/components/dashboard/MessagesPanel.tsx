import user1 from "../../assets/user/01.jpg";
import user2 from "../../assets/user/02.jpg";
import user3 from "../../assets/user/05.jpg";
import user4 from "../../assets/user/08.jpg";
import user5 from "../../assets/user/friend1.avif";
import { useNavigate } from "react-router-dom";
const messages = [
    { id: 1, name: "Bni Emma Watson", date: "13 Jun", img: user1 },
    { id: 2, name: "Lorem Ipsum Watson", date: "20 Apr", img: user2 },
    { id: 3, name: "Why do we use it?", date: "30 Jun", img: user3 },
    { id: 4, name: "Variations Passages", date: "12 Sep", img: user4 },
    { id: 5, name: "Lorem Ipsum generators", date: "5 Dec", img: user5 },
];

function MessagesPanel() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/chats'); // Navigate to /chats when button is clicked
    };
    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">All Messages</h3>
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {messages.length}
                </span>
            </div>
            <ul className="space-y-3">
                {messages.map((msg) => (
                    <li key={msg.id} className="flex items-center gap-3">
                        <img src={msg.img} alt={msg.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <p className="font-medium">{msg.name}</p>
                            <p className="text-xs text-gray-500">{msg.date}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <button
                className="mt-3 text-purple-600 text-sm font-medium hover:underline"
                onClick={handleClick}
            >
                See All Messages
            </button>
        </div>
    );
}

export default MessagesPanel;
