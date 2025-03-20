import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import {
  useEditWhyUsMutation,
  useGetAdminWhyUsQuery,
} from "../../store/slices/apiSlices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function WhyUs() {
  const navigate = useNavigate();
  const { data: whyus, error } = useGetAdminWhyUsQuery(undefined);
  const [editWhyus] = useEditWhyUsMutation();
  const [forms, setForms] = useState<
    { _id: string; title: string; description: string }[]
  >([]);

  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      localStorage.removeItem("adminToken");
      navigate("/login");
    }
  }, [error, navigate]);

  // Fetch Data from Backend
  useEffect(() => {
    if (whyus && whyus.whyUs) {
      setForms(whyus.whyUs);
    }
  }, [whyus]);

  // Handle Input Change
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedForms = [...forms];
    updatedForms[index] = {
      ...updatedForms[index],
      [e.target.name]: e.target.value,
    };
    setForms(updatedForms);
  };

  // Handle Form Submission
  const handleSubmit = async (
    index: number,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const loadingToast = toast.loading("submitting...");
    try {
      const { _id, title, description } = forms[index];
      const res = await editWhyus({ _id, title, description }).unwrap();
      toast.dismiss(loadingToast);

      if (res.success) {
        toast.success("edited successfull");
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
      toast.error("something went wrong");
      console.error(`Error updating form ${index + 1}:`, error);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-full">
        <h3 className="text-2xl text-blue-900 font-bold mb-6">
          Why Us Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forms.map((form, index) => (
            <div key={form._id} className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={(e) => handleSubmit(index, e)}>
                <div className="mb-5">
                  <label
                    className="block text-black/50 mb-2"
                    htmlFor={`title-${form._id}`}
                  >
                    Title
                  </label>
                  <input
                    id={`title-${form._id}`}
                    name="title"
                    value={form.title}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    placeholder="Enter title..."
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    className="block text-black/50 mb-2"
                    htmlFor={`description-${form._id}`}
                  >
                    Why Us Reason
                  </label>
                  <textarea
                    id={`description-${form._id}`}
                    name="description"
                    value={form.description}
                    onChange={(e) => handleChange(index, e)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    placeholder="Enter reason..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full mt-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-3xl font-medium flex items-center justify-center hover:shadow-lg transition-all duration-300"
                >
                  Update
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
