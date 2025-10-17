import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import axios from "axios";
import { clearAuthData } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserAvatar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🆕 NEW: State for profile image
  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/128/149/149071.png"
  );
  const [loading, setLoading] = useState(true);

  const getUserId = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        console.log("🔍 Avatar userId:", userObj._id);
        return userObj._id;
      }
      return null;
    } catch (error) {
      console.error("❌ localStorage error:", error);
      return null;
    }
  };

  // 🆕 NEW: Fetch ONLY profile image
  const fetchProfileImage = async () => {
    const userId = getUserId();
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/profile/${userId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("✅ Avatar image:", response.data.user.profileImage);
      setProfileImage(
        response.data.user.profileImage ||
          "https://cdn-icons-png.flaticon.com/128/149/149071.png"
      );
    } catch (error) {
      console.error("❌ Avatar image fetch failed:", error);
      setProfileImage("https://cdn-icons-png.flaticon.com/128/149/149071.png");
    } finally {
      setLoading(false);
    }
  };

  // 🆕 Fetch on mount
  useEffect(() => {
    fetchProfileImage();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(clearAuthData());
      toast.success("Logged out successfully");
      navigate("/auth/login");
    } catch (error) {
      console.log("Failed to logout", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-12 h-12 rounded-full border-[1px] border-gray-300 overflow-hidden cursor-pointer">
            <img
              src={profileImage}
              alt="User Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 mr-5">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/orders")}>
            Orders
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-500">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAvatar;
