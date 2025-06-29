import { useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollHelper } from "../../../utils/scrollHelper";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOnclick = (section: string)=> {

    scrollHelper(section)

  }

  return (
    <header className="fixed top-0 left-0 w-full bg-opacity-80 backdrop-blur-md text-black shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center px-10">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <img
              src="/insourcextechlogo.png"
              alt="insourcextech"
              className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12"
            />
            <div className="text-md sm:text-xl md:text-2xl mx-4 font-bold tracking-tighter">
              <span className="text-blue-500">Insource Bridge </span>
              <span className="text-black">Technologies</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {[ "Solutions", "Services", "About", "Mission", "Contact"].map((item) => (
              <button
                key={item}
                onClick={()=> handleOnclick(item.toLowerCase())}
                className="px-4 py-2 rounded-md hover:text-blue-900 transition-all duration-300 font-medium cursor-pointer hover:scale-105"
                >
                {item}
              </button>
            ))}
            {/* <button className="ml-4 px-6 py-2 bg-blue-500 rounded-md hover:bg-blue-400 transition-colors duration-300 font-medium">
              Get Started
            </button> */}
          </nav>

          {/* Mobile Menu Button   */}
          <div className="lg:hidden">
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
          <nav className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              {["Solutions", "Services", "About", "Mission", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={()=> handleOnclick(item.toLowerCase())}
                  className="px-4 py-2 rounded-md hover:text-blue-900 transition-all duration-300 font-medium cursor-pointer hover:scale-105"
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
