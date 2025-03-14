import { Menu, LogOut } from 'lucide-react';

interface pageProps{
    toggleSidebar : ()=> void
}

const Header = ({ toggleSidebar } : pageProps) => {
  return (
    <header className="bg-white shadow-sm z-10">    
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button className="p-1 rounded-md hover:bg-gray-100 lg:hidden" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h2 className="ml-2 lg:ml-0 text-lg font-medium text-gray-800">Dashboard</h2>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-4 rounded-full hover:bg-gray-100 relative">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;