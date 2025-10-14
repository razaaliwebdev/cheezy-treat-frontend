import { useState, useRef } from "react";
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

const states = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"];

export default function Profile() {
  const [name, setName] = useState("Yash");
  const [email, setEmail] = useState("Yash@123.com");
  const [phone, setPhone] = useState("03264367546");
  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/128/149/149071.png"
  );

  const fileInputRef = useRef(null);

  const { user } = useSelector((state: RootState) => state.auth);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const [address, setAddress] = useState([
    {
      addressLine: "Chak 18/D",
      street: "street 1",
      city: "Okara",
      state: "Punjab",
      zipCode: "53699",
      country: "Pakistan",
    },
  ]);

  const [activeTab, setActiveTab] = useState("profile");

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
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold mb-1">Profile</h2>
                <p className="text-gray-400">
                  Manage your personal information and saved addresses
                </p>
              </div>

              {/* Profile Picture with Upload */}
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

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full md:w-3/4 bg-gray-50 text-gray-700 mt-1 border border-gray-300 rounded focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none text-base px-3 py-2"
                  type="text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full md:w-3/4 bg-gray-50 text-gray-700 mt-1 border border-gray-300 rounded focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none text-base px-3 py-2"
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
                  />
                </div>
              </div>

              <div className="w-full flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="w-full text-center text-gray-600 mt-10">
            {user?.orders?.length < 0 ? <p>No orders yet.</p> : <OrdersTable />}{" "}
          </div>
        )}
      </div>
    </div>
  );
}
