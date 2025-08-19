import React from 'react';
import { CheckCircleIcon, CalendarIcon, MapPinIcon } from 'lucide-react';
const ReunionsTimeline = () => {
  const timelineEvents = [{
    id: 1,
    title: 'Max the Golden Retriever',
    description: 'Found by community member after missing for two days',
    time: '2 hours ago',
    icon: 'check'
  }, {
    id: 2,
    title: 'Whiskers the Tabby',
    description: 'Reunited with family after 3 days missing',
    time: '1 day ago',
    icon: 'calendar'
  }, {
    id: 3,
    title: 'Rocky the Parakeet',
    description: "Found at a neighbor's home successfully returned to its owner, 3 days ago",
    icon: 'map'
  }];
  return <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center justify-center">
        <CheckCircleIcon className="h-5 w-5 mr-2 text-purple-600" />
        Recent Reunions Timeline
      </h2>
      <div className="space-y-4 max-w-3xl mx-auto">
        {timelineEvents.map(event => <div key={event.id} className="flex items-start">
            <div className="bg-purple-100 rounded-full p-2 mr-4 mt-1">
              {event.icon === 'check' && <CheckCircleIcon className="h-5 w-5 text-purple-600" />}
              {event.icon === 'calendar' && <CalendarIcon className="h-5 w-5 text-purple-600" />}
              {event.icon === 'map' && <MapPinIcon className="h-5 w-5 text-purple-600" />}
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-purple-700">{event.title}</h3>
                <span className="text-xs text-gray-500">{event.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            </div>
          </div>)}
      </div>
    </section>;
};
export default ReunionsTimeline;