import { HeartIcon } from 'lucide-react';
const SuccessStories = () => {
  const stories = [{
    id: 1,
    name: 'Tim Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    pet: 'Buddy',
    story: 'We lost Buddy at a park after he got spooked by fireworks. Thanks to the community here, we were able to find him within 48 hours. The map feature was incredibly helpful!'
  }, {
    id: 2,
    name: 'Michael & Linda',
    avatar: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
    pet: 'Whiskers',
    story: 'Our microchipped cat got out one night and was found 3 miles away. A kind stranger used this platform to reach us. We are eternally grateful for this service.'
  }];
  return <section className="mb-12">
      <h2 className="text-2xl font-bold text-purple-600 text-center mb-8">
        Success Stories
      </h2>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Happy reunions made possible by our community
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map(story => <div key={story.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <img src={story.avatar} alt={story.name} className="w-12 h-12 rounded-full object-cover mr-4" />
              <div>
                <h3 className="font-bold">{story.name}</h3>
                <p className="text-sm text-gray-600">Found {story.pet}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm mb-4">"{story.story}"</p>
            <div className="flex justify-end">
              <HeartIcon className="h-5 w-5 text-red-500" />
            </div>
          </div>)}
      </div>
    </section>;
};
export default SuccessStories;