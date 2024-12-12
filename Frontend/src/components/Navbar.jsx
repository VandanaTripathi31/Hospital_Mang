import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  console.log("Navbar isAuthenticated:", isAuthenticated); // Debugging state

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://hms-451n.onrender.com/api/v1/user/patient/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    setIsAuthenticated(true);
    navigateTo("/login");
  };

  return (
    <nav className="container">
      <div className="logo">
        <img src="/logo.png" alt="logo" className="logo-img" />
      </div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to="/" onClick={() => setShow(!show)}>
            Home
          </Link>
          <Link to="/appointment" onClick={() => setShow(!show)}>
            Appointment
          </Link>
          <Link to="/about" onClick={() => setShow(!show)}>
            About Us
          </Link>
          {/* Admin Panel Link */}
          <a
            href="https://ad-dashboar.netlify.app/login"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "black",
              padding: "5px 15px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              fontWeight: "bold",
            }}
          >
            Admin Panel
          </a>
        </div>
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <button className="loginBtn btn" onClick={goToLogin}>
            LOGIN
          </button>
        )}
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
