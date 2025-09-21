import { useState } from "react";
import { SearchIcon, PlusCircleIcon } from "lucide-react";
import ReportPetModal from "./ReportPetModal";
import petBg from "../../assets/img/postdog.png";  

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className="w-full relative bg-purple-600 py-16 md:py-24 px-4 md:px-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${petBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-purple-700 bg-opacity-80"></div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Reuniting Lost Pets <br className="hidden md:block" />
          With Their Families
        </h1>

        {/* Subheading */}
        <p className="text-purple-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Our community helps connect lost pets with their owners
          <br className="hidden md:block" />
          through advanced matching technology
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-full flex items-center justify-center transition-colors duration-200">
            <SearchIcon className="h-5 w-5 mr-2" />
            Search Pets
          </button>
          <button
            onClick={openModal}
            className="bg-white text-purple-700 hover:bg-purple-100 font-medium py-3 px-6 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Report Pet
          </button>
        </div>
      </div>

      {/* Modal */}
      <ReportPetModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default HeroSection;
