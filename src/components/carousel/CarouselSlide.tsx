import { useState } from 'react';
import { motion } from 'framer-motion';
import { CarouselSlideProps } from '../../types/props/CarouselSlideProps';
import Spinner from '../spinner/Spinner';

const CarouselSlide = ({ imgSrc }: CarouselSlideProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className="w-full h-full relative"
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.4 }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <img
        src={imgSrc}
        alt="Carousel slide"
        className={`w-full h-full object-cover rounded-lg shadow-lg ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      />
    </motion.div>
  );
};

export default CarouselSlide;
