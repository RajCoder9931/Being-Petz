import React from 'react';
import { ArrowLeftIcon, UploadIcon, MapPinIcon } from 'lucide-react';
interface FoundPetFormProps {
  onBack: () => void;
}
const FoundPetForm: React.FC<FoundPetFormProps> = ({
  onBack
}) => {
  return <div className="space-y-6">
      <button onClick={onBack} className="flex items-center text-purple-600 hover:text-purple-800 mb-4">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back to options
      </button>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pet Type
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option value="">Select pet type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Breed (if known)
            </label>
            <input type="text" placeholder="Enter breed if known" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input type="text" placeholder="Enter color(s)" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Approximate Size
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option value="">Select size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Where Found
          </label>
          <div className="flex">
            <input type="text" placeholder="Enter address or location" className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <button className="bg-gray-100 p-2 border border-l-0 border-gray-300 rounded-r-md">
              <MapPinIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            When did you find the pet?
          </label>
          <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Has collar or tags?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="has_collar" value="yes" className="mr-2" />
              Yes
            </label>
            <label className="flex items-center">
              <input type="radio" name="has_collar" value="no" className="mr-2" />
              No
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea rows={3} placeholder="Provide additional details about the pet, any distinctive features, behavior, etc." className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Photos
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <UploadIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Drag and drop photos here, or click to select files
            </p>
            <input type="file" className="hidden" multiple accept="image/*" />
            <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Select Photos
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Status of Pet
          </label>
          <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option value="">Select status</option>
            <option value="with_me">With me temporarily</option>
            <option value="shelter">Taken to a shelter</option>
            <option value="spotted">Spotted but not captured</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input type="text" placeholder="Enter your name" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Phone
            </label>
            <input type="tel" placeholder="Enter your phone number" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input type="email" placeholder="Enter your email" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4 border-t">
        <button onClick={onBack} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200">
          Cancel
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200">
          Submit Report
        </button>
      </div>
    </div>;
};
export default FoundPetForm;