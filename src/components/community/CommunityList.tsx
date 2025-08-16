import { Community } from "./CommunityApp";

interface Props {
  communities: Community[];
  onCreate: () => void;
  onSelectCommunity: (c: Community) => void;
}

const categories = [
  "Pet Lovers",
  "Dog Owners",
  "Cat Lovers",
  "Pet Training",
  "Pet Health",
  "Adoption",
];

export default function CommunityList({ communities, onCreate, onSelectCommunity }: Props) {
  return (
    <>
      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto">
        <div onClick={onCreate} className="flex flex-col items-center cursor-pointer">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-500 text-white text-2xl">
            +
          </div>
          <p className="text-xs mt-1">Create</p>
        </div>
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border-2 border-purple-500"></div>
            <p className="text-xs mt-1">{cat}</p>
          </div>
        ))}
      </div>

      {/* Community List */}
      <div className="mt-6 space-y-3">
        {communities.map((c) => (
          <div
            key={c.id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow cursor-pointer"
            onClick={() => onSelectCommunity(c)}
          >
            <div>
              <h3 className="font-bold text-purple-700">{c.name}</h3>
              <p className="text-sm text-gray-600">{c.message}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">{c.time}</span>
              {c.unread > 0 && (
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full mt-1">
                  {c.unread}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
