import { Community } from "./CommunityApp";
import pet1 from "../../assets/img/adopt2.avif";
import pet2 from "../../assets/img/adopt3.avif";
import pet3 from "../../assets/img/adopt4.avif";
import pet4 from "../../assets/img/adopt5.avif";

interface Props {
  communities: Community[];
  onCreate: () => void;
  onSelectCommunity: (c: Community) => void;
}

const categories = [
  { name: "Pet Lovers", image:pet1},
  { name: "Dog Owners", image:pet2},
  { name: "Cat Lovers", image:pet3},
  { name: "Pet Training", image:pet4},
  { name: "Pet Health", image:pet2},
  { name: "Adoption", image:pet1},
];

export default function CommunityList({ communities, onCreate, onSelectCommunity }: Props) {
  return (
    <>
      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto">
        {/* Create new community */}
        <div onClick={onCreate} className="flex flex-col items-center cursor-pointer">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-500 text-white text-2xl">
            +
          </div>
          <p className="text-xs mt-1">Create</p>
        </div>

        {/* Category List */}
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border-2 border-purple-500 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs mt-1">{cat.name}</p>
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
