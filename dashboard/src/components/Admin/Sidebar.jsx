import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi"; // For Doctor's Profile
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const logoutUrl =
        user?.role === "Admin"
          ? "https://hms-451n.onrender.com/api/v1/user/admin/logout"
          : "https://hms-451n.onrender.com/api/v1/user/doctor/logout";

      const res = await axios.get(logoutUrl, { withCredentials: true });
      toast.success(res.data.message);

      // Reset authentication state
      setIsAuthenticated(false);
      setUser(null);
      navigateTo("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed!");
    }
  };

  const gotoPage = (path) => {
    navigateTo(path);
    setShow(false);
  };

  const AdminLinks = () => (
    <>
      <FaUserDoctor onClick={() => gotoPage("/doctors")} title="Doctors" />
      <MdAddModerator
        onClick={() => gotoPage("/admin/addnew")}
        title="Add Admin"
      />
      <IoPersonAddSharp
        onClick={() => gotoPage("/doctor/addnew")}
        title="Add Doctor"
      />
    </>
  );

  const DoctorLinks = () => (
    <>
      <FiUser onClick={() => gotoPage("/doctor/profile")} title="Profile" />
    </>
  );

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={() => gotoPage("/")} title="Home" />
          <AiFillMessage
            onClick={() => gotoPage("/messages")}
            title="Messages"
          />
          <RiLogoutBoxFill onClick={handleLogout} title="Logout" />

          {/* Admin-Specific Links */}
          {user?.role === "Admin" && <AdminLinks />}

          {/* Doctor-Specific Links */}
          {user?.role === "Doctor" && <DoctorLinks />}
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
