import { useLocation, useNavigate } from "react-router-dom";
import type { NavLinks } from "../../types/types";
import { images } from "../../assets/assets.ts";
import { Menu, ShoppingBasket, ShoppingCart } from "lucide-react";
import UserAvatar from "./utils/UserAvatar.tsx";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet.tsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearAuthData } from "@/redux/slices/authSlice.ts";
import toast from "react-hot-toast";
import type { RootState } from "@/redux/store.ts";

const navLinks: NavLinks[] = [
  { title: "Home", link: "/" },
  { title: "Menu", link: "/menu" },
  { title: "Deals", link: "/deals" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

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

  return (
    <nav>
      <div className="md:px-14 px-6 md:py-4 py-3 border-b border-orange-100 flex items-center justify-between ">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="logo cursor-pointer  w-20"
        >
          <img
            src={images.logo}
            className="h-full w-full object-cover scale-110"
            alt="logo"
          />
        </div>
        {/* Links */}
        <div className="nav-links hidden md:block">
          <ul className="flex">
            {navLinks.map((lnk) => {
              const isActive = location.pathname === lnk.link; // check if current path
              return (
                <li
                  key={lnk.title}
                  className={`inline-block mx-4 cursor-pointer ${
                    isActive ? "text-orange-500 font-medium" : "text-gray-800"
                  } hover:text-orange-400`}
                  onClick={() => navigate(lnk.link)}
                >
                  {lnk.title}
                </li>
              );
            })}
          </ul>
        </div>
        {/* Auth Button && Cart */}
        <div className=" items-center gap-6 hidden md:flex">
          {user ? (
            <button
              onClick={() => navigate("/my-orders")}
              className="px-4 py-1 bg-orange-100 text-orange-500 rounded font-medium hover:bg-orange-200 transition-all duration-150"
            >
              My Orders
            </button>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className="px-4 py-1 bg-orange-100 text-orange-500 rounded font-medium hover:bg-orange-200 transition-all duration-150"
            >
              Login
            </button>
          )}
          {/* Cart */}
          <button className="relative bg-orange-100 px-3 py-1 rounded hover:bg-orange-200 transition-all duration-150">
            <ShoppingBasket size={25} className="text-orange-500" />
            <span className="absolute text-xs text-white -top-2 -right-1 bg-orange-500 rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </button>
          {/* User Avatar */}
          {user && <UserAvatar />}
        </div>

        {/* Menu Button for small screens */}
        <div className="md:hidden block">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-1 bg-orange-100 rounded hover:bg-orange-200 transition-all duration-150">
                <Menu className="text-orange-500" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-64 p-6 flex flex-col justify-between"
            >
              {/* Top Section — Logo & Links */}
              <div>
                <SheetHeader>
                  <SheetTitle>
                    <div className="logo w-20 mx-auto mb-2">
                      <img
                        src={images.logo}
                        alt="logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <SheetDescription asChild>
                  <div className="flex flex-col items-center">
                    {/* Navigation Links */}
                    <ul className="flex flex-col items-center">
                      {navLinks.map((lnk) => {
                        const isActive = location.pathname === lnk.link;
                        return (
                          <li
                            key={lnk.title}
                            className={`inline-block my-3 font-medium cursor-pointer ${
                              isActive
                                ? "text-orange-500 font-medium"
                                : "text-gray-800"
                            } hover:text-orange-400`}
                            onClick={() => navigate(lnk.link)}
                          >
                            {lnk.title}
                          </li>
                        );
                      })}
                    </ul>

                    {/* Auth / Cart */}
                    <div className="mt-6 flex flex-col items-center gap-6">
                      {user ? (
                        <button
                          onClick={() => navigate("/my-orders")}
                          className="px-4 py-2 bg-orange-100 text-orange-500 rounded font-medium hover:bg-orange-200 transition-all duration-150"
                        >
                          My Orders
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate("/login")}
                          className="px-4 py-2 bg-orange-100 text-orange-500 rounded font-medium hover:bg-orange-200 transition-all duration-150"
                        >
                          Login
                        </button>
                      )}

                      <button className="relative bg-orange-100 px-5 py-2 rounded hover:bg-orange-200 transition-all duration-150">
                        <ShoppingCart size={25} className="text-orange-500" />
                        <span className="absolute text-xs text-white -top-2 -right-1 bg-orange-500 rounded-full w-4 h-4 flex items-center justify-center">
                          0
                        </span>
                      </button>
                    </div>
                  </div>
                </SheetDescription>
              </div>

              {/* Bottom Section — User Avatar & Profile Options */}
              {user && (
                <div className="border-t border-orange-100 mt-6 pt-4">
                  <div className="flex items-center gap-3">
                    <UserAvatar />
                    <div>
                      <p className="font-medium text-gray-800">John Doe</p>
                      <p className="text-sm text-gray-500">john@example.com</p>
                    </div>
                  </div>

                  <div className="flex flex-col mt-3 space-y-2">
                    <button
                      onClick={() => navigate("/profile")}
                      className="text-gray-700 hover:text-orange-500 text-sm text-left"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => navigate("/orders")}
                      className="text-gray-700 hover:text-orange-500 text-sm text-left"
                    >
                      Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-red-500 text-sm text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
