import React, { useState } from 'react';

interface UploadPhotoProps {
  onUpload: (photo: string) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFile(null);
    }
  };

  return (
    <div id="upload" className="my-12">
      <h2 className="text-3xl font-bold text-gold text-center mb-6">Upload Photo</h2>
      <form onSubmit={handleSubmit} className="bg-black p-6 rounded-lg shadow-lg mx-auto max-w-lg border border-gold">
        <div className="mb-4">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="block w-full text-sm text-gray-300 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-black hover:file:bg-gold-700"
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-gold text-black font-semibold rounded-lg shadow-md hover:bg-gold-dark focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-opacity-75"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadPhoto;