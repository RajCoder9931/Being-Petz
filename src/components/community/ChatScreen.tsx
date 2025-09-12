 
// import React, { useState, useRef } from "react";
// import { Send, Image as ImageIcon, Mic } from "lucide-react";
// import { Community } from "./CommunityApp";

// interface Message {
//   sender: string;
//   text?: string;
//   replyTo?: string;
//   poll?: string[];
//   image?: string;
//   audio?: string; // audio message
// }

// interface Props {
//   community: Community;
//   onBack: () => void;
// }

// export default function ChatScreen({ community, onBack }: Props) {
//   const [messages, setMessages] = useState<Message[]>([
//     { sender: "Doberman Wing", text: "Good To Connect with you" },
//     {
//       sender: "Doberman Wing",
//       text: "Tell me who is strong",
//       poll: ["German Shepherd", "Rottweiler", "Husky", "Bulldog"],
//     },
//     { sender: "Robert", text: "Hey, Good Morning to all", replyTo: "Good To Connect with you" },
//   ]);
//   const [newMessage, setNewMessage] = useState("");
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   // Voice recording
//   const [isRecording, setIsRecording] = useState(false);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);

//   const handleSend = () => {
//     if (!newMessage.trim() && !selectedImage) return;
//     setMessages([
//       ...messages,
//       { sender: "You", text: newMessage, image: selectedImage || undefined },
//     ]);
//     setNewMessage("");
//     setSelectedImage(null);
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setSelectedImage(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;
//       audioChunksRef.current = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) audioChunksRef.current.push(event.data);
//       };

//       mediaRecorder.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
//         const audioUrl = URL.createObjectURL(audioBlob);

//         setMessages((prev) => [
//           ...prev,
//           { sender: "You", audio: audioUrl },
//         ]);
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Microphone access denied:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div className="mt-6 bg-white rounded-xl shadow p-4 flex flex-col h-[500px]">
//       <div className="flex items-center border-b pb-2 mb-2">
//         <button onClick={onBack} className="mr-2">←</button>
//         <h2 className="font-bold">{community.name}</h2>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto space-y-3">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex ${
//               msg.sender === "You" || msg.sender === "Robert"
//                 ? "justify-end"
//                 : "justify-start"
//             }`}
//           >
//             <div
//               className={`p-3 rounded-xl max-w-xs ${
//                 msg.sender === "You" || msg.sender === "Robert"
//                   ? "bg-pink-200"
//                   : "bg-gray-100"
//               }`}
//             >
//               {msg.replyTo && (
//                 <p className="text-xs text-gray-500 mb-1">
//                   Replying to: {msg.replyTo}
//                 </p>
//               )}
//               <p className="font-semibold">{msg.sender}</p>
//               {msg.text && <p>{msg.text}</p>}
//               {msg.image && (
//                 <img
//                   src={msg.image}
//                   alt="sent"
//                   className="mt-2 rounded-lg max-h-40"
//                 />
//               )}
//               {msg.audio && (
//                 <audio controls className="mt-2 w-full">
//                   <source src={msg.audio} type="audio/webm" />
//                   Your browser does not support the audio element.
//                 </audio>
//               )}
//               {msg.poll && (
//                 <div className="mt-2 space-y-1">
//                   {msg.poll.map((option) => (
//                     <label key={option} className="block">
//                       <input type="radio" name={`poll-${idx}`} /> {option}
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input box */}
//       <div className="flex items-center border-t pt-2 mt-2">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 border rounded px-3 py-2"
//         />
//         <label className="ml-2 cursor-pointer">
//           <ImageIcon />
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleImageUpload}
//           />
//         </label>
//         <button
//           onClick={isRecording ? stopRecording : startRecording}
//           className={`ml-2 p-2 rounded-full ${
//             isRecording ? "bg-red-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           <Mic size={18} />
//         </button>
//         <button
//           onClick={handleSend}
//           className="ml-2 bg-purple-600 text-white p-2 rounded-full"
//         >
//           <Send size={18} />
//         </button>
//       </div>

//       {/* Preview selected image */}
//       {selectedImage && (
//         <div className="mt-2">
//           <p className="text-sm text-gray-500">Preview:</p>
//           <img
//             src={selectedImage}
//             alt="preview"
//             className="rounded-lg max-h-32 mt-1"
//           />
//         </div>
//       )}
//     </div>
//   );
// }
//  // test done 

// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import catIcon from "../../assets/img/cat.jpg";

// interface Message {
//   id: number;
//   user_id: number;
//   username: string;
//   message: string;
//   created_at: string;
// }

// interface ChatScreenProps {
//   community: { id: number; name: string };
//   onBack: () => void;
// }

// export default function ChatScreen({ community, onBack }: ChatScreenProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState(false);

//   const messageEndRef = useRef<HTMLDivElement | null>(null);

//   const storedUser = localStorage.getItem("user");
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   const scrollToBottom = () => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Fetch messages
//   const fetchMessages = async () => {
//     if (!user) return;
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "https://argosmob.com/being-petz/public/api/v1/community/get-messages",
//         {
//           community_id: community.id,
//           user_id: user.id,
//         }
//       );

//       const data = res.data?.data || [];
//       // data format: [{id, user_id, username, message, created_at}, ...]
//       setMessages(data);
//       scrollToBottom();
//     } catch (error) {
//       console.error("Failed to fetch messages", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//     // optional: auto-refresh every 5 sec
//     const interval = setInterval(fetchMessages, 5000);
//     return () => clearInterval(interval);
//   }, [community.id]);

//   // Send message
//   const handleSendMessage = async () => {
//     if (!user || newMessage.trim() === "") return;

//     setSending(true);
//     try {
//       const res = await axios.post(
//         "https://argosmob.com/being-petz/public/api/v1/community/send-message",
//         {
//           community_id: community.id,
//           user_id: user.id,
//           message: newMessage,
//         }
//       );

//       if (res.status === 200) {
//         setNewMessage("");
//         fetchMessages(); // refresh messages
//       }
//     } catch (error) {
//       console.error("Failed to send message", error);
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-white rounded-xl shadow overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center p-4 border-b bg-gray-50">
//         <button onClick={onBack} className="text-purple-600 font-bold mr-4">
//           Back
//         </button>
//         <h2 className="text-lg font-bold">{community.name}</h2>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {loading ? (
//           <p className="text-gray-500 text-sm">Loading messages...</p>
//         ) : messages.length === 0 ? (
//           <p className="text-gray-400 text-sm text-center">No messages yet</p>
//         ) : (
//           messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex gap-2 ${
//                 msg.user_id === user?.id ? "justify-end" : "justify-start"
//               }`}
//             >
//               {msg.user_id !== user?.id && (
//                 <img
//                   src={catIcon}
//                   alt={msg.username}
//                   className="w-8 h-8 rounded-full object-cover"
//                 />
//               )}
//               <div
//                 className={`max-w-xs p-2 rounded-lg ${
//                   msg.user_id === user?.id
//                     ? "bg-purple-600 text-white"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 {msg.user_id !== user?.id && (
//                   <p className="text-xs font-bold">{msg.username}</p>
//                 )}
//                 <p className="text-sm">{msg.message}</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {new Date(msg.created_at).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </p>
//               </div>
//             </div>
//           ))
//         )}
//         <div ref={messageEndRef} />
//       </div>

//       {/* Input */}
//       <div className="flex p-3 border-t gap-2">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           disabled={sending}
//           className="px-4 py-2 bg-purple-600 text-white rounded-full"
//         >
//           {sending ? "Sending..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import axios from "axios";
import catIcon from "../../assets/img/cat.jpg";

interface Message {
  id: number;
  community_id: number;
  parent_id: number;
  message_text: string;
  message_type: string;
  created_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
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
        "https://argosmob.uk/being-petz/public/api/v1/community/get-messages",
        {
          community_id: community.id,
          user_id: user.id,
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
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [community.id]);

  // Send message
  const handleSendMessage = async () => {
    if (!user || newMessage.trim() === "") return;

    setSending(true);
    try {
      const payload = {
        community_id: community.id,
        user_id: user.id,        
        message_text: newMessage, 
        message_type: "text",      
      };

      console.log("Sending payload:", payload);

      const res = await axios.post(
        "https://argosmob.uk/being-petz/public/api/v1/community/send-message",
        payload
      );

      console.log("Send response:", res.data);

      if (res.data?.status) {
        setNewMessage("");
        fetchMessages();
      } else {
        console.error("Send message failed:", res.data);
      }
    } catch (error) {
      console.error("Failed to send message", error);
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
                msg.user.id === user?.id ? "justify-end" : "justify-start"
              }`}
            >
              {msg.user.id !== user?.id && (
                <img
                  src={catIcon}
                  alt={msg.user.first_name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div
                className={`max-w-xs p-2 rounded-lg ${
                  msg.user.id === user?.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.user.id !== user?.id && (
                  <p className="text-xs font-bold">
                    {msg.user.first_name} {msg.user.last_name}
                  </p>
                )}
                <p className="text-sm">{msg.message_text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(msg.created_at).toLocaleTimeString([], {
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

