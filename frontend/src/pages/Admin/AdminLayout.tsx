import { useState, useEffect, ReactNode } from 'react';
import Header from '../../components/Admin/Header/header';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';

interface pageProps {
    children : ReactNode
}

const AdminLayout = ({ children }: pageProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Reset body padding for admin page
  useEffect(() => {
    // Save original styles to restore later
    const originalPadding = document.body.style.padding;
    const originalMargin = document.body.style.margin;
    
    // Override padding and margin
    document.body.style.padding = '0';
    document.body.style.margin = '0';
    
    // Restore original styles when component unmounts
    return () => {
      document.body.style.padding = originalPadding;
      document.body.style.margin = originalMargin;
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Component */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;