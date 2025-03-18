import { useState } from "react";
import { useResetPassMutation } from "../../store/slices/apiSlices";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function Page() {
  const [password, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const [resetPass] = useResetPassMutation();
  const navigate = useNavigate();

  const { token } = useParams();

  const handleSubmit = async () => {

    if(password != confirmPass) {
        toast.error('password not match')
        return
    }
    try {
      const loadingToast = toast.loading("changing...");
      const response = await resetPass({ token, password }).unwrap();
      toast.dismiss(loadingToast);

      if (response.success) {
        toast.success(<b>Password chaged Successfully!</b>);
        navigate("/login");
      } else {
        toast.error(<b>Failed to change password!</b>);
      }
      console.log(response);
    } catch (error) {
      toast.dismiss();
      toast.error(<b>Error occured!</b>);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen max-w-full">
      <div className="bg-slate-50 border w-1/2 border-gray-200 rounded-lg shadow-sm p-6 my-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Reset Password
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPass"
              name="newPass"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter new Password"
              className="mt-1 block w-full border-blue-300 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 sm:text-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPass"
              name="confirmPass"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm new password"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 sm:text-sm p-2"
            />
          </div>
          <button
            type="button"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
