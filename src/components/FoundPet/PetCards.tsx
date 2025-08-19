import React from 'react';
import { PhoneIcon, InfoIcon, HeartIcon, MapPinIcon } from 'lucide-react';
interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  status: 'lost' | 'found' | 'reunited';
  location: string;
  days: number;
  image: string;
}
interface PetCardsProps {
  title: string;
  status: 'lost' | 'found' | 'reunited';
  limit?: number;
}
const PetCards: React.FC<PetCardsProps> = ({
  title,
  status,
  limit = 3
}) => {
  // Sample data for all pets
  const allPets: Pet[] = [{
    id: 1,
    name: 'Max',
    type: 'Dog',
    breed: 'Golden Retriever',
    status: 'lost',
    location: 'Central Park, New York',
    days: 2,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=662&q=80'
  }, {
    id: 2,
    name: 'Whiskers',
    type: 'Cat',
    breed: 'Persian',
    status: 'found',
    location: 'Near Main Street',
    days: 3,
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80'
  }, {
    id: 3,
    name: 'Sunny',
    type: 'Bird',
    breed: 'Cockatiel',
    status: 'lost',
    location: 'Oak Park, Westside',
    days: 1,
    image: 'https://images.unsplash.com/photo-1522858547137-f98604bcca5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  }, {
    id: 4,
    name: 'Bella',
    type: 'Dog',
    breed: 'Labrador',
    status: 'found',
    location: 'Downtown, 5th Avenue',
    days: 1,
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  }, {
    id: 5,
    name: 'Oliver',
    type: 'Cat',
    breed: 'Tabby',
    status: 'reunited',
    location: 'Riverside Park',
    days: 5,
    image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  }, {
    id: 6,
    name: 'Charlie',
    type: 'Dog',
    breed: 'Beagle',
    status: 'reunited',
    location: 'Lincoln Park',
    days: 7,
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80'
  }, {
    id: 7,
    name: 'Milo',
    type: 'Cat',
    breed: 'Maine Coon',
    status: 'lost',
    location: 'East Village',
    days: 4,
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  }, {
    id: 8,
    name: 'Daisy',
    type: 'Dog',
    breed: 'Poodle',
    status: 'found',
    location: 'West End Avenue',
    days: 2,
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  }, {
    id: 9,
    name: 'Leo',
    type: 'Rabbit',
    breed: 'Holland Lop',
    status: 'reunited',
    location: 'Battery Park',
    days: 3,
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  }];
  // Filter pets based on status
  const filteredPets = allPets.filter(pet => pet.status === status).slice(0, limit);
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lost':
        return 'bg-red-500';
      case 'found':
        return 'bg-blue-500';
      case 'reunited':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  // Get button color based on status
  const getButtonColor = (status: string) => {
    switch (status) {
      case 'lost':
        return 'bg-red-600 hover:bg-red-700';
      case 'found':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'reunited':
        return 'bg-green-600 hover:bg-green-700';
      default:
        return 'bg-purple-600 hover:bg-purple-700';
    }
  };
  // Get view all button color
  const getViewAllButtonColor = (status: string) => {
    switch (status) {
      case 'lost':
        return 'border-red-600 text-red-600 hover:bg-red-50';
      case 'found':
        return 'border-blue-600 text-blue-600 hover:bg-blue-50';
      case 'reunited':
        return 'border-green-600 text-green-600 hover:bg-green-50';
      default:
        return 'border-purple-600 text-purple-600 hover:bg-purple-50';
    }
  };
  // Get section icon
  const getSectionIcon = (status: string) => {
    switch (status) {
      case 'lost':
        return <MapPinIcon className="h-5 w-5 mr-2 text-red-600" />;
      case 'found':
        return <InfoIcon className="h-5 w-5 mr-2 text-blue-600" />;
      case 'reunited':
        return <HeartIcon className="h-5 w-5 mr-2 text-green-600" />;
      default:
        return null;
    }
  };
  return <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        {getSectionIcon(status)}
        {title}
      </h2>
      {filteredPets.length === 0 ? <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No {status} pets found at the moment.</p>
        </div> : <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map(pet => <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
                  <div className={`absolute top-2 right-2 ${getStatusColor(pet.status)} text-white text-xs font-bold px-2 py-1 rounded uppercase`}>
                    {pet.status}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{pet.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {pet.type} • {pet.breed}
                      </p>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {pet.days} {pet.days === 1 ? 'day' : 'days'} ago
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{pet.location}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-sm font-medium transition-colors duration-200">
                      Details
                    </button>
                    <button className={`flex-1 ${getButtonColor(pet.status)} text-white py-2 rounded text-sm font-medium transition-colors duration-200`}>
                      {pet.status === 'reunited' ? 'Story' : 'Contact'}
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
          <button className={`mx-auto mt-8 block border ${getViewAllButtonColor(status)} px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200`}>
            View all {status} pets
          </button>
        </>}
    </section>;
};
export default PetCards;