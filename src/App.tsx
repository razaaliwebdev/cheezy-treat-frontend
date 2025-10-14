import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SignUp from "./pages/auth/SignUp";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/utils/Footer";
import Faqs from "./pages/others/Faqs";
import About from "./pages/aboutUs/About";
import Profile from "./pages/profile/Profile";

const App = () => {
  return (
    <div>
      <Toaster position="top-center" />

      {/* <Navbar /> */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-otp" element={<VerifyOtp />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {/* Footer  */}
      <Footer />
    </div>
  );
};

export default App;
