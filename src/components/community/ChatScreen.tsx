import React, { useState } from "react";
import { Send, Image as ImageIcon } from "lucide-react";
import { Community } from "./CommunityApp";

interface Message {
  sender: string;
  text?: string;
  replyTo?: string;
  poll?: string[];
  image?: string; // for image messages
}

interface Props {
  community: Community;
  onBack: () => void;
}

export default function ChatScreen({ community, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "Doberman Wing", text: "Good To Connect with you" },
    {
      sender: "Doberman Wing",
      text: "Tell me who is strong",
      poll: ["German Shepherd", "Rottweiler", "Husky", "Bulldog"],
    },
    { sender: "Robert", text: "Hey, Good Morning to all", replyTo: "Good To Connect with you" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSend = () => {
    if (!newMessage.trim() && !selectedImage) return;
    setMessages([...messages, { sender: "You", text: newMessage, image: selectedImage || undefined }]);
    setNewMessage("");
    setSelectedImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-6 bg-white rounded-xl shadow p-4 flex flex-col h-[500px]">
      <div className="flex items-center border-b pb-2 mb-2">
        <button onClick={onBack} className="mr-2">←</button>
        <h2 className="font-bold">{community.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "You" || msg.sender === "Robert" ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-3 rounded-xl max-w-xs ${
                msg.sender === "You" || msg.sender === "Robert"
                  ? "bg-pink-200"
                  : "bg-gray-100"
              }`}
            >
              {msg.replyTo && (
                <p className="text-xs text-gray-500 mb-1">Replying to: {msg.replyTo}</p>
              )}
              <p className="font-semibold">{msg.sender}</p>
              {msg.text && <p>{msg.text}</p>}
              {msg.image && (
                <img src={msg.image} alt="sent" className="mt-2 rounded-lg max-h-40" />
              )}
              {msg.poll && (
                <div className="mt-2 space-y-1">
                  {msg.poll.map((option) => (
                    <label key={option} className="block">
                      <input type="radio" name={`poll-${idx}`} /> {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="flex items-center border-t pt-2 mt-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <label className="ml-2 cursor-pointer">
          <ImageIcon />
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
        <button
          onClick={handleSend}
          className="ml-2 bg-purple-600 text-white p-2 rounded-full"
        >
          <Send size={18} />
        </button>
      </div>

      {/* Preview selected image */}
      {selectedImage && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">Preview:</p>
          <img src={selectedImage} alt="preview" className="rounded-lg max-h-32 mt-1" />
        </div>
      )}
    </div>
  );
}
