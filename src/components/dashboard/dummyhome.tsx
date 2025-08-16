import friend1 from "../assets/friend1.jpg";
import friend2 from "../assets/friend2.jpg";
import friend3 from "../assets/friend3.jpg";
import friend4 from "../assets/friend4.jpg";
import friend5 from "../assets/friend5.jpg";
import friend6 from "../assets/friend6.jpg";

export default function PetFriends() {
  const friends = [
    { name: "Michael Chen", img: friend1 },
    { name: "Jessica Wong", img: friend2 },
    { name: "David Kim", img: friend3 },
    { name: "Amanda Lee", img: friend4 },
    { name: "Robert Garcia", img: friend5 },
    { name: "Sophia Martinez", img: friend6 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
          Pet Friends
        </h2>
        <button className="text-purple-600 text-sm">See All</button>
      </div>

      <div className="mt-4 space-y-4">
        {friends.map((friend, i) => (
          <div key={i} className="flex items-center gap-3">
            <img
              src={friend.img}
              alt={friend.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <p>{friend.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
