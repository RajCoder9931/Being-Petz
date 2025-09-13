import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Bookmark, Search, X } from "lucide-react";
import axios from "axios";

interface ServiceDetailsCardProps {
  service: string;
  onBook: (name: string) => void;
  onClose: () => void;
}

interface Provider {
  id: number;
  name: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  details: { label: string; value: string }[];
}

export default function ServiceDetailsCard({ service, onBook, onClose }: ServiceDetailsCardProps) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const apiMap: Record<string, string> = {
    "Pet Store": "https://argosmob.com/being-petz/public/api/v1/pet/shops",
    "Grooming": "https://argosmob.com/being-petz/public/api/v1/pet/groomers",
    "Pet Training": "https://argosmob.com/being-petz/public/api/v1/pet/trainers",
    "Pet Walking": "https://argosmob.com/being-petz/public/api/v1/pet/walkers",
    "Pet Behaviourists": "https://argosmob.com/being-petz/public/api/v1/pet/behaviourists",
    "Pet Resort": "https://argosmob.com/being-petz/public/api/v1/pet/resorts",
    "Pet Shelter": "https://argosmob.com/being-petz/public/api/v1/pet/shelters",
    "Pet Sitting": "https://argosmob.com/being-petz/public/api/v1/pet/sitters",
    "Pet Walkers": "https://argosmob.com/being-petz/public/api/v1/pet/walkers",
  };

  const mapApiDataToProviders = (data: any[], service: string): Provider[] => {
    return data.map((item, index) => {
      switch (service) {
        case "Pet Training":
          return {
            id: index,
            name: item.training_business_name ?? "Unknown Trainer",
            contactPerson: item.trainer_name ?? "N/A",
            contactNumber: item.contact_number ?? "N/A",
            email: item.email ?? "N/A",
            address: item.address_line1 ?? "N/A",
            details: [
              { label: "Certifications", value: item.certifications ?? "N/A" },
              { label: "Experience", value: item.experience ?? "N/A" },
              { label: "Licenses", value: item.licenses ?? "N/A" },
            ],
          };
        case "Pet Store":
          return {
            id: index,
            name: item.shop_name ?? "Unknown Store",
            contactPerson: item.owner_name ?? "N/A",
            contactNumber: item.contact_number ?? "N/A",
            email: item.email ?? "N/A",
            address: item.address_line_1 ?? "N/A",
            details: [
              { label: "Registration Number", value: item.registration_number ?? "N/A" },
              { label: "GST No", value: item.gst_number ?? "N/A" },
              { label: "Licenses", value: item.licenses ?? "N/A" },
            ],
          };
        case "Grooming":
          return {
            id: index,
            name: item.business_name?? "Unknown Groomer",
            contactPerson: item.owner_name ?? "N/A",
            contactNumber: item.contact_number ?? "N/A",
            email: item.email ?? "N/A",
            address: item.address_line1 ?? "N/A",
            details: [
              { label: "Certifications", value: item.certifications ?? "N/A" },
              { label: "Experience", value: item.experience_range ?? "N/A" },
              { label: "Licenses", value: item.licenses ?? "N/A" },
            ],
          };
          case "Pet Shelter":
            return {
              id: index,
              name: item.shelter_name?? "Unknown Groomer",
              contactPerson: item.owner_name ?? "N/A",
              contactNumber: item.contact_number ?? "N/A",
              email: item.email ?? "N/A",
              address: item.address_line1 ?? "N/A",
              details: [
                { label: "Registration Number", value: item.legal_registration_number ?? "N/A" },
                { label: "Experience", value: item.years_of_operation ?? "N/A" },
                { label: "Ngo Collaboration", value: item.ngo_collaboration ?? "N/A" },
              ],
            };
            case "Pet Sitting":
            return {
              id: index,
              name: item.business_name?? "Unknown Groomer",
              contactPerson: item.owner_name ?? "N/A",
              contactNumber: item.contact_number ?? "N/A",
              email: item.email ?? "N/A",
              address: item.address_line1 ?? "N/A",
              details: [
                { label: "Certifications", value: item.certifications ?? "N/A" },
                { label: "Experience", value: item.experience ?? "N/A" },
                { label: "Licenses", value: item.licenses ?? "N/A" },
              ],
            };
            case "Pet Walkers":
            return {
              id: index,
              name: item.business_name?? "Unknown Groomer",
              contactPerson: item.walker_name ?? "N/A",
              contactNumber: item.contact_number ?? "N/A",
              email: item.email ?? "N/A",
              address: item.address_line1 ?? "N/A",
              details: [
                { label: "Certifications", value: item.certifications ?? "N/A" },
                { label: "Experience", value: item.experience ?? "N/A" },
                { label: "Licenses", value: item.licenses ?? "N/A" },
              ],
            };
            case "Pet Behaviourists":
            return {
              id: index,
              name: item.business_name?? "Unknown Groomer",
              contactPerson: item.full_name?? "N/A",
              contactNumber: item.contact_number ?? "N/A",
              email: item.email ?? "N/A",
              address: item.address_line1 ?? "N/A",
              details: [
                { label: "Certifications", value: item.certifications ?? "N/A" },
                { label: "Experience", value: item.experience ?? "N/A" },
                { label: "Licenses", value: item.licenses ?? "N/A" },
              ],
            };
            case "Pet Resort":
            return {
              id: index,
              name: item.resort_name?? "Unknown Groomer",
              contactPerson: item.owner_name?? "N/A",
              contactNumber: item.contact_number ?? "N/A",
              email: item.email ?? "N/A",
              address: item.address_line1 ?? "N/A",
              details: [
                { label: "Certifications", value: item.certifications ?? "N/A" },
                { label: "Experience", value: item.experience_years ?? "N/A" },
                { label: "Registration Number", value: item.registration_number ?? "N/A" },
              ],
            };

        default:
          return {
            id: index,
            name: "Unknown",
            contactPerson: "N/A",
            contactNumber: "N/A",
            email: "N/A",
            address: "N/A",
            details: [],
          };
      }
    });
  };

  useEffect(() => {
    const fetchProviders = async () => {
      const url = apiMap[service];
      if (!url) return;

      try {
        setLoading(true);
        const res = await axios.get(url);
        if (res.data?.data) {
          const mappedProviders = mapApiDataToProviders(res.data.data, service);
          setProviders(mappedProviders);
          setFilteredProviders(mappedProviders);
        }
      } catch (err) {
        console.error("Error fetching:", err);
        setProviders([]);
        setFilteredProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [service]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredProviders(providers);
      return;
    }
    const filtered = providers.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProviders(filtered);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredProviders(providers);
  };

  return (
    <div className="bg-white rounded-lg w-full max-w-6xl shadow-lg overflow-y-auto max-h-[90vh]">
      <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
        <h2 className="font-bold text-purple-700">{service}</h2>
        <button onClick={onClose} className="text-gray-500">✖</button>
      </div>

      {/* Search Section */}
      <div className="flex gap-2 p-4 border-b relative">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:outline-purple-500"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-500"
          >
            <X size={16} />
          </button>
        )}
        <button
          onClick={handleSearch}
          className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-1"
        >
          <Search size={16} /> Search
        </button>
      </div>

      {loading ? (
        <p className="p-6 text-gray-500">Loading...</p>
      ) : filteredProviders.length === 0 ? (
        <p className="p-6">No details available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {filteredProviders.map((p) => (
            <div key={p.id} className="p-4 border rounded-xl shadow space-y-3 bg-white">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                <p className="text-gray-600 text-sm">Trainer: {p.contactPerson}</p>
              </div>

              <div className="text-sm text-gray-700 space-y-2 border-b pb-2">
                <p className="flex items-center gap-2 text-purple-600">
                  <Phone size={16} /> 
                  <a href={`tel:${p.contactNumber}`} className="hover:underline">
                    {p.contactNumber}
                  </a>
                </p>
                <p className="flex items-center gap-2 text-purple-600">
                  <Mail size={16} /> 
                  <a href={`mailto:${p.email}`} className="hover:underline">
                    {p.email}
                  </a>
                </p>
                <p className="flex items-center gap-2 text-purple-600">
                  <MapPin size={16} /> {p.address}
                </p>
              </div>

              {p.details.length > 0 && (
                <div>
                  <h4 className="text-purple-700 font-semibold mb-1">
                    {service} Details
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-800">
                    {p.details.map((d, i) => (
                      <li key={i}>
                        <span className="font-medium">{d.label}:</span> {d.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2 pt-3">
                <a
                  href={`tel:${p.contactNumber}`}
                  className="bg-purple-600 text-white px-3 py-2 rounded flex-1 text-center"
                >
                  Call
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-3 py-2 rounded flex-1 text-center"
                >
                  Directions
                </a>
                <button
                  className="bg-orange-500 text-white px-3 py-2 rounded flex-1 flex items-center justify-center gap-1"
                  onClick={() => onBook(p.name)}
                >
                  <Bookmark size={16}/> Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
