import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CarouselSlide from './CarouselSlide';
import CarouselButton from './CarouselButton';
import { BUCKET_NAME, SupabaseService } from '../../services/supabase.service';

const Carousel = () => {
  const [slides, setSlides] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const imagePaths = await SupabaseService.fetchImagePaths(BUCKET_NAME);
      const imageUrls = await SupabaseService.generatePublicUrls(BUCKET_NAME, imagePaths);
      setSlides(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, [slides.length]);

  return (
    <div className="bg-cream-50 w-full pt-20 pb-12">
      <div className="relative max-w-4xl mx-auto">
        <h2 className="text-3xl font-script text-olive-600 pb-8 text-center">
          Najnovije fotografije
        </h2>
        <div
          ref={containerRef}
          className="relative h-[28rem] overflow-hidden"
        >
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-olive-500"></div>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <CarouselSlide
                  imgSrc={slides[currentIndex]}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        {slides.length > 1 && (
          <>
            <CarouselButton direction="prev" onClick={prevSlide} />
            <CarouselButton direction="next" onClick={nextSlide} />
          </>
        )}
        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-olive-600' : 'bg-olive-400'
                }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
