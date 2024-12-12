import React, { useContext, useEffect, useState } from "react";
// src/components/Admin/AddNewAdmin.jsx
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { isAuthenticated, user } = useContext(Context);

  const [appointments, setAppointment] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://hms-451n.onrender.com/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointment(data.appointment);
      } catch (error) {
        setAppointment([]);
        console.log("SOME ERROR OCCURED WHILE FETCHING APPOINTMENTS", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `https://hms-451n.onrender.com/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointment((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message.data.message);
    }
  };
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/doc.png" alt="doc.img" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
            </div>
            <p>Welcome to your dashboard!</p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointment</p>
          <h3>{appointments.length}</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>20</h3>
        </div>
      </div>
      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment) => {
                return (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>{appointment.appointment_date.substring(0, 16)}</td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Rejected"
                            ? "value-rejected"
                            : "value-accepted"
                        }
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td>
                      {appointment.hasVisited === true ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  NO APPOINTMENTS
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminDashboard;
