interface ServiceFormsProps {
    service: string;
    onClose: () => void;
  }
  
  export default function ServiceForms({ service, onClose }: ServiceFormsProps) {
    switch (service) {
      case "Pet Training":
        return (
          <div className="p-6 space-y-3">
            <label>Pet Type</label>
            <select className="w-full border p-2 rounded">
              <option>Select pet type</option>
            </select>
            <label>Training Type</label>
            <select className="w-full border p-2 rounded">
              <option>Select training type</option>
            </select>
            <label>Preferred Date</label>
            <input type="date" className="w-full border p-2 rounded" />
            <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
              Request Training Session
            </button>
          </div>
        );
  
        case "Tracking":
            return (
              <div className="p-6 space-y-3">
                <label className="block">Tracking Device ID</label>
                <input type="text" placeholder="Enter tracking device ID" className="w-full border p-2 rounded" />
                <label className="block">Pet Name</label>
                <input type="text" placeholder="Enter pet name" className="w-full border p-2 rounded" />
                <label className="flex items-center space-x-2">
                  <input type="checkbox" /> <span>This is an emergency (pet is lost)</span>
                </label>
                <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
                  Track My Pet
                </button>
              </div>
            );
      
          case "Pet Behaviourists":
            return (
              <div className="p-6 space-y-3">
                <label>Pet Type</label>
                <select className="w-full border p-2 rounded">
                  <option>Select pet type</option>
                </select>
                <label>Behavioral Issue</label>
                <select className="w-full border p-2 rounded">
                  <option>Select issue</option>
                </select>
                <textarea placeholder="Describe the issue" className="w-full border p-2 rounded"></textarea>
                <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
                  Request Consultation
                </button>
              </div>
            );
      
          case "Pet Park":
            return (
              <div className="p-6 space-y-3">
                <label>Location</label>
                <select className="w-full border p-2 rounded">
                  <option>Select location</option>
                </select>
                <label>Pet Type</label>
                <select className="w-full border p-2 rounded">
                  <option>Select pet type</option>
                </select>
                <label>Visit Date</label>
                <input type="date" className="w-full border p-2 rounded" />
                <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
                  Check Park Availability
                </button>
              </div>
            );
      
          case "Pet Sitters":
            return (
              <div className="p-6 space-y-3">
                <label>Pet Type</label>
                <select className="w-full border p-2 rounded">
                  <option>Select pet type</option>
                </select>
                <label>Service Needed</label>
                <select className="w-full border p-2 rounded">
                  <option>Select service</option>
                </select>
                <label>Dates Needed</label>
                <input type="date" className="w-full border p-2 rounded" />
                <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
                  Find Pet Sitters
                </button>
              </div>
            );
      
          case "Pet Shelter":
            return (
              <div className="p-6 space-y-3">
                <label className="block">I want to:</label>
                <div className="flex space-x-4">
                  <label><input type="radio" name="shelter" /> Adopt a pet</label>
                  <label><input type="radio" name="shelter" /> Foster a pet</label>
                  <label><input type="radio" name="shelter" /> Volunteer</label>
                </div>
                <label>Pet Type</label>
                <select className="w-full border p-2 rounded">
                  <option>Any</option>
                </select>
                <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
                  Continue
                </button>
              </div>
            );
      
          case "Grooming":
            return (
              <div className="p-6 space-y-3">
                <label>Pet Type</label>
                <select className="w-full border p-2 rounded">
                  <option>Select pet type</option>
                </select>
                <label>Service</label>
                <select className="w-full border p-2 rounded">
                  <option>Select service</option>
                </select>
                <label>Preferred Date & Time</label>
                <input type="datetime-local" className="w-full border p-2 rounded" />
                <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
                  Book Grooming
                </button>
              </div>
            );
      
          case "Pet Store":
            return (
              <div className="p-6 space-y-3">
                <label>Category</label>
                <select className="w-full border p-2 rounded">
                  <option>Select category</option>
                </select>
                <label>Search Products</label>
                <input type="text" placeholder="What are you looking for?" className="w-full border p-2 rounded" />
                <label className="flex items-center space-x-2">
                  <input type="checkbox" /> <span>I need delivery</span>
                </label>
                <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={onClose}>
                  Browse Store
                </button>
              </div>
            );
        
      default:
        return null;
    }
  }
  
