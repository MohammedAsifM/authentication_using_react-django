import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'; // Ensure this path is correct

export default function Home() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            "http://localhost:8000/api/user/",
            config
          );
          setLoggedIn(true);
          setUsername(response.data.username || "User");
        } else {
          setLoggedIn(false);
          setUsername("");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setLoggedIn(false);
        setUsername("");
      }
    };

    checkLoggedInUser();
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await axios.post(
          "http://localhost:8000/api/logout/",
          { refresh: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          }
        );
        console.log("Logout successful!");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLoggedIn(false);
        setUsername("");
      }
    } catch (error) {
      console.error("Failed to logout:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="home-container">
      {isLoggedIn ? (
        <>
          <h1 className="welcome-message">Hi, {username}! Thanks for logging in!</h1>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <h2 className="login-prompt">Please Login</h2>
      )}
    </div>
  );
}
