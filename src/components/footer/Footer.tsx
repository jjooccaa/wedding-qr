import React from 'react';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://rs.linkedin.com/in/jovan-antic-a805b724b' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/jovan_antic96' },
    { name: 'Facebook', icon: FaFacebook, url: 'https://www.facebook.com/nebitan.profil.12' },
  ];

  return (
    <footer className="bg-cream-100 text-olive-800 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-olive-700">Kontakt</h3>
          </div>
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-olive-600 hover:text-olive-800 transition-colors duration-200"
                aria-label={link.name}
              >
                <link.icon className="w-8 h-8" />
              </a>
            ))}
          </div>
          <div className="mt-8 text-center text-sm text-olive-600">
            <p>&copy; {new Date().getFullYear()} Jovan Antić. Sva prava zadržana</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
