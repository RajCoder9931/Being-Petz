import { MapPin } from "lucide-react";

interface ProfileCardProps {
  profile: string;
  name: string;
  location: string;
  bio: string;
  pets: number;
  friends: number;
  posts: number;
  isOwner?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  name,
  location,
  bio,
  pets,
  friends,
  posts,
  isOwner = false,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-2xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-300 h-32 rounded-t-2xl -m-6 mb-6"></div>

      {/* Profile Info */}
      <div className="flex items-center -mt-16">
        <img
          src={profile}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white shadow"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-purple-700">{name}</h2>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <MapPin size={16} className="mr-1" />
            {location}
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-600 mt-4">{bio}</p>

      {/* Stats */}
      <div className="flex space-x-8 mt-4 text-center">
        <div>
          <p className="text-lg font-bold text-purple-700">{pets}</p>
          <p className="text-sm text-gray-500">Pets</p>
        </div>
        <div>
          <p className="text-lg font-bold text-purple-700">{friends}</p>
          <p className="text-sm text-gray-500">Friends</p>
        </div>
        <div>
          <p className="text-lg font-bold text-purple-700">{posts}</p>
          <p className="text-sm text-gray-500">Posts</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        {isOwner ? (
          <>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm shadow">
              Edit Profile
            </button>
            <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm shadow">
              Share
            </button>
          </>
        ) : (
          <>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm shadow">
              Following
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow">
              Message
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
