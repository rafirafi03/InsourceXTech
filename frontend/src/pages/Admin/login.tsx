import { useState } from "react";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../store/slices/apiSlices";
import { useNavigate } from "react-router-dom";
import EmailModal from '../../components/Admin/Modal/resetPassModal'

export default function App() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isForgotEmailModal, setForgotEmailModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCloseModal = ()=> {
    setForgotEmailModal(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loadinToast = toast.loading("logging in...");
    try {
      const res = await login(formData).unwrap();

      toast.dismiss(loadinToast);

      if (res.success) {
        localStorage.setItem("adminToken", res.token);
        toast.success("login successful");
        navigate("/admin");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.dismiss(loadinToast);

      const err = error as { data?: { error?: string } };
      toast.error(err.data?.error || "Something went wrong");

      console.log("error:", error);
    }
  };

  return (
    <>
      {isForgotEmailModal && <EmailModal isOpen={isForgotEmailModal} isClose={onCloseModal} />}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-auto">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl text-blue-900 font-bold mb-4">
                Insource X Technologies
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl text-blue-900 font-bold mb-6 text-center">
                Welcome Admin, Please Login
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-black/50 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="enter your email here"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    className="block text-black/50 mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full mt-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-3xl font-medium flex items-center justify-center hover:shadow-lg transition-all duration-300"
                >
                  Login
                </button>
              </form>
              <p onClick={()=> setForgotEmailModal(true)} className="text-blue-900 mt-5 cursor-pointer">
                forget password?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
