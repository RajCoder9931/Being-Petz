import React from 'react';
import { TagIcon, CircleDotIcon, FileTextIcon, ShieldIcon } from 'lucide-react';
const PetResources = () => {
  const resources = [{
    id: 1,
    title: 'ID Tags',
    description: 'Ensure your pet wears ID tags with your contact information at all times.',
    icon: <TagIcon className="h-8 w-8 text-purple-600" />,
    link: '#'
  }, {
    id: 2,
    title: 'Microchipping',
    description: 'A permanent ID that can never fall off or be removed.',
    icon: <CircleDotIcon className="h-8 w-8 text-purple-600" />,
    link: '#'
  }, {
    id: 3,
    title: 'Lost Pet Flyers',
    description: 'Create effective lost pet flyers with our templates.',
    icon: <FileTextIcon className="h-8 w-8 text-purple-600" />,
    link: '#'
  }, {
    id: 4,
    title: 'Prevention Guide',
    description: 'Tips to keep your pet from getting lost.',
    icon: <ShieldIcon className="h-8 w-8 text-purple-600" />,
    link: '#'
  }];
  return <section className="mb-12">
      <h2 className="text-2xl font-bold text-purple-600 text-center mb-4">
        Pet Resources
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Tools and information to help keep your pets safe
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {resources.map(resource => <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex justify-center mb-4">{resource.icon}</div>
            <h3 className="font-bold mb-2">{resource.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
            <a href={resource.link} className="text-purple-600 hover:text-purple-800 text-sm font-medium inline-block">
              Learn More →
            </a>
          </div>)}
      </div>
    </section>;
};
export default PetResources;