import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useEditAboutCompanyMutation, useGetAdminAboutCompanyQuery } from "../../store/slices/apiSlices";
import { IAboutFormData } from "../../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function About() {
  const navigate = useNavigate()
  const [aboutSubmit] = useEditAboutCompanyMutation();
  const { data: about, error } = useGetAdminAboutCompanyQuery(undefined);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      localStorage.removeItem("adminToken");
      navigate("/login");
    }
  }, [error, navigate]);

  const [formData, setFormData] = useState<IAboutFormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    timing: "",
    about: "",
    vision: "",
    mission: "",
  });

  useEffect(() => {
    if (about) {
      setFormData({
        name: about.aboutCompany?.name || "",
        email: about.aboutCompany?.email || "",
        phone: about.aboutCompany?.phone || "",
        location: about.aboutCompany?.location || "",
        timing: about.aboutCompany?.timing || "",
        about: about.aboutCompany?.about || "",
        vision: about.aboutCompany?.vision || "",
        mission: about.aboutCompany?.mission || "",
      });
    }
  }, [about]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isEditMode) {
      const loadingToast = toast.loading("Saving...");
      
      try {
        const res = await aboutSubmit(formData).unwrap();
        toast.dismiss(loadingToast);
  
        if (res.success) {
          toast.success("Edit successful");
          setIsEditMode(false); // Turn off edit mode after success
        } else {
          if (res.status == 401) {
            toast.warning("session expired! logging out...");
            localStorage.removeItem("adminToken");
            navigate("/login");
          }
          toast.error("something went wrong!");
        }
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error("Failed to save changes");
        console.error("Error submitting form:", error);
      }
    } else {
      setIsEditMode(true); // Toggle to edit mode
    }
  };
  

  // Common input props
  const getInputProps = (name: keyof IAboutFormData) => ({
    id: name,
    name: name,
    value: formData[name],
    onChange: handleChange,
    className: `w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all ${!isEditMode ? 'bg-gray-100' : ''}`,
    placeholder: `Enter ${name}`,
    required: true,
    disabled: !isEditMode,
  });

  return (
    <AdminLayout>
      <div className="w-full max-w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl text-blue-900 font-bold">
              Company Details
            </h3>
            <button
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-4 py-2 rounded-lg text-white ${!isEditMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
            >
              {isEditMode ? "Cancel" : "Edit"}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-black/50 mb-2" htmlFor="name">
                  Company Name
                </label>
                <input {...getInputProps("name")} />
              </div>

              <div>
                <label className="block text-black/50 mb-2" htmlFor="email">
                  Company Email
                </label>
                <input type="email" {...getInputProps("email")} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-black/50 mb-2" htmlFor="phone">
                  Company Phone
                </label>
                <input type="text" {...getInputProps("phone")} />
              </div>

              <div>
                <label className="block text-black/50 mb-2" htmlFor="location">
                  Company Location
                </label>
                <input type="text" {...getInputProps("location")} />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-black/50 mb-2" htmlFor="timing">
                Working days and Hours
              </label>
              <input type="text" {...getInputProps("timing")} />
            </div>

            <div className="mb-5">
              <label className="block text-black/50 mb-2" htmlFor="about">
                About Company
              </label>
              <textarea
                {...getInputProps("about")}
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none ${!isEditMode ? 'bg-gray-100' : ''}`}
              ></textarea>
            </div>
            <div className="mb-5">
              <label className="block text-black/50 mb-2" htmlFor="vision">
                Company Vision
              </label>
              <textarea
                {...getInputProps("vision")}
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none ${!isEditMode ? 'bg-gray-100' : ''}`}
              ></textarea>
            </div>
            <div className="mb-5">
              <label className="block text-black/50 mb-2" htmlFor="mission">
                Company Mission
              </label>
              <textarea
                {...getInputProps("mission")}
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none ${!isEditMode ? 'bg-gray-100' : ''}`}
              ></textarea>
            </div>
            <button
              type="submit"
              className={`group w-full mt-5 text-white py-3 px-6 rounded-3xl font-medium flex items-center justify-center hover:shadow-lg transition-all duration-300 ${
                isEditMode
                  ? "bg-gradient-to-r from-green-600 to-green-700"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600"
              }`}
            >
              {isEditMode ? "Save Changes" : "Edit Information"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}