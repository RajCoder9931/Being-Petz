import { Phone, Mail, MapPin } from "lucide-react";

interface ServiceDetailsCardProps {
  service: string;
  onBook: (name: string) => void;
  onClose: () => void;
}

interface Provider {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  details: string[];
}

export default function ServiceDetailsCard({ service, onBook, onClose }: ServiceDetailsCardProps) {
  const getProviders = (): Provider[] => {
    switch (service) {
      case "Pet Training":
        return [
          {
            name: "Pawsitive Training Co.",
            contactPerson: "Amit Sharma",
            phone: "9876543210",
            email: "amit@pawsitive.com",
            address: "101 Main St, Sector 5, Delhi",
            details: ["Certifications: ABC Certified Trainer", "Experience: 4-6 years", "License: Pet Board License"]
          },
          {
            name: "Canine Masters",
            contactPerson: "Rohit Verma",
            phone: "9823456789",
            email: "rohit@caninemasters.com",
            address: "45 Dog St, Gurgaon",
            details: ["Experience: 7 years", "Specialization: Guard Dogs", "License: K9 Board Approved"]
          },
          {
            name: "Happy Tails Training",
            contactPerson: "Neha Gupta",
            phone: "9811223344",
            email: "neha@happytails.com",
            address: "23 Park Rd, Noida",
            details: ["Positive Reinforcement", "Obedience & Tricks", "Experience: 5 years"]
          }
        ];
      
      case "Pet Store":
        return [
          {
            name: "Happy Paws Store",
            contactPerson: "Ramesh Kumar",
            phone: "9811122233",
            email: "store@happypaws.com",
            address: "22 Market Rd, Noida",
            details: ["Categories: Food, Toys, Accessories", "Delivery: Available", "Timings: 9 AM – 9 PM"]
          },
          {
            name: "Pet Bazaar",
            contactPerson: "Suresh Yadav",
            phone: "9876549876",
            email: "info@petbazaar.com",
            address: "Mall Road, Delhi",
            details: ["Premium Food Brands", "Aquarium Section", "Open: 10 AM – 10 PM"]
          },
          {
            name: "Furry Mart",
            contactPerson: "Priya Sharma",
            phone: "9800112233",
            email: "support@furrymart.com",
            address: "Sector 14, Gurgaon",
            details: ["Vet Medicines", "Pet Grooming Products", "Discounts on Bulk Orders"]
          }
        ];

      case "Grooming":
        return [
          {
            name: "Furry Friends Grooming",
            contactPerson: "Priya Mehta",
            phone: "9876001122",
            email: "grooming@furryfriends.com",
            address: "55 Park Ave, Gurgaon",
            details: ["Haircut", "Nail Clipping", "Spa & Bath"]
          },
          {
            name: "Pawfect Groomers",
            contactPerson: "Arjun Singh",
            phone: "9811778899",
            email: "info@pawfect.com",
            address: "MG Road, Delhi",
            details: ["Full Grooming Package", "De-shedding", "Ear Cleaning"]
          },
          {
            name: "Pet Style Studio",
            contactPerson: "Sneha Kapoor",
            phone: "9822334455",
            email: "studio@petstyle.com",
            address: "Rajouri Garden, Delhi",
            details: ["Creative Grooming", "Puppy Spa", "Teeth Cleaning"]
          }
        ];

      case "Pet Shelter":
        return [
          {
            name: "Pawsitive Sanctuary",
            contactPerson: "Amit Sharma",
            phone: "9876543210",
            email: "shelter@pawsitive.com",
            address: "101 Main St, Sector 5, Delhi",
            details: ["Adoption Programs", "Medical Aid", "Volunteering"]
          },
          {
            name: "Canine Sanctuary",
            contactPerson: "Rohit Verma",
            phone: "9823456789",
            email: "shelter@canine.com",
            address: "45 Dog St, Gurgaon",
            details: ["Rescue & Rehab", "Pet Foster Care", "Awareness Programs"]
          },
          {
            name: "Happy Tails Sanctuary",
            contactPerson: "Neha Gupta",
            phone: "9811223344",
            email: "shelter@happytails.com",
            address: "23 Park Rd, Noida",
            details: ["Emergency Shelter", "Food & Medicine Supply", "Adoption Drives"]
          }
        ];
      default:
        return [];
    }
  };

  const providers = getProviders();

  return (
    <div className="bg-white rounded-lg w-full max-w-6xl shadow-lg overflow-y-auto max-h-[90vh]">
      <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
        <h2 className="font-bold text-purple-700">{service}</h2>
        <button onClick={onClose} className="text-gray-500">✖</button>
      </div>

      {providers.length === 0 ? (
        <p className="p-6">No details available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {providers.map((provider, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm space-y-2 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{provider.name}</h3>
                <p className="text-gray-600">Contact: {provider.contactPerson}</p>

                <div className="text-sm text-gray-700 space-y-1 mt-2">
                  <p className="flex items-center gap-2"><Phone size={16}/> {provider.phone}</p>
                  <p className="flex items-center gap-2"><Mail size={16}/> {provider.email}</p>
                  <p className="flex items-center gap-2"><MapPin size={16}/> {provider.address}</p>
                </div>

                <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                  {provider.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-3">
                <a
                  href={`tel:${provider.phone}`}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm flex-1 text-center"
                >
                  Call
                </a>
                <button
                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm flex-1"
                  onClick={() => onBook(provider.name)}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
