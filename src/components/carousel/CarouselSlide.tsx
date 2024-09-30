import { motion } from 'framer-motion';
import { CarouselSlideProps } from '../../types/props/CarouselSlideProps';

const CarouselSlide = ({ imgSrc }: CarouselSlideProps) => {
  return (
    <motion.div
      className="w-full h-full"
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={imgSrc}
        alt="Carousel slide"
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </motion.div>
  );
};

export default CarouselSlide;
