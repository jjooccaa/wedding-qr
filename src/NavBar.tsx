import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-black border-b border-gold">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl text-gold font-bold">Our Wedding</h1>
        <div>
          <a href="#gallery" className="text-gold hover:text-white mx-2">Gallery</a>
          <a href="#upload" className="text-gold hover:text-white mx-2">Upload Photos</a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;