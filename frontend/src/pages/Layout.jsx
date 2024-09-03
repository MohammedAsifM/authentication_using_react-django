import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../App.css'; // Ensure this path is correct

export default function Layout() {
  return (
    <div className="layout-container">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="brand-logo">Authentication</Link>
        </div>
        <div className="navbar-right">
          <Link to="/" className="nav-link">Home</Link>
          <Link to='/login' className="nav-link">Login</Link>
          <Link to='/register' className="nav-link">Register</Link>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
