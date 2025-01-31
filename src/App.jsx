<<<<<<< HEAD
// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManageUsers from "./pages/ManageUser";
import "./Styles/Styles.css";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authenticated") === "true"
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("authenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authenticated");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
    
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="/manage-users" element={<ManageUsers />} />
   

      </Routes>
    </Router>
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; // Navbar includes ProfileIcon
import Home from "./Pages/Home";
import Events from "./Pages/Events";
import Contact from "./Pages/Contact";
import SignIn from "./Pages/SignIn";
import Register from "./Pages/Register";
import Community from "./Pages/Community";
import { UserProvider } from "./Components/UserContext";
import FlatmateFinder from "./Pages/Flatmate";
import ProtectedRoute from "./Components/ProtectedRoute"; // Import ProtectedRoute
import "./Styling/styles.css"; // Global styles

function App() {
  return (
    <UserProvider>
      <Router>
        {/* Navbar always visible */}
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />

          {/* Home page accessible to all */}
          <Route path="/" element={<Home />} />

          {/* Protected Routes */}
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
            <Route
            path="/flat"
            element={
              <ProtectedRoute>
                <FlatmateFinder />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
>>>>>>> 85e2baa (Initial commit)
  );
}

export default App;
