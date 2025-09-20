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

interface Message {
  id: number;
  user_id: number;
  message_type: "text" | "image" | "video" | "poll";
  message_text?: string | null;
  media_path?: string | null;
  poll_options?: string[];
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
interface PollOption {
  id: number;
  poll_id: number;
  option_text: string;
  votes?: number; // after vote
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

  // Media file selection
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setMediaFile(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleVote = async (pollId: number, optionId: number) => {
    if (!user || !optionId) return;
    try {
      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/community/vote-poll",
        {
          poll_id: pollId,
          option_id: optionId,
          parent_id: user.id,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status) {
        // Mark this poll as voted
        setVotedPolls({ ...votedPolls, [pollId]: true });
        // Refetch messages to show updated votes
        fetchMessages();
      }
    } catch (error) {
      console.error("Failed to vote", (error as AxiosError).response?.data || error);
    }
  };

  // Send text/image/video
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

      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/community/send-message",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 200 || res.status === 201) {
        setNewMessage("");
        setMediaFile(null);
        setPreview(null);
        fetchMessages();
      }
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
        question: pollQuestion.trim(),   // <-- changed
        options: pollOptions,           // <-- changed
        isReply: 0,
        message_id: null,
      };

      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/community/send-message",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200 || res.status === 201) {
        setPollQuestion("");
        setPollOptions(["", ""]);
        setIsPollOpen(false);
        fetchMessages();
      }
    } catch (error) {
      console.error("Failed to send poll", (error as AxiosError).response?.data || error);
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
          <p className="text-gray-500 text-sm text-center">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">No messages yet</p>
        ) : (
          messages.map((msg) => {
            const isCurrentUser = msg.user_id === user?.id;
            const username = `${msg.user.first_name} ${msg.user.last_name}`;

            return (
              <div
                key={msg.id}
                className={`flex gap-2 ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                {!isCurrentUser && (
                  <img
                    src={msg.user.profile ? `https://argosmob.com/being-petz/public/${msg.user.profile}` : catIcon}
                    alt={username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}

                <div
                  className={`max-w-xs p-2 rounded-lg ${isCurrentUser ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                >
                  {!isCurrentUser && <p className="text-xs font-bold">{username}</p>}

                  {/* Text message */}
                  {msg.message_type === "text" && <p className="text-sm">{msg.message_text}</p>}

                  {/* Image message */}
                  {msg.message_type === "image" && msg.media_path && (
                    <img
                      src={`https://argosmob.com/being-petz/public/${msg.media_path}`}
                      alt="sent media"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}

                  {/* Video message */}
                  {msg.message_type === "video" && msg.media_path && (
                    <video
                      src={`https://argosmob.com/being-petz/public/${msg.media_path}`}
                      controls
                      className="w-40 h-32 rounded-lg"
                    />
                  )}

                  {/* Poll message */}
                  {/* Poll message */}
                  {msg.message_type === "poll" && msg.poll && (
                    <div className="bg-yellow-50 p-4 rounded-xl shadow-sm">
                      <p className="font-semibold text-sm mb-3">{msg.poll.question}</p>

                      {!votedPolls[msg.poll.id] ? (
                        <form>
                          {msg.poll.options.map((opt) => (
                            <label
                              key={opt.id}
                              className="flex items-center justify-between p-2 mb-2 border rounded-lg cursor-pointer hover:bg-yellow-100 transition"
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`poll-${msg.poll.id}`}
                                  value={opt.id}
                                  checked={selectedOption === opt.id}
                                  onChange={() => setSelectedOption(opt.id)}
                                  className="accent-yellow-500"
                                />
                                <span className="text-sm">{opt.option_text}</span>
                              </div>
                            </label>
                          ))}

                          <button
                            type="button"
                            disabled={!selectedOption}
                            onClick={() => selectedOption && handleVote(msg.poll.id, selectedOption)}
                            className="mt-2 w-full bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 disabled:opacity-50 transition"
                          >
                            Submit Vote
                          </button>
                        </form>
                      ) : (
                        <div className="space-y-2">
                          {msg.poll.options.map((opt) => {
                            const totalVotes = msg.poll.options.reduce(
                              (acc, o) => acc + (o.votes ? o.votes.length : 0),
                              0
                            );
                            const percent = totalVotes ? ((opt.votes?.length || 0) / totalVotes) * 100 : 0;

                            return (
                              <div key={opt.id} className="flex flex-col">
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">{opt.option_text}</span>
                                  <span className="text-xs text-gray-600">
                                    {opt.votes?.length || 0} votes ({percent.toFixed(1)}%)
                                  </span>
                                </div>
                                <div className="bg-yellow-200 rounded-full h-4 overflow-hidden">
                                  <div
                                    className="bg-yellow-500 h-4 rounded-full transition-all duration-500"
                                    style={{ width: `${percent}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
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
            );
          })
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className="flex flex-col p-3 border-t gap-2">
        {preview && (
          <div className="mb-2 relative">
            {mediaFile?.type.startsWith("video") ? (
              <video src={preview} className="w-40 h-32 rounded-lg" controls />
            ) : (
              <img src={preview} className="w-32 h-32 rounded-lg" alt="preview" />
            )}
            <button
              onClick={() => { setMediaFile(null); setPreview(null); }}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />

          {/* Media Upload */}
          <input type="file" accept="image/*,video/*" onChange={handleMediaChange} className="hidden" id="mediaInput" />
          <label htmlFor="mediaInput" className="px-4 py-2 bg-gray-200 rounded-full cursor-pointer">
            📎
          </label>

          {/* Poll Button */}
          <button
            onClick={() => setIsPollOpen(true)}
            className="px-4 py-2 bg-yellow-400 text-white rounded-full"
          >
            🗳️
          </button>

          {/* Send Message */}
          <button
            onClick={handleSendMessage}
            disabled={sending}
            className="px-4 py-2 bg-purple-600 text-white rounded-full"
          >
            {sending ? "Sending..." : "Send"}
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
