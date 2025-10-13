import { Spinner } from "@/components/ui/spinner";
import { setAuthData } from "@/redux/slices/authSlice";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email || !password) {
        toast.error("All the fields are required");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
      }

      const data = { email, password };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(setAuthData({ user: response.data.user }));
        toast.success("Login successful");
        navigate("/");
        setEmail("");
        setPassword("");
      }
    } catch (error: any) {
      console.log("Failed to login", error);
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
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center mt-1 mb-6">
          Login to your Cheezy Treat account.
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
            <span
              className="cursor-pointer text-sm text-orange-400 mt-1 absolute right-0"
              onClick={() => navigate("/auth/forgot-password")}
            >
              Forgot Password?
            </span>
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
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-400 text-white font-semibold py-2 rounded hover:opacity-80 transition-all duration-300 mt-10 mb-4"
            >
              {loading ? (
                <div className="flex items-center gap-2 justify-center">
                  <Spinner /> Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>

            {/* Login Redirect */}
            <p className="text-gray-500 text-center text-sm">
              Don&apos;t have an account?{" "}
              <span
                className="text-orange-400 font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/auth/signup")}
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
