import { useState, useEffect, useRef } from "react";
import axios from "axios";
import catIcon from "../../assets/img/cat.jpg";

interface Message {
  id: number;
  user_id: number;
  username: string;
  message_text: string;  
  created_at: string;
}

interface ChatScreenProps {
  community: { id: number; name: string };
  onBack: () => void;
}

export default function ChatScreen({ community, onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages
  const fetchMessages = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/community/get-messages",
        {
          community_id: community.id,
          user_id: user.id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = res.data?.data || [];
      setMessages(data);
      scrollToBottom();
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, [community.id]);

  // Send message
  const handleSendMessage = async () => {
    if (!user || newMessage.trim() === "") return;

    setSending(true);
    try {
      const payload = {
        community_id: community.id,
        parent_id: user.id, 
        message_type: "text",
        message_text: newMessage,
        isReply: 0,
        message_id: null,  
      };

      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/community/send-message",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 201 || res.status === 200) {
        setNewMessage("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Failed to send message", error.response?.data || error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-gray-50">
        <button onClick={onBack} className="text-purple-600 font-bold mr-4">
          Back
        </button>
        <h2 className="text-lg font-bold">{community.name}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <p className="text-gray-500 text-sm">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">No messages yet</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 ${
                msg.user_id === user?.id ? "justify-end" : "justify-start"
              }`}
            >
              {msg.user_id !== user?.id && (
                <img
                  src={catIcon}
                  alt={msg.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div
                className={`max-w-xs p-2 rounded-lg ${
                  msg.user_id === user?.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.user_id !== user?.id && (
                  <p className="text-xs font-bold">{msg.username}</p>
                )}
                {/*  Display message */}
                <p className="text-sm">{msg.message_text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(msg.created_at).toLocaleString([], {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className="flex p-3 border-t gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          disabled={sending}
          className="px-4 py-2 bg-purple-600 text-white rounded-full"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

