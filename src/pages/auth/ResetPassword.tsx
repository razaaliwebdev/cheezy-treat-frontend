import { Spinner } from "@/components/ui/spinner";
import type { RootState } from "@/redux/store";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!newPassword) {
        toast.error("Password is required");
        return;
      }

      if (newPassword.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const email = user?.email;
      const data = { email, newPassword, confirmPassword };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Password reset successful");
        navigate("/auth/login");
      }
    } catch (error: any) {
      console.log("Failed to reset password", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] w-full bg-orange-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-md md:max-w-lg   px-6 md:px-10 py-8 md:py-10">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">
          Update Your Password
        </h1>
        <p className="text-gray-500 text-center mt-1 mb-6">
          Keep your account secure.
        </p>
        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="**********"
              className="block w-full border border-gray-300 rounded focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:outline-none text-base px-3 py-2"
            />
            {showPassword ? (
              <Eye
                onClick={() => setShowPassword(!showPassword)}
                size={20}
                className="cursor-pointer absolute right-3 text-gray-500 top-9"
              />
            ) : (
              <EyeOff
                onClick={() => setShowPassword(!showPassword)}
                size={20}
                className="cursor-pointer absolute right-3 text-gray-500 top-9"
              />
            )}
          </div>
          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="**********"
              className="block w-full border border-gray-300 rounded focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:outline-none text-base px-3 py-2"
            />
            {showPassword ? (
              <Eye
                onClick={() => setShowPassword(false)}
                size={20}
                className="cursor-pointer absolute right-3 text-gray-500 top-9"
              />
            ) : (
              <EyeOff
                onClick={() => setShowPassword(true)}
                size={20}
                className="cursor-pointer absolute right-3 text-gray-500 top-9"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-400 text-white font-semibold py-2 rounded hover:opacity-80 transition-all duration-300"
          >
            {loading ? (
              <div className="flex items-center gap-2 justify-center">
                <Spinner /> Resetting Password...
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
