import React from 'react';

interface PhotoGalleryProps {
  photos: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  return (
    <div id="gallery" className="my-12">
      <h2 className="text-3xl font-bold text-gold text-center mb-6">Photo Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105">
            <img src={photo} alt={`Wedding Photo ${index + 1}`} className="w-full h-64 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;