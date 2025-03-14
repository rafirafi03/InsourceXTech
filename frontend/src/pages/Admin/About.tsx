import { useState } from "react";
import AdminLayout from "./AdminLayout";

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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
            Company Details
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-black/50 mb-2" htmlFor="name">
                  Company Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-black/50 mb-2" htmlFor="email">
                  Company Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-black/50 mb-2" htmlFor="name">
                  Company Phone
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-black/50 mb-2" htmlFor="email">
                  Company Location
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-black/50 mb-2" htmlFor="subject">
                Working days and Hours
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="How can we help you?"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block text-black/50 mb-2" htmlFor="message">
                About Company
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                placeholder="Tell us about your project or inquiry..."
                required
              ></textarea>
            </div>
            <div className="mb-5">
              <label className="block text-black/50 mb-2" htmlFor="message">
                Company Vision
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                placeholder="Tell us about your project or inquiry..."
                required
              ></textarea>
            </div>
            <div className="mb-5">
              <label className="block text-black/50 mb-2" htmlFor="message">
                Company Mission
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
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
  );
}
