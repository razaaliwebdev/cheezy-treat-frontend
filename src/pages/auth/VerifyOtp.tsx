import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import type { RootState } from "@/redux/store";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!otp) {
        toast.error("OTP is required");
        return;
      }
      const email = user?.email;
      const data = { otp, email };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify-otp`,
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("OTP verified successfully");
        navigate("/auth/reset-password");
      }
    } catch (error) {
      console.log("Failed to send otp", error);
      toast.error("Failed to send otp. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] w-full bg-orange-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-md md:max-w-lg   px-6 md:px-10 py-8 md:py-10">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">
          Enter Verification Code
        </h1>
        <p className="text-gray-500 text-center mt-1 mb-6">
          Please enter 6-digit code sent to your email.
        </p>
        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center">
            <InputOTP
              value={otp}
              onChange={(value) => setOtp(value)}
              maxLength={6}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex items-center juctify-center">
            <button
              type="submit"
              className="w-[80%]  mx-auto bg-orange-400 text-white font-semibold py-2 rounded hover:opacity-80 transition-all duration-300 my-4"
            >
              {loading ? (
                <div className="flex items-center gap-2 justify-center">
                  <Spinner /> Verifying OTP...
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
