 import { MapPinIcon } from 'lucide-react';
const PetMap = () => {
  return <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <MapPinIcon className="h-5 w-5 mr-2 text-purple-600" />
        Recent Reports Map
      </h2>
      <div className="bg-gray-100 rounded-lg overflow-hidden h-[300px] md:h-[400px] relative">
        {/* Map would be implemented with Leaflet in a real app */}
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-0.118092,51.509865,11,0/1200x400?access_token=pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xhYmNkZWYxMjM0NiJ9.abcdefghijklmnopqrstuvwxyz')"
      }}></div>
        {/* Example pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white p-2 rounded-lg shadow-md text-xs max-w-[150px]">
            <div className="font-bold text-purple-600">Lost Dog - Max</div>
            <div className="text-gray-600">Golden Retriever</div>
            <div className="text-gray-600">2 days ago</div>
          </div>
          <div className="w-4 h-4 bg-purple-600 rounded-full mx-auto -mt-1 relative z-10"></div>
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-4">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200">
          Lost Pets
        </button>
        <button className="bg-white hover:bg-gray-100 text-purple-600 border border-purple-600 px-4 py-2 rounded-full text-sm transition-colors duration-200">
          Found Pets
        </button>
        <button className="bg-white hover:bg-gray-100 text-purple-600 border border-purple-600 px-4 py-2 rounded-full text-sm transition-colors duration-200">
          Reunited
        </button>
      </div>
    </section>;
};
export default PetMap;