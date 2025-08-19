 import { HomeIcon, PhoneIcon, HeartPulseIcon } from 'lucide-react';
 import Footer from '../dashboard/Footer';
const EmergencyContacts = () => {
  const contacts = [{
    id: 1,
    title: 'Local Animal Shelters',
    description: 'Call your local shelter to report lost or found pets',
    icon: <HomeIcon className="h-6 w-6 text-orange-500" />,
    action: 'Call Now'
  }, {
    id: 2,
    title: 'Animal Control',
    description: 'Report strays or injured animals',
    icon: <PhoneIcon className="h-6 w-6 text-purple-600" />,
    action: 'Call Now'
  }, {
    id: 3,
    title: 'Local Shelters',
    description: 'Check if your pet was brought to a shelter',
    icon: <HeartPulseIcon className="h-6 w-6 text-green-500" />,
    action: 'Find Nearby'
  }];
  return <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center justify-center">
        <PhoneIcon className="h-5 w-5 mr-2 text-purple-600" />
        Emergency Contacts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contacts.map(contact => <div key={contact.id} className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600">
            <div className="flex items-center mb-4">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                {contact.icon}
              </div>
              <h3 className="font-bold">{contact.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{contact.description}</p>
            <button className="w-full bg-white border border-purple-600 text-purple-600 hover:bg-purple-50 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              {contact.action}
            </button>
          </div>)}
      </div>
      <Footer />

    </section>;
};
export default EmergencyContacts;