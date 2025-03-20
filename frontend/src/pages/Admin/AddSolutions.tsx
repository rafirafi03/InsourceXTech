import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAddSolutionsMutation } from "../../store/slices/apiSlices";
import { useNavigate } from "react-router-dom";
import { IServiceFormData } from "../../types";
import { toast } from "react-toastify";

export default function AddService() {

  const navigate = useNavigate()

  const [addSolutions] = useAddSolutionsMutation();
  
  const [formData, setFormData] = useState<IServiceFormData>({
    title: "",
    image: null,
  });
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle Input Change for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a form data object to include the file
      const updatedFormData = { ...formData, image: file };
      setFormData(updatedFormData);
      
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loadingToast = toast.loading('submitting...')
    
    try {
      // Create FormData object to handle file upload
      const submitData = new FormData();
      submitData.append("title", formData.title);
      if (formData.image) {
        submitData.append("image", formData.image);
      }
      
      // When you have the API hook:
      const res = await addSolutions(submitData).unwrap();

      toast.dismiss(loadingToast)

      if(res.success) {
        toast.success('added successfully')
      } else {
        if (res.status == 401) {
          toast.warning("session expired! logging out...");
          localStorage.removeItem("adminToken");
          navigate("/login");
        }
        toast.error("something went wrong!");
      }
      
      // Reset form after submission
      setFormData({ title: "", image: null });
      setPreviewUrl(null);
      
      // Optionally redirect to services page
      // window.location.href = "/admin/services";
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error('something went wrong')
      console.error("Error adding service:", error);
    }
  };

  const handleBackButton = () => {
    navigate('/solutions')
  };

  return (
    <AdminLayout>
      <div className="py-12 px-4 md:px-12">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Add New Solution</h1>
            <a 
              onClick={handleBackButton} 
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>Back to Solutions</span>
            </a>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label 
                htmlFor="title" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter service title"
              />
            </div>
            
            <div className="mb-6">
              <label 
                htmlFor="images" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              
              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Preview:</p>
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-40 rounded-lg" 
                  />
                </div>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full mt-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-3xl font-medium flex items-center justify-center hover:shadow-lg transition-all duration-300"
            >
              Add Service
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}