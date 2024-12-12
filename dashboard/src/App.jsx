import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Context } from "./main";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Dashboard from "./components/Admin/Dashboard";
import AddNewDoctor from "./components/Admin/AddNewDoctor";
import AddNewAdmin from "./components/Admin/AddNewAdmin";
import Messages from "./components/Admin/Messages";
import Doctors from "./components/Admin/Doctors";
import Sidebar from "./components/Admin/Sidebar";
import Profilepage from "./components/Doctor/profilepage";
import axios from "axios";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const adminResponse = await axios.get(
          "https://hms-451n.onrender.com/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );

        if (adminResponse.data.user) {
          setUser({ ...adminResponse.data.user, role: "Admin" });
          setIsAuthenticated(true);
          return;
        }
      } catch (error) {
        console.error("Admin fetch failed:", error);
      }

      try {
        const doctorResponse = await axios.get(
          "https://hms-451n.onrender.com/api/v1/user/doctor/me",
          {
            withCredentials: true,
          }
        );

        if (doctorResponse.data.user) {
          setUser({ ...doctorResponse.data.user, role: "Doctor" });
          setIsAuthenticated(true);
          return;
        }
      } catch (error) {
        console.error("Doctor fetch failed:", error);
      }

      // If both fetches fail
      setIsAuthenticated(false);
      setUser({});
    };

    fetchUser().catch((error) => {
      toast.error("An unexpected error occurred.");
      console.error(error);
    });
  }, [setIsAuthenticated, setUser]);

  // Protected Route Logic
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    return children;
  };

  return (
    <Router>
      {isAuthenticated && user?.role && <Sidebar role={user?.role} />}
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/addnew"
          element={
            <ProtectedRoute>
              <AddNewDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addnew"
          element={
            <ProtectedRoute>
              <AddNewAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute>
              <Profilepage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
