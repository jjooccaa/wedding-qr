import React, { useState, useEffect, useCallback, useRef } from 'react';
import CarouselSlide from './CarouselSlide';
import CarouselButton from './CarouselButton';
import { BUCKET_NAME, SupabaseService } from '../../services/supabase.service';

const Carousel: React.FC = () => {
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollToCurrentSlide = () => {
      const slideWidth = container.clientWidth;
      container.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth'
      });
    };

    scrollToCurrentSlide();
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-neutral-900">
      <h2 className="text-2xl font-bold text-white pb-6 text-center">Poslednje dodate fotografije</h2>
      <div
        ref={containerRef}
        className="flex overflow-x-hidden snap-x snap-mandatory scrollbar-hide"
      >
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          slides.map((slide, index) => (
            <CarouselSlide
              key={index}
              imgSrc={slide}
              isActive={index === currentIndex}
            />
          ))
        )}
      </div>
      {slides.length > 1 && (
        <>
          <CarouselButton direction="prev" onClick={prevSlide} />
          <CarouselButton direction="next" onClick={nextSlide} />
        </>
      )}
    </div>
  );
};

export default Carousel;
