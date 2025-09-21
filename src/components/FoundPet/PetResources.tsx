import React from "react";
import {
  TagIcon,
  CircleDotIcon,
  FileTextIcon,
  ShieldIcon,
  HomeIcon,
  PhoneIcon,
  HeartPulseIcon,
} from "lucide-react";
import { motion } from "framer-motion";

// -------------------- Types --------------------
interface Resource {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
}

interface Contact {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  action: string;
  href?: string; // optional direct link (tel: / maps etc.)
}

// -------------------- Component --------------------
const CombinedResources: React.FC = () => {
  const resources: Resource[] = [
    {
      id: 1,
      title: "ID Tags",
      description:
        "Ensure your pet wears ID tags with your contact information at all times.",
      icon: <TagIcon className="h-8 w-8 text-purple-600" />,
      link: "#",
    },
    {
      id: 2,
      title: "Microchipping",
      description: "A permanent ID that can never fall off or be removed.",
      icon: <CircleDotIcon className="h-8 w-8 text-purple-600" />,
      link: "#",
    },
    {
      id: 3,
      title: "Lost Pet Flyers",
      description: "Create effective lost pet flyers with our templates.",
      icon: <FileTextIcon className="h-8 w-8 text-purple-600" />,
      link: "#",
    },
    {
      id: 4,
      title: "Prevention Guide",
      description: "Tips to keep your pet from getting lost.",
      icon: <ShieldIcon className="h-8 w-8 text-purple-600" />,
      link: "#",
    },
  ];

  const contacts: Contact[] = [
    {
      id: 1,
      title: "Local Animal Shelters",
      description: "Call your local shelter to report lost or found pets",
      icon: <HomeIcon className="h-6 w-6 text-orange-500" />,
      action: "Call Now",
      href: "tel:+911234567890",
    },
    {
      id: 2,
      title: "Animal Control",
      description: "Report strays or injured animals",
      icon: <PhoneIcon className="h-6 w-6 text-purple-600" />,
      action: "Call Now",
      href: "tel:+919876543210",
    },
    {
      id: 3,
      title: "Local Shelters",
      description: "Check if your pet was brought to a shelter",
      icon: <HeartPulseIcon className="h-6 w-6 text-green-500" />,
      action: "Find Nearby",
      href: "https://maps.google.com",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-4"
    >
      <div className="bg-white shadow-xl rounded-2xl p-8 mx-auto">
        {/* Title */}
        <h2 className="text-2xl font-bold text-purple-600 text-center mb-2">
          Pet Safety Resources & Emergency Help
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Tools, tips, and contacts to keep your pets safe
        </p>

        {/* Resources */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            🐾 Pet Resources
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="bg-gray-50 rounded-lg shadow-sm p-6 text-center hover:shadow-md transition"
              >
                <div className="flex justify-center mb-4">{resource.icon}</div>
                <h4 className="font-bold mb-2 text-gray-800">
                  {resource.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {resource.description}
                </p>
                <a
                  href={resource.link}
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium inline-block"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            📞 Emergency Contacts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600 hover:shadow-lg transition"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    {contact.icon}
                  </div>
                  <h4 className="font-bold text-gray-800">{contact.title}</h4>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {contact.description}
                </p>
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center bg-white border border-purple-600 text-purple-600 hover:bg-purple-50 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {contact.action}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CombinedResources;
