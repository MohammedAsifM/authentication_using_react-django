import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import '../App.css'; 

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        formData
      );
      setSuccessMessage("Registration Successful!");
      
     
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach(field => {
          const errorMessage = error.response.data[field];
          if (errorMessage && errorMessage.length > 0) {
            setError(errorMessage[0]);
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <h2 className="heading">Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="input"
        />
        <label className="label">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
        />
        <label className="label">Password:</label>
        <input
          type="password"
          name="password1"
          value={formData.password1}
          onChange={handleChange}
          className="input"
        />
        <label className="label">Confirm Password:</label>
        <input
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
