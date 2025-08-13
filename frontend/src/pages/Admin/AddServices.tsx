import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAddServicesMutation } from "../../store/slices/apiSlices";
import { useNavigate } from "react-router-dom";
import { IServiceFormData } from "../../types";
import { toast } from "react-toastify";

interface ISubService {
  title: string;
  description: string;
  image: File | null;
  previewUrl: string | null;
}

interface IExtendedServiceFormData extends IServiceFormData {
  subservices: ISubService[];
}

export default function AddService() {
  const navigate = useNavigate();
  const [addService] = useAddServicesMutation();
  
  const [formData, setFormData] = useState<IExtendedServiceFormData>({
    title: "",
    image: null,
    content: "",
    subservices: []
  });
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showSubservicesForm, setShowSubservicesForm] = useState<boolean>(false);

  // Handle Input Change for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // Handle Main Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedFormData = { ...formData, image: file };
      setFormData(updatedFormData);
      
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Handle Subservice field changes
  const handleSubserviceChange = (index: number, field: keyof ISubService, value: string) => {
    const updatedSubservices = [...formData.subservices];
    updatedSubservices[index] = { ...updatedSubservices[index], [field]: value };
    setFormData({ ...formData, subservices: updatedSubservices });
  };

  // Handle Subservice image upload
  const handleSubserviceImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedSubservices = [...formData.subservices];
      updatedSubservices[index] = { ...updatedSubservices[index], image: file };
      
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        updatedSubservices[index].previewUrl = fileReader.result as string;
        setFormData({ ...formData, subservices: updatedSubservices });
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Add new subservice
  const addSubservice = () => {
    const newSubservice: ISubService = {
      title: "",
      description: "",
      image: null,
      previewUrl: null
    };
    setFormData({
      ...formData,
      subservices: [...formData.subservices, newSubservice]
    });
  };

  // Remove subservice
  const removeSubservice = (index: number) => {
    const updatedSubservices = formData.subservices.filter((_, i) => i !== index);
    setFormData({ ...formData, subservices: updatedSubservices });
  };

  // Toggle subservices form visibility
  const toggleSubservicesForm = () => {
    setShowSubservicesForm(!showSubservicesForm);
    if (!showSubservicesForm && formData.subservices.length === 0) {
      addSubservice(); // Add first subservice when opening
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const toastLoading = toast.loading('submitting...');
    try {
      if (!formData.content) {
        toast.error('content required');
        return;
      }

      // Create FormData object to handle file upload
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append('content', formData.content);
      
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      // Add subservices data
      if (formData.subservices.length > 0) {
        submitData.append("subservices", JSON.stringify(
          formData.subservices.map(sub => ({
            title: sub.title,
            description: sub.description
          }))
        ));

        // Add subservice images
        formData.subservices.forEach((sub, index) => {
          if (sub.image) {
            submitData.append(`subservice_image_${index}`, sub.image);
          }
        });
      }
      
      const res = await addService(submitData).unwrap();
      toast.dismiss(toastLoading);
      
      if (res.success) {
        toast.success('added successfully');
        // Reset form after submission
        setFormData({ title: "", image: null, content: "", subservices: [] });
        setPreviewUrl(null);
        setShowSubservicesForm(false);
      } else {
        if (res.status == 401) {
          toast.warning("session expired! logging out...");
          localStorage.removeItem("adminToken");
          navigate("/login");
        }
        toast.error("something went wrong!");
      }
      
    } catch (error) {
      toast.dismiss(toastLoading);
      toast.error('something went wrong');
      console.error("Error adding service:", error);
    }
  };

  const handleBackClick = () => {
    navigate('/services');
  };

  return (
    <AdminLayout>
      <div className="py-12 px-4 md:px-12">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Add New Service</h1>
            <a 
              onClick={handleBackClick}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Services</span>
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
                htmlFor="content" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                rows={4}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter service content"
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

            {/* Add Subservices Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={toggleSubservicesForm}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
              >
                {showSubservicesForm ? 'Hide Subservices' : 'Add Subservices'}
              </button>
            </div>

            {/* Subservices Form */}
            {showSubservicesForm && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Subservices</h3>
                
                {formData.subservices.map((subservice, index) => (
                  <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg bg-white">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium text-gray-700">Subservice {index + 1}</h4>
                      {formData.subservices.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSubservice(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={subservice.title}
                        onChange={(e) => handleSubserviceChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter subservice title"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={subservice.description}
                        onChange={(e) => handleSubserviceChange(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter subservice description"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Image
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleSubserviceImageChange(index, e)}
                        accept="image/*"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                      
                      {subservice.previewUrl && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Preview:</p>
                          <img 
                            src={subservice.previewUrl} 
                            alt="Subservice Preview" 
                            className="max-h-32 rounded-lg" 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addSubservice}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                >
                  Add Another Subservice
                </button>
              </div>
            )}
            
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