import dog from "../assets/user/1.jpg";
import adopt2 from "../assets/img/adopt2.avif";
import adopt3 from "../assets/img/adopt3.avif"; // add Luna image
import adopt4 from "../assets/img/adopt4.avif"; // add Max image
import adopt5 from "../assets/img/adopt5.avif"; // add Bulla image

export interface Pet {
  id: number;
  name: string;
  age: string;
  breed: string;
  gender: string;
  location: string;
  description: string;
  image: string;
  health: string;
  vaccination: string;
  diet: string;
  grooming: string;
  contact: string;
  email: string;
}

export const pets: Pet[] = [
  {
    id: 1,
    name: "Rufus",
    age: "2.5 years",
    breed: "Labrador Retriever",
    gender: "Male",
    location: "Rohini, Delhi, India",
    description:
      "Rufus is a perfectly healthy and friendly Labrador Retriever with a calm and gentle temperament. He’s great with children and other pets, making him an ideal family dog. Rufus loves going for walks, playing fetch, and cuddling on the couch. He’s house-trained, knows basic commands, and has a sweet disposition that will melt your heart.",
    image: dog,
    health: "Perfectly fit",
    vaccination: "Fully vaccinated",
    diet: "Premium dog food",
    grooming: "Regular brushing needed",
    contact: "+91 99955 44700",
    email: "adopt.rufus@example.com",
  },
  {
    id: 2,
    name: "Bruno",
    age: "6 years",
    breed: "German Shepherd",
    gender: "Male",
    location: "Los Angeles, USA",
    description:
      "Gentle and loyal German Shepherd who is great with kids and other pets. Loves guarding and protecting family.",
    image: adopt2,
    health: "Healthy",
    vaccination: "Fully vaccinated",
    diet: "Balanced dog food",
    grooming: "Weekly brushing",
    contact: "+1 555-444-7890",
    email: "adopt.bruno@example.com",
  },
  {
    id: 3,
    name: "Luna",
    age: "1.8 years",
    breed: "Golden Retriever",
    gender: "Female",
    location: "Bangalore, India",
    description:
      "Luna is a playful and affectionate Golden Retriever who loves outdoor activities and being around people. She’s well-socialized, friendly with children, and enjoys splashing in water. Luna is house-trained and responds to basic commands.",
    image: adopt3,
    health: "Excellent",
    vaccination: "Fully vaccinated",
    diet: "Nutritious home-cooked meals",
    grooming: "Requires weekly grooming",
    contact: "+91 98765 43210",
    email: "adopt.luna@example.com",
  },
  {
    id: 4,
    name: "Max",
    age: "3 years",
    breed: "Beagle",
    gender: "Male",
    location: "Mumbai, India",
    description:
      "Max is a cheerful Beagle with a curious personality. He loves sniffing around, exploring new places, and enjoys playing fetch. He’s affectionate and bonds quickly with family members. Perfect for families who enjoy walks and active playtime.",
    image: adopt4,
    health: "Healthy",
    vaccination: "Up to date",
    diet: "High-protein dog food",
    grooming: "Low maintenance, regular baths",
    contact: "+91 91234 56789",
    email: "adopt.max@example.com",
  },
  {
    id: 5,
    name: "Bulla",
    age: "4.5 years",
    breed: "Rottweiler",
    gender: "Male",
    location: "Delhi NCR, India",
    description:
      "Bulla is a strong and loyal Rottweiler with a protective instinct but a gentle side with family members. He’s obedient, trained, and very intelligent. Best suited for experienced pet owners who can provide him with structured training and care.",
    image: adopt5,
    health: "Fit and active",
    vaccination: "Fully vaccinated",
    diet: "High-protein diet",
    grooming: "Minimal grooming, occasional brushing",
    contact: "+91 90011 22334",
    email: "adopt.bulla@example.com",
  },
];
