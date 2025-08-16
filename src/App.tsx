 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Footer from './components/dashboard/Footer';
import Profile from './components/Profile/Petprofile';
import PetParent from './components/Profile/PetParent';
import Chats from './components/community/CommunityApp';
import Services from './pages/services';
import Settings from "./pages/Settings";
import PetList from './pages/PetList';
import PetDetails from './pages/PetDetails';
 export function App() {
  return <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="pet-parents" element={<PetParent/>}/>
        <Route path="chats"  element={<Chats/>}/> 
        <Route path="services"  element={<Services/>}/>
        <Route path="settings" element={<Settings />} />
        <Route path="/adopt-pet" element={<PetList />} />
        <Route path="/pet/:id" element={<PetDetails />} />


      </Routes>
    </Router>;
}