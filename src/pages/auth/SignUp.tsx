import { Spinner } from "@/components/ui/spinner";
import { setAuthData } from "@/redux/slices/authSlice";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!name || !email || !password) {
        toast.error("All the fields are required");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
      }

      const data = { name, email, password };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data,
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success("Registration successful");
        dispatch(setAuthData({ user: response.data.user }));
        navigate("/auth/verify-otp");
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log("Failed to register", error);
      toast.error("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] w-full bg-orange-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-md md:max-w-lg   px-6 md:px-10 py-8 md:py-10">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">
          Create Your Account
        </h1>
        <p className="text-gray-500 text-center mt-1 mb-6">
          Join the Cheezy Treat Family
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name..."
              className="block w-full border border-gray-300 rounded focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:outline-none text-base px-3 py-2"
            />
          </div>

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

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-400 text-white font-semibold py-2 rounded hover:opacity-80 transition-all duration-300"
          >
            {loading ? (
              <div className="flex items-center gap-2 justify-center">
                <Spinner /> Registering...
              </div>
            ) : (
              "Register"
            )}
          </button>

          {/* Login Redirect */}
          <p className="text-gray-500 text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-orange-400 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
