import React, { useState } from 'react'
import AdminLayout from './AdminLayout'

export default function WhyUs() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", formData);
        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
      };
      
  return (
    <AdminLayout>
        <div className="w-full max-w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl text-blue-900 font-bold mb-6">
                Why Us Details
              </h3>

              <form onSubmit={handleSubmit}>

                <div className="mb-5">
                  <label className="block text-black/50 mb-2" htmlFor="message">
                    Why Us Reason 1
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    placeholder="Tell us about your project or inquiry..."
                    required
                  ></textarea>
                </div>
                <div className="mb-5">
                  <label className="block text-black/50 mb-2" htmlFor="message">
                  Why Us Reason 2
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    placeholder="Tell us about your project or inquiry..."
                    required
                  ></textarea>
                </div>
                <div className="mb-5">
                  <label className="block text-black/50 mb-2" htmlFor="message">
                  Why Us Reason 3
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    placeholder="Tell us about your project or inquiry..."
                    required
                  ></textarea>
                </div>
                <div className="mb-5">
                  <label className="block text-black/50 mb-2" htmlFor="message">
                  Why Us Reason 4
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    placeholder="Tell us about your project or inquiry..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="group w-full mt-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-3xl font-medium flex items-center justify-center hover:shadow-lg transition-all duration-300"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
    </AdminLayout>
  )
}
