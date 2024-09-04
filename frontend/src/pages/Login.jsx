import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css'; 

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        formData
      );
      console.log("Login successful!", response.data);
      localStorage.setItem("accessToken", response.data.tokens.access);
      localStorage.setItem("refreshToken", response.data.tokens.refresh);
      setSuccessMessage("Login successful!"); 
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
     
    } catch (error) {
      if (error.response && error.response.data) {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}

      <h2 className="heading">Login</h2>
      <form onSubmit={handleSubmit} className="form">
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
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
