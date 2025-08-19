import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import LostPetForm from './LostPetForm';
import FoundPetForm from './FoundPetForm';
interface ReportPetModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ReportPetModal: React.FC<ReportPetModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formType, setFormType] = useState<'lost' | 'found' | null>(null);
  if (!isOpen) return null;
  const handleBackToOptions = () => {
    setFormType(null);
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {formType === null ? 'Report a Pet' : formType === 'lost' ? 'Report a Lost Pet' : 'Report a Found Pet'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          {formType === null ? <div className="space-y-6">
              <p className="text-gray-600">
                Please select the type of report you would like to submit:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onClick={() => setFormType('lost')} className="bg-red-100 hover:bg-red-200 border-2 border-red-300 text-red-700 p-6 rounded-lg flex flex-col items-center justify-center transition-colors duration-200">
                  <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" alt="Lost Pet" className="w-24 h-24 object-cover rounded-full mb-4" />
                  <h3 className="text-lg font-bold mb-2">I Lost My Pet</h3>
                  <p className="text-sm text-center">
                    Submit information about your missing pet
                  </p>
                </button>
                <button onClick={() => setFormType('found')} className="bg-green-100 hover:bg-green-200 border-2 border-green-300 text-green-700 p-6 rounded-lg flex flex-col items-center justify-center transition-colors duration-200">
                  <img src="https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" alt="Found Pet" className="w-24 h-24 object-cover rounded-full mb-4" />
                  <h3 className="text-lg font-bold mb-2">I Found a Pet</h3>
                  <p className="text-sm text-center">
                    Report a pet you've found and help reunite them with their
                    owner
                  </p>
                </button>
              </div>
            </div> : formType === 'lost' ? <LostPetForm onBack={handleBackToOptions} /> : <FoundPetForm onBack={handleBackToOptions} />}
        </div>
      </div>
    </div>;
};
export default ReportPetModal;