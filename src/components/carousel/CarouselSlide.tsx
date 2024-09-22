import React from 'react';

interface CarouselSlideProps {
  imgSrc: string;
  isActive: boolean;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ imgSrc, isActive }) => {
  return (
    <div className={`w-full flex-shrink-0 snap-center ${isActive ? 'opacity-100' : 'opacity-50'} transition-opacity duration-300`}>
      <img
        src={imgSrc}
        alt="Carousel slide"
        className="w-full h-64 object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default CarouselSlide;
