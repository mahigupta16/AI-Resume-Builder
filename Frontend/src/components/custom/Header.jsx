import React, { useEffect } from "react";
import logo from "/logo.svg";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";
import { FaHome, FaGithub, FaUser } from "react-icons/fa";

function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Printing From Header User Found");
    } else {
      console.log("Printing From Header User Not Found");
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.statusCode == 200) {
        dispatch(addUserData(""));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-900 via-primary to-purple-800 text-white shadow-lg fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12 w-12" />
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-100">AI Resume Builder</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-1 text-white hover:text-secondary transition-colors px-3 py-1 rounded-md hover:bg-white/10">
          <FaHome className="text-secondary" />
          <span>Home</span>
        </Link>
        
        {user && (
          <Link to="/dashboard" className="flex items-center space-x-1 text-white hover:text-secondary transition-colors px-3 py-1 rounded-md hover:bg-white/10">
            <FaUser className="text-secondary" />
            <span>Dashboard</span>
          </Link>
        )}
        
        <a 
          href="https://github.com/TraeAI" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-white hover:text-secondary transition-colors px-3 py-1 rounded-md hover:bg-white/10"
        >
          <FaGithub className="text-secondary" />
          <span>GitHub</span>
        </a>
        
        {user ? (
          <Button
            variant="secondary"
            onClick={handleLogout}
            className="bg-gradient-to-r from-teal-500 to-secondary text-white hover:opacity-90 transition-all border border-teal-300/20"
          >
            Logout
          </Button>
        ) : (
          <Link to="/auth/sign-in">
            <Button variant="secondary" className="bg-gradient-to-r from-purple-800 to-primary text-white hover:opacity-90 transition-all border border-purple-300/20">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
