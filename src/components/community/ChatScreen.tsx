import { useState, useEffect, useRef, useMemo } from "react";
import axios, { AxiosError } from "axios";
import catIcon from "../../assets/img/cat.jpg";

// Types
interface User {
  id: number;
  first_name: string;
  last_name: string;
  profile?: string | null;
}

interface PollVote {
  id: number;
  option_id: number;
  user: User;
}

interface PollOption {
  id: number;
  poll_id: number;
  option_text: string;
  votes?: PollVote[];
}

interface Poll {
  id: number;
  message_id: number;
  question: string;
  options: PollOption[];
}

interface Message {
  id: number;
  user_id: number;
  message_type: "text" | "image" | "video" | "poll";
  message_text?: string | null;
  media_path?: string | null;
  poll?: Poll;
  created_at: string;
  user: User;
}

interface ChatScreenProps {
  community: { id: number; name: string };
  onBack: () => void;
}

interface ApiResponse {
  status: boolean;
  data: Message[];
}

export default function ChatScreen({ community, onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isPollOpen, setIsPollOpen] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [votedPolls, setVotedPolls] = useState<{ [pollId: number]: boolean }>({});
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null); // for three-dot menu

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const user = useMemo(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }, []);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages
  const fetchMessages = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.post<ApiResponse>(
        "https://argosmob.com/being-petz/public/api/v1/community/get-messages",
        { community_id: community.id, user_id: user.id },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessages(res.data.data || []);
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

  // Handle media
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setMediaFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle voting
  const handleVote = async (pollId: number, optionId: number) => {
    if (!user || !optionId) return;
    try {
      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/community/vote-poll",
        { poll_id: pollId, option_id: optionId, parent_id: user.id },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status) {
        setVotedPolls({ ...votedPolls, [pollId]: true });
        fetchMessages();
      }
    } catch (error) {
      console.error("Failed to vote", (error as AxiosError).response?.data || error);
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (!user || (newMessage.trim() === "" && !mediaFile)) return;
    setSending(true);

    try {
      const formData = new FormData();
      formData.append("community_id", community.id.toString());
      formData.append("parent_id", user.id.toString());
      formData.append("isReply", "0");
      formData.append("message_id", "");
      formData.append(
        "message_type",
        mediaFile ? (mediaFile.type.startsWith("video") ? "video" : "image") : "text"
      );
      if (newMessage.trim() !== "") formData.append("message_text", newMessage.trim());
      if (mediaFile) formData.append("media", mediaFile);

      await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/community/send-message",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setNewMessage("");
      setMediaFile(null);
      setPreview(null);
      fetchMessages();
    } catch (error) {
      console.error("Failed to send message", (error as AxiosError).response?.data || error);
    } finally {
      setSending(false);
    }
  };

  // Send poll
  const handleSendPoll = async () => {
    if (!user || pollQuestion.trim() === "" || pollOptions.some(opt => opt.trim() === "")) return;
    setSending(true);

    try {
      const payload = {
        community_id: community.id,
        parent_id: user.id,
        message_type: "poll",
        question: pollQuestion.trim(),
        options: pollOptions,
        isReply: 0,
        message_id: null,
      };

      await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/community/send-message",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setPollQuestion("");
      setPollOptions(["", ""]);
      setIsPollOpen(false);
      fetchMessages();
    } catch (error) {
      console.error("Failed to send poll", (error as AxiosError).response?.data || error);
    } finally {
      setSending(false);
    }
  };

  // Delete message
  const handleDeleteMessage = async (msgId: number) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/community/delete-message-for-all",
        { message_id: msgId, user_id: user.id },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status) {
        setMessages(messages.filter((m) => m.id !== msgId));
      } else {
        alert("Failed to delete message");
      }
    } catch (error) {
      console.error("Failed to delete message", (error as AxiosError).response?.data || error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-50 to-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-purple-100/60">
        <button
          onClick={onBack}
          className="text-purple-700 font-bold px-3 py-1 rounded-lg hover:bg-purple-200 transition"
        >
          ← Back
        </button>
        <h2 className="text-lg font-bold text-purple-800 ml-4">{community.name}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <p className="text-gray-500 text-sm text-center">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">No messages yet</p>
        ) : (
          messages.map((msg) => {
            const isCurrentUser = msg.user.id === user?.id;
            const username = `${msg.user.first_name} ${msg.user.last_name}`;

            return (
              <div
                key={msg.id}
                className={`flex gap-2 ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                {/* Profile pic only for others */}
                {!isCurrentUser && (
                  <img
                    src={msg.user.profile ? `https://argosmob.com/being-petz/public/${msg.user.profile}` : catIcon}
                    alt={username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}

                <div className="relative max-w-xs p-3 rounded-2xl shadow bg-gray-100 text-gray-900">
                  {/* Three-dot menu for current user */}
                  {isCurrentUser && (
                    <div className="absolute top-1 right-1">
                      <div className="relative">
                        <button
                          onClick={() => setMenuOpenId(menuOpenId === msg.id ? null : msg.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ⋯
                        </button>
                        {menuOpenId === msg.id && (
                          <div className="absolute right-0 mt-1 w-24 bg-white border rounded-md shadow-lg z-10">
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Name for others */}
                  {!isCurrentUser && <p className="text-xs font-bold mb-1">{username}</p>}

                  {/* Text */}
                  {msg.message_type === "text" && <p className="text-sm">{msg.message_text}</p>}

                  {/* Image */}
                  {msg.message_type === "image" && msg.media_path && (
                    <img
                      src={`https://argosmob.com/being-petz/public/${msg.media_path}`}
                      alt="sent media"
                      className="w-40 h-40 object-cover rounded-lg"
                    />
                  )}

                  {/* Video */}
                  {msg.message_type === "video" && msg.media_path && (
                    <video
                      src={`https://argosmob.com/being-petz/public/${msg.media_path}`}
                      controls
                      className="w-52 h-40 rounded-lg"
                    />
                  )}

                  {/* Poll */}
                  {msg.message_type === "poll" && msg.poll && (
                    <div className="bg-yellow-50 p-4 rounded-xl shadow-sm mt-2">
                      <p className="font-semibold text-sm mb-3">{msg.poll.question}</p>
                      {!votedPolls[msg.poll.id] ? (
                        <form>
                          {msg.poll.options.map((opt) => (
                            <label
                              key={opt.id}
                              className="flex items-center gap-2 p-2 mb-2 border rounded-lg cursor-pointer hover:bg-yellow-100 transition"
                            >
                              <input
                                type="radio"
                                name={`poll-${msg.poll.id}`}
                                value={opt.id}
                                checked={selectedOption === opt.id}
                                onChange={() => setSelectedOption(opt.id)}
                                className="accent-yellow-500"
                              />
                              <span className="text-sm">{opt.option_text}</span>
                            </label>
                          ))}
                          <button
                            type="button"
                            disabled={!selectedOption}
                            onClick={() => selectedOption && handleVote(msg.poll.id, selectedOption)}
                            className="mt-2 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 disabled:opacity-50 transition"
                          >
                            Submit Vote
                          </button>
                        </form>
                      ) : (
                        <div className="space-y-3">
                          {msg.poll.options.map((opt) => {
                            const totalVotes = msg.poll.options.reduce(
                              (acc, o) => acc + (o.votes?.length || 0),
                              0
                            );
                            const percent = totalVotes
                              ? ((opt.votes?.length || 0) / totalVotes) * 100
                              : 0;

                            return (
                              <div key={opt.id} className="flex flex-col gap-1">
                                <div className="flex justify-between text-sm">
                                  <span>{opt.option_text}</span>
                                  <span className="text-gray-600">
                                    {opt.votes?.length || 0} votes ({percent.toFixed(1)}%)
                                  </span>
                                </div>
                                <div className="bg-yellow-200 rounded-full h-3 overflow-hidden">
                                  <div
                                    className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${percent}%` }}
                                  ></div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {opt.votes?.map((vote) => (
                                    <span
                                      key={vote.id}
                                      className="text-xs bg-gray-200 rounded-full px-2 py-0.5"
                                    >
                                      {vote.user.first_name}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-[10px] opacity-70 mt-1">
                    {new Date(msg.created_at).toLocaleString([], {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className="flex flex-col p-3 border-t bg-white">
        {preview && (
          <div className="mb-2 relative">
            {mediaFile?.type.startsWith("video") ? (
              <video src={preview} className="w-40 h-32 rounded-lg" controls />
            ) : (
              <img src={preview} className="w-32 h-32 rounded-lg" alt="preview" />
            )}
            <button
              onClick={() => {
                setMediaFile(null);
                setPreview(null);
              }}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />

          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            className="hidden"
            id="mediaInput"
          />
          <label
            htmlFor="mediaInput"
            className="px-3 py-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition"
          >
            📎
          </label>

          <button
            onClick={() => setIsPollOpen(true)}
            className="px-3 py-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition"
          >
            🗳️
          </button>

          <button
            onClick={handleSendMessage}
            disabled={sending}
            className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
          >
            {sending ? "..." : "Send"}
          </button>
        </div>

        {/* Poll Modal */}
        {isPollOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-xl w-96 flex flex-col gap-3 shadow-lg">
              <h3 className="font-bold text-lg text-center">Create Poll</h3>

              <input
                type="text"
                placeholder="Poll question"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
              />

              {pollOptions.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...pollOptions];
                    newOptions[idx] = e.target.value;
                    setPollOptions(newOptions);
                  }}
                />
              ))}

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setPollOptions([...pollOptions, ""])}
                  className="flex-1 bg-gray-200 rounded-lg p-2 hover:bg-gray-300 transition"
                >
                  + Add Option
                </button>
                <button
                  onClick={handleSendPoll}
                  className="flex-1 bg-yellow-500 text-white rounded-lg p-2 hover:bg-yellow-600 transition"
                >
                  Send
                </button>
                <button
                  onClick={() => setIsPollOpen(false)}
                  className="flex-1 bg-red-500 text-white rounded-lg p-2 hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
