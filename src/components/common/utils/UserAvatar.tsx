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

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(clearAuthData());
      toast.success("Logged out successfully");
      navigate("/auth/login");
    } catch (error) {
      console.log("Failed to logout", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer ">
            <img
              src={"https://cdn-icons-png.flaticon.com/128/149/149071.png"}
              alt="User Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 mr-5">
          <DropdownMenuLabel className="">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Orders</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-500"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAvatar;
