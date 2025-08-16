import { useEffect, useState } from 'react';

interface CarouselItem {
  image: string;
  title: string;
  description: string;
}

interface ImageCarouselProps {
  items: CarouselItem[];
  interval?: number;
  className?: string;
}

const ImageCarousel = ({
  items,
  interval = 5000,
  className = ''
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
        setFade(true);
      }, 500); // fade out before switching
    }, interval);
    return () => clearInterval(timer);
  }, [items, interval]);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col items-center bg-transparent">
      {/* Image */}
      <div
        className={`relative overflow-hidden ${className} mb-4 h-48`} // increased height from h-32 to h-48
        style={{ minHeight: '192px' }} // also updated minHeight
      >
        {items.map((item, index) => (
          <img
            key={index}
            src={item.image}
            alt={`Carousel image ${index + 1}`}
            className={`w-full h-full object-contain absolute top-0 left-0 transition-opacity duration-500 ${
              index === currentIndex && fade ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Title */}
      <h2
        className={`text-lg font-bold mb-2 text-center transition-opacity duration-500 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {items[currentIndex].title}
      </h2>

      {/* Description */}
      <p
        className={`text-center text-sm max-w-xs transition-opacity duration-500 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {items[currentIndex].description}
      </p>
    </div>
  );
};

export default ImageCarousel;
