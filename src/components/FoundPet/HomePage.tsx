import { useState } from "react";
import BannerAd from "./BannerAd";
import HeroSection from "./HeroSection";
import FilterSection from "./FilterSection";
import PetMap from "./PetMap";
import PetCards from "./PetCards";
import SuccessStories from "./SuccessStories";
import ReunionsTimeline from "./ReunionsTimeline";
import PetResources from "./PetResources";
import EmergencyContacts from "./EmergencyContacts";
import Header from "../dashboard/Header";    
import Sidebar from "../dashboard/sidebar";  

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white pt-12">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />


        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <BannerAd />
          <HeroSection />
          <main className="flex-grow px-4 md:px-8 lg:px-16 max-w-7xl mx-auto w-full">
            <FilterSection />
            <PetMap />
            {/* Lost Pets Section */}
            <PetCards title="Lost Pets" status="lost" />
            {/* Found Pets Section */}
            <PetCards title="Found Pets" status="found" />
            {/* Reunited Pets Section */}
            <PetCards title="Reunited Pets" status="reunited" />
            <SuccessStories />
            <ReunionsTimeline />
            <PetResources />
            <EmergencyContacts />
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
