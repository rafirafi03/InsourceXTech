import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { useChangePassMutation } from "../../store/slices/apiSlices";
import { useNavigate } from "react-router-dom";
import { IChangePass } from "../../types";
import { toast } from "react-toastify";
import { getUserIdFromToken } from '../../utils/tokenHelper';

export default function ChangePass() {
  const navigate = useNavigate();

  const id = getUserIdFromToken('adminToken');

  const [changePass] = useChangePassMutation();

  const [formData, setFormData] = useState<IChangePass>({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });

  // Handle Input Change for text fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.newPass !== formData.confirmPass) {
      toast.error('Passwords do not match!');
      return;
    }

    const loadingToast = toast.loading("Changing password...");

    try {
      if (!id) {
        toast.dismiss(loadingToast);
        toast.error('Authentication error. Please log in again.');
        navigate("/login");
        return;
      }

      const submitData = {
        id,
        currentPass: formData.currentPass,
        newPass: formData.newPass
      };

      // When you have the API hook:
      const res = await changePass(submitData).unwrap();

      toast.dismiss(loadingToast);

      if (res.success) {
        toast.success("Password changed successfully");
        setFormData({ currentPass: "", newPass: "", confirmPass: "" });
      } else {
        if (res.status === 401) {
          toast.warning("Session expired! Logging out...");
          localStorage.removeItem("adminToken");
          navigate("/login");
        } else {
          toast.error(res.message || "Failed to change password");
        }
      }
    } catch (error) {
        toast.dismiss(loadingToast);
        
        if (error && typeof error === 'object' && 'message' in error) {
          toast.error(error.message as string || "An error occurred while changing password");
        } else {
          toast.error("An error occurred while changing password");
        }
        
        console.error("Error changing password:", error);
      }
  };

  const handleBackButton = () => {
    navigate("/admin");
  };

  return (
    <AdminLayout>
      <div className="py-12 px-4 md:px-12">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Change Password
            </h1>
            <a
              onClick={handleBackButton}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Admin</span>
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="currentPass"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPass"
                name="currentPass"
                value={formData.currentPass}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter current password"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="newPass"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPass"
                name="newPass"
                value={formData.newPass}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPass"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPass"
                name="confirmPass"
                value={formData.confirmPass}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm password"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-3xl font-medium flex items-center justify-center hover:shadow-lg transition-all duration-300"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}