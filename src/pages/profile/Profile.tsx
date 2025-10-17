import { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import OrdersTable from "@/components/common/Profile.tsx/OrdersTable";
import axios from "axios";

const states = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"];

export default function Profile() {
  // 🆕 FIXED: Initial states from Redux user
  const { user } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState(user?.name || "Jhon");
  const [email, setEmail] = useState(user?.email || "john@123.com");
  const [phone, setPhone] = useState(user?.phone || "03");
  const [profileImage, setProfileImage] = useState(
    user?.profileImage ||
      "https://cdn-icons-png.flaticon.com/128/149/149071.png"
  );

  const fileInputRef = useRef(null);

  // 🆕 FIXED: Safe userId extraction
  const getUserId = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        // console.log("🔍 Found userId:", userObj._id);
        return userObj._id;
      }
      // console.log("🔍 Using Redux userId:", user?._id);
      return user?._id;
    } catch (error) {
      console.error("❌ localStorage error:", error);
      return user?._id || null;
    }
  };

  const userId = getUserId();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 🆕 GET PROFILE
  const getUserPfile = async () => {
    if (!userId) {
      console.error("❌ NO USER ID! Login first.");
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

      // console.log("✅ SUCCESS:", response.data);
      setUserProfile(response.data.user);

      // Update form fields
      setName(response.data.user.name);
      setEmail(response.data.user.email);
      setPhone(response.data.user.phone || phone);
      setProfileImage(response.data.user.profileImage || profileImage);

      // 🆕 UPDATE ADDRESS FROM API
      if (response.data.user.address && response.data.user.address[0]) {
        setAddress([response.data.user.address[0]]);
      }
    } catch (error) {
      console.error(
        "❌ Error fetching user profile:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // 🆕 NEW: UPDATE PROFILE
  // 🆕 FIXED: UPDATE PROFILE - OPTIONAL FIELDS
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (updating) return;

    setUpdating(true);
    setSuccessMsg("");

    try {
      // 🆕 Prepare data - ONLY changed fields
      const updateData = {};

      // Optional: Only add if changed
      if (name && name !== userProfile?.name) updateData.name = name;
      if (phone && phone !== userProfile?.phone) updateData.phone = phone;
      if (address[0]) updateData.address = address[0];

      // console.log("🚀 Updating with:", updateData);

      if (Object.keys(updateData).length === 0) {
        setSuccessMsg("ℹ️ No changes detected!");
        setUpdating(false);
        return;
      }

      // 🆕 FormData - ONLY for changed data
      const formData = new FormData();

      // Add changed fields
      Object.keys(updateData).forEach((key) => {
        if (key === "address") {
          formData.append(key, JSON.stringify(updateData[key]));
        } else {
          formData.append(key, updateData[key]);
        }
      });

      // 🆕 Add image ONLY if changed (not default)
      let imageFile = null;
      if (
        profileImage &&
        !profileImage.includes("flaticon") &&
        profileImage !== userProfile?.profileImage
      ) {
        // Convert URL to blob (for preview images)
        const response = await fetch(profileImage);
        imageFile = await response.blob();
        formData.append("profileImage", imageFile, "profile.jpg");
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/profile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("✅ UPDATED:", response.data);
      setSuccessMsg("🎉 Profile updated successfully!");

      // Refresh data
      await getUserPfile();
    } catch (error) {
      console.error("❌ Update failed:", error:.response?.data || error.message);
      setSuccessMsg(`❌ ${error.response?.data?.message || "Update failed"}`);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    getUserPfile();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // 🆕 Upload to server OR show preview
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      // 🆕 OPTIONAL: Upload immediately
      // const formData = new FormData();
      // formData.append('profileImage', file);
      // await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData);
    }
  };

  // 🆕 FIXED: Address from API
  const [address, setAddress] = useState([
    {
      addressLine: user?.address?.[0]?.addressLine || "",
      street: user?.address?.[0]?.street || "",
      city: user?.address?.[0]?.city || "",
      state: user?.address?.[0]?.state || "Punjab",
      zipCode: user?.address?.[0]?.zipCode || "",
      country: user?.address?.[0]?.country || "Pakistan",
    },
  ]);

  const [activeTab, setActiveTab] = useState("profile");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        🔄 Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-[91vh] flex flex-col md:flex-row bg-white">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6 text-center md:text-left">
          My Account
        </h2>
        <div className="flex md:flex-col justify-center md:justify-start gap-3 md:gap-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full md:w-[80%] text-center md:text-left rounded font-medium py-2 px-4 transition ${
              activeTab === "profile"
                ? "bg-orange-100 text-orange-500"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full md:w-[80%] text-center md:text-left rounded font-medium py-2 px-4 transition ${
              activeTab === "orders"
                ? "bg-orange-100 text-orange-500"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Orders
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center p-4 md:p-8">
        {activeTab === "profile" && (
          <div className="border border-gray-300 rounded w-full max-w-3xl p-4 md:p-6">
            {/* 🆕 SUCCESS MESSAGE */}
            {successMsg && (
              <div
                className={`p-3 rounded mb-4 ${
                  successMsg.includes("❌")
                    ? "bg-red-100 text-red-700 border border-red-300"
                    : "bg-green-100 text-green-700 border border-green-300"
                }`}
              >
                {successMsg}
              </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold mb-1">Profile</h2>
                <p className="text-gray-400">
                  Manage your personal information and saved addresses
                </p>
              </div>

              {/* Profile Picture */}
              <div className="relative mx-auto md:mx-0 w-20 h-20 md:w-24 md:h-24">
                <img
                  className="h-full w-full object-cover rounded-full border"
                  src={profileImage}
                  alt="avatar"
                />
                <div
                  className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer hover:bg-gray-100 transition"
                  onClick={handleImageClick}
                >
                  <Camera size={18} className="text-gray-600" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Personal Info */}
            <h3 className="text-lg my-4 border-b border-gray-200 pb-2 font-semibold">
              Personal Information
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full md:w-3/4 bg-gray-50 text-gray-700 mt-1 border border-gray-300 rounded focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none text-base px-3 py-2"
                  type="text"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  value={email}
                  disabled // Email can't be changed
                  className="w-full md:w-3/4 bg-gray-100 text-gray-500 mt-1 border border-gray-300 rounded text-base px-3 py-2"
                  type="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Phone
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full md:w-3/4 bg-gray-50 text-gray-700 mt-1 border border-gray-300 rounded focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none text-base px-3 py-2"
                  type="tel"
                  required
                />
              </div>

              {/* Address Section */}
              <h3 className="text-lg mt-6 border-b border-gray-200 pb-2 font-semibold">
                Address
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-3/4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Address Line
                  </label>
                  <input
                    value={address[0].addressLine}
                    onChange={(e) =>
                      setAddress([
                        { ...address[0], addressLine: e.target.value },
                      ])
                    }
                    className="w-full bg-gray-50 text-gray-700 mt-1 border border-gray-300 rounded focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none text-base px-3 py-2"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Street
                  </label>
                  <input
                    value={address[0].street}
                    onChange={(e) =>
                      setAddress([{ ...address[0], street: e.target.value }])
                    }
                    className="w-full bg-gray-50 text-gray-700 mt-1 border border-gray-300 rounded focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none text-base px-3 py-2"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    City
                  </label>
                  <input
                    value={address[0].city}
                    onChange={(e) =>
                      setAddress([{ ...address[0], city: e.target.value }])
                    }
                    className="w-full bg-gray-50 text-gray-700 mt-1 border border-gray-300 rounded focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none text-base px-3 py-2"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    State
                  </label>
                  <Select
                    value={address[0].state}
                    onValueChange={(value) =>
                      setAddress([{ ...address[0], state: value }])
                    }
                  >
                    <SelectTrigger className="w-full bg-gray-50 border border-gray-300 rounded">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Zip Code
                  </label>
                  <input
                    value={address[0].zipCode}
                    onChange={(e) =>
                      setAddress([{ ...address[0], zipCode: e.target.value }])
                    }
                    className="w-full bg-gray-50 text-gray-700 mt-1 border border-gray-300 rounded focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none text-base px-3 py-2"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Country
                  </label>
                  <input
                    value={address[0].country}
                    onChange={(e) =>
                      setAddress([{ ...address[0], country: e.target.value }])
                    }
                    className="w-full bg-gray-50 text-gray-700 mt-1 border border-gray-300 rounded focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none text-base px-3 py-2"
                    type="text"
                    value="Pakistan"
                    disabled
                  />
                </div>
              </div>

              <div className="w-full flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={updating}
                  className={`px-5 py-2 font-semibold rounded transition ${
                    updating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600"
                  } text-white`}
                >
                  {updating ? "⏳ Saving..." : "💾 Save Changes"}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="w-full text-center text-gray-600 mt-10">
            {user?.orders?.length > 0 ? <OrdersTable /> : <p>No orders yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
