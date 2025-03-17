import { useState } from "react";
import { useSendMailMutation } from "../../../store/slices/apiSlices";
import { toast } from "react-toastify";

const ContactComponent = () => {

  const [sendMail] = useSendMailMutation();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    const loadingToast = toast.loading('deleting...')
        try {
          const res = await sendMail(formData).unwrap();
          toast.dismiss(loadingToast)
          if(res.success) {
            toast.success('mail send successfully')
          } else {
            toast.error('something went wrong')
          }
    
          console.log("res:", res);
        } catch (error) {
          toast.dismiss(loadingToast)
          toast.error('something went wrong')
          console.error("Failed to send mail", error);
        }
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl text-blue-900 font-bold mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-black/50 max-w-2xl mx-auto">
            Have questions or want to work with us? Reach out today and our team
            will get back to you as soon as possible.
          </p>
        </div>

        <div className="flex justify-center">
          {/* Contact Form - Now Centered with Increased Width */}
          <div className="w-full max-w-3xl">
            <div className="bg-white/10 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl text-blue-900 font-bold mb-6">
                Send Us A Message
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-black/50 mb-2" htmlFor="name">
                      Your Name
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
                      Your Email
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
                    Subject
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
                    Your Message
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

                <p className="text-black/30 text-sm text-center">
                  We'll get back to you within 24 hours
                </p>
                <button
                  type="submit"
                  className="group w-full mt-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-3xl font-medium flex items-center justify-center hover:shadow-lg transition-all duration-300"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactComponent;
