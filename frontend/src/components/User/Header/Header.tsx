import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-opacity-80 backdrop-blur-md text-black shadow-lg z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center px-10">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-white text-blue-900 rounded-full h-10 w-10 flex items-center justify-center font-bold text-xl">
              IX
            </div>
            <div className="text-2xl font-bold tracking-tighter">
              <span className="text-black">Insource</span>
              <span className="text-blue-500">X</span>
              <span className="text-black">Tech</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {['About', 'Services', 'Mission', 'Contact'].map((item) => (
              <button
                key={item}
                className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium"
              >
                {item}
              </button>
            ))}
            {/* <button className="ml-4 px-6 py-2 bg-blue-500 rounded-md hover:bg-blue-400 transition-colors duration-300 font-medium">
              Get Started
            </button> */}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              {['About', 'Services', 'Mission', 'Contact'].map((item) => (
                <button
                  key={item}
                  className="px-4 py-2 text-left rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium"
                >
                  {item}
                </button>
              ))}
              {/* <button className="mt-2 px-6 py-2 bg-blue-500 rounded-md hover:bg-blue-400 transition-colors duration-300 font-medium">
                Get Started
              </button> */}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
