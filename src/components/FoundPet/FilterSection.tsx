 import { FilterIcon } from 'lucide-react';
const FilterSection = () => {
  return <section className="py-8 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Lost & Found Pets</h2>
        <span className="text-sm text-gray-500">Showing 24 results</span>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pet Type
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option value="">All Types</option>
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="bird">Birds</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option value="">All Statuses</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
              <option value="reunited">Reunited</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code or City
            </label>
            <input type="text" placeholder="Enter zip code" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200">
            Reset
          </button>
        </div>
      </div>
    </section>;
};
export default FilterSection;