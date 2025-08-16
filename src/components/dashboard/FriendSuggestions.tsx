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
        <div className="bg-purple-600 px-4 py-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Friend Suggestions</h3>
          <button className="bg-white text-purple-600 px-3 py-1 rounded-lg text-sm">
            See All
          </button>
        </div>
        <div className="p-4 space-y-4">
          {suggestions.map((s, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                    {s.mutual} Mutual Friends
                  </span>
                </div>
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm">
                Add Friend
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FriendSuggestions;
  