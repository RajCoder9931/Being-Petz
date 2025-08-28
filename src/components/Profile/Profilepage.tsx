import { useLocation } from "react-router-dom";
import ProfileCard from "./Profilecard";

const ProfilePage = () => {
  const { state } = useLocation() as { state: any };

  if (!state) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ProfileCard
        profile={state.img}
        name={state.name}
        location="Unknown City"
        bio="This is a sample user bio. Can be fetched from backend."
        pets={2}
        friends={state.friends.replace(" friends", "")}
        posts={50}
        isOwner={false}
      />
    </div>
  );
};

export default ProfilePage;
