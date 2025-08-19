import   { useState } from 'react';
import { SearchIcon, PlusCircleIcon } from 'lucide-react';
import ReportPetModal from './ReportPetModal';
const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return <div className="w-full bg-purple-600 py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Reuniting Lost Pets With Their Families
        </h1>
        <p className="text-purple-100 text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Our community helps connect lost pets with their owners through
          advanced matching technology
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <div className="relative w-full">
            <input type="text" placeholder="Search for a pet..." className="w-full py-3 px-4 pr-10 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <button onClick={openModal} className="bg-white hover:bg-purple-100 text-purple-700 font-medium py-3 px-6 rounded-full flex items-center justify-center transition-colors duration-200 whitespace-nowrap">
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Report Pet
          </button>
        </div>
      </div>
      <ReportPetModal isOpen={isModalOpen} onClose={closeModal} />
    </div>;
};
export default HeroSection;