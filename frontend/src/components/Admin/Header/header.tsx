import { Menu, LogOut } from "lucide-react";
import { useLogoutMutation } from "../../../store/slices/apiSlices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface pageProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: pageProps) => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    const loadingToast = toast.loading("logging out...");

    try {
      const res = await logout({}).unwrap();
      toast.dismiss(loadingToast);

      if (res.success) {
        toast.success("logout successfull");
        localStorage.removeItem("adminToken");
        navigate("/login");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred while logging out.");
      console.error("Logout error:", error);
    }
  };
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button
            className="p-1 rounded-md hover:bg-gray-100 lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          <h2 className="ml-2 lg:ml-0 text-lg font-medium text-gray-800">
            Dashboard
          </h2>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleLogout}
            className="p-4 rounded-full hover:bg-gray-100 relative"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
