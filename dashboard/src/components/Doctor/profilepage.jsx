import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../main";
import { toast } from "react-toastify";
import axios from "axios";
import "./profilepage.css"; // Import the styling

const DoctorProfile = () => {
  const { user } = useContext(Context); // Get current logged-in user's info
  const [doctorDetails, setDoctorDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    nic: "",
    doctorDepartment: "",
    docAvatar: { url: "" },
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          "https://hms-451n.onrender.com/api/v1/user/doctor/me",
          {
            withCredentials: true,
          }
        );
        setDoctorDetails(response.data.user);
      } catch (error) {
        console.error("Failed to fetch doctor details:", error);
        toast.error("Failed to fetch doctor details!");
      }
    };

    fetchDoctorDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails({ ...doctorDetails, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        "https://hms-451n.onrender.com/api/v1/user/doctor/me",
        doctorDetails,
        { withCredentials: true }
      );
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile!");
    }
    setIsEditing(false);
  };

  return (
    <div className="doctor-profile-container">
      <div className="profile-card">
        <div className="avatar-section">
          {doctorDetails.docAvatar.url && (
            <img
              src={doctorDetails.docAvatar.url}
              alt="Doctor Avatar"
              className="doctor-avatar"
            />
          )}
        </div>
        <div className="info-section">
          <h1 className="doctor-name">
            {doctorDetails.firstName} {doctorDetails.lastName}
          </h1>
          <h3 className="doctor-department">
            {doctorDetails.doctorDepartment}
          </h3>
          <p className="doctor-email">Email: {doctorDetails.email}</p>
          <p className="doctor-phone">Phone: {doctorDetails.phone}</p>
          <p className="doctor-gender">Gender: {doctorDetails.gender}</p>
          <p className="doctor-dob">Date of Birth: {doctorDetails.dob}</p>
          <p className="doctor-nic">NIC: {doctorDetails.nic}</p>
        </div>
        <div className="action-section">
          {isEditing ? (
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
