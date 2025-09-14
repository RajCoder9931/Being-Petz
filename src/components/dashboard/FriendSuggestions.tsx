interface Friend {
  name: string;
  desc: string;
  mutual: number;
  img: string;
}

interface FriendSuggestionsProps {
  suggestions: Friend[];
}

const FriendSuggestions: React.FC<FriendSuggestionsProps> = ({ suggestions }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      {/* Header */}
      <div className="bg-purple-600 px-4 py-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Friend Suggestions</h3>
        <button className="bg-white text-purple-600 px-3 py-1 rounded-lg text-sm">
          See All
        </button>
      </div>

      {/* Cards Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {suggestions.map((s, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-3 shadow-sm flex flex-col items-center text-center"
          >
            <img
              src={s.img}
              alt={s.name}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <p className="font-medium">{s.name}</p>
            <p className="text-sm text-gray-500">{s.desc}</p>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full mt-1">
              {s.mutual} Mutual Friends
            </span>

            <div className="flex gap-2 mt-3">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm">
                Add Friend
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendSuggestions;
