import { Pizza, Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-orange-50 border-t border-orange-100 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h2
            className="flex items-center gap-2 text-2xl font-bold text-orange-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Pizza className="w-6 h-6" />
            Cheezy Treat
          </h2>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">
            Serving happiness one slice at a time. Fresh ingredients, cheesy
            perfection, and fast delivery!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li
              onClick={() => navigate("/")}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/menu")}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Menu
            </li>
            <li
              onClick={() => navigate("/about")}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              About Us
            </li>
            <li
              onClick={() => navigate("/contact")}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li
              onClick={() => navigate("/faqs")}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              FAQs
            </li>
            <li
              onClick={() => navigate("/privacy")}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Privacy Policy
            </li>
            <li
              onClick={() => navigate("/terms")}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </li>
            <li
              onClick={() => navigate("/refund")}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Refund Policy
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Get In Touch
          </h3>
          <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4 text-orange-500" />{" "}
            info.cheezytreat@gmail.com
          </p>
          <div className="flex items-center gap-4">
            <Facebook
              className="w-5 h-5 text-gray-500 hover:text-orange-500 cursor-pointer transition-colors"
              onClick={() => navigate("/facebook")}
            />
            <Instagram
              className="w-5 h-5 text-gray-500 hover:text-orange-500 cursor-pointer transition-colors"
              onClick={() => navigate("/instagram")}
            />
            <Twitter
              className="w-5 h-5 text-gray-500 hover:text-orange-500 cursor-pointer transition-colors"
              onClick={() => navigate("/twitter")}
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-100 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Cheezy Treat. All Rights Reserved.
      </div>
    </footer>
  );
}
