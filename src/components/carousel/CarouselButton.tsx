import React from 'react';
import { CarouselButtonProps } from '../../types/props/CarouselButtonProps';

const CarouselButton: React.FC<CarouselButtonProps> = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === 'prev' ? 'left-2' : 'right-2'
      } bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 hover:bg-opacity-75 transition-all duration-200`}
    >
      {direction === 'prev' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
};

export default CarouselButton;