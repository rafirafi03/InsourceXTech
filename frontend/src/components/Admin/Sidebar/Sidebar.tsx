import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: PageProps) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'about', label: 'About', icon: '📄', path: '/admin' },
    { id: 'services', label: 'Services', icon: '🛠️', path: '/services' },
    { id: 'whyUs', label: 'Why Us', icon: '🏆', path: '/whyUs' },
    { id: 'solutions', label: 'Solutions', icon: '💡', path: '/solutions' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024) { // Close sidebar on navigation for mobile
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 z-20 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 lg:translate-x-0 lg:static lg:inset-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <button className="p-1 rounded-md hover:bg-gray-100 lg:hidden" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-500 cursor-pointer transition-colors duration-200"
              onClick={() => handleNavigation(item.path)}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;