import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email) {
        toast.error("Email is required");
        return;
      }
      const data = { email };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("OTP sent successfully");
        navigate("/auth/verify-otp");
        setEmail("");
      }
    } catch (error) {
      console.log("forgot failed", error);
      toast.error("Failed to send OTP to reset Password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] w-full bg-orange-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-md md:max-w-lg   px-6 md:px-10 py-8 md:py-10">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">
          Forgot your password?
        </h1>
        <p className="text-gray-500 text-center mt-1 mb-6">
          No worries! Enter your email and we&apos;ll send you a OTP.
        </p>
        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="john@gmail.com"
              className="block w-full border border-gray-300 rounded focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:outline-none text-base px-3 py-2"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-400 text-white font-semibold py-2 rounded hover:opacity-80 transition-all duration-300 mt-4"
          >
            {loading ? (
              <div className="flex items-center gap-2 justify-center">
                <Spinner /> Sending OTP...
              </div>
            ) : (
              "Send OTP"
            )}
          </button>
          <button
            className="text-orange-400 hover:underline text-center w-full"
            onClick={() => navigate("/auth/login")}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
