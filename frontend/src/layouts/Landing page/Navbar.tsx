import { Menu, X } from "lucide-react";
import logo from "./../../assets/logo.png";
import { navItems } from "@/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct import

const Navbar = function () {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Function to toggle the drawer
  const toggleNavBar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // Navigate to the login page
  const navigateSignIn = function () {
    navigate("/register");
  };

  // Navigate to the signIn Page
  const navigateLogin = function () {
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src={logo} alt="logo" className="h-10 w-10 mr-2" />
            <span className="text-xl tracking-tight">BizEdge</span>
          </div>

          {/* Navigation Items */}
          <ul className="hidden lg:flex space-x-8 text-xl">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="text-neutral-300 hover:text-neutral-100">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <button onClick={navigateLogin} className="py-2 px-3 border rounded-md">
              Sign In
            </button>
            <button
              onClick={navigateSignIn}
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
            >
              Create an account
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavBar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <button onClick={navigateLogin} className="py-2 px-3 border rounded-md">
                Sign In
              </button>
              <button
                onClick={navigateSignIn}
                className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
              >
                Create an account
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;