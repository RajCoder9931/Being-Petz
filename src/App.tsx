import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Footer from './components/dashboard/Footer';
import Profile from './components/Profile/Petprofile';
import Blogs from './components/dashboard/Blogs';
import Events from './components/dashboard/Events';
import PetParent from './components/Profile/PetParent';
import Chats from './components/community/CommunityApp';
import Services from './components/services/services';
import Settings from "./pages/Settings";
import PetList from './pages/PetList';
import PetDetails from './pages/PetDetails';
import Managerecord from './components/Profile/Managerecords';
import ProfilePage from './components/Profile/Profilepage';
import FriendRequestPanel from './pages/FriendRequestPage';
import NotificationsPanel from './pages/NotificationsPage';
import EditProfile from './components/Profile/Editprofile';
import PrivacySettingsPage from './pages/PrivacySettingsPage';
import Foundpet from './pages/Lostfound';
   export function App() {
  return (
    <Router>
      <Routes>
        
        {/* Default route -> Login Page */}
        <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/home" element={<DashboardPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pet-profile" element={<Profile />} />
        <Route path="/managerecord" element={<Managerecord/>} />
        <Route path="pet-parents" element={<PetParent />} />
        <Route path="/blog" element={<Blogs />} />  
        <Route path="/events" element={<Events />} />
        <Route path="chats" element={<Chats />} />
        <Route path="services" element={<Services />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/adopt-pet" element={<PetList />} />
        <Route path="/pet/:id" element={<PetDetails />} />
        <Route path="/friend-requests" element={<FriendRequestPanel />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPanel />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/privacy-settings" element={<PrivacySettingsPage />} />
        <Route path="/report-found-pet" element={<Foundpet />} />
        </Routes>
      <Footer />
    </Router>
  );
}
