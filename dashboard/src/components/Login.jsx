import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(true); // State to toggle between Admin and Doctor

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hms-451n.onrender.com/api/v1/user/login",
        {
          email,
          password,
          confirmpassword,
          role: isAdminLogin ? "Admin" : "Doctor", // Toggle role dynamically
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      setUser({
        ...response.data.user,
        role: isAdminLogin ? "Admin" : "Doctor",
      });

      // Navigate to the same dashboard for both Admin and Doctor
      navigateTo("/");
      setEmail("");
      setPassword("");
      setConfirmpassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
      setIsAuthenticated(false);
      setUser({});
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <section className="container form-component">
      <img src="/logo.png" alt="logo" className="logo" />
      <h1 className="form-title">WELCOME TO ZEECARE</h1>
      <h2
        style={{
          color: "#4A4A4A",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {isAdminLogin ? "Admin Login" : "Doctor Login"}
      </h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
        <p style={{ marginTop: "15px", fontSize: "14px", textAlign: "center" }}>
          {isAdminLogin ? "Doctor Login?" : "Admin Login?"}{" "}
          <span
            onClick={() => setIsAdminLogin(!isAdminLogin)} // Toggle login role
            style={{
              color: "#007BFF",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Click here
          </span>
        </p>
      </form>
    </section>
  );
};

export default Login;
