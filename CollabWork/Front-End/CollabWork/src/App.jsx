import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; // Navbar includes ProfileIcon
import Home from "./Pages/Home";
import Events from "./Pages/Events";
import flat from "./Pages/Flatmate";
import Contact from "./Pages/Contact";
import SignIn from "./Pages/SignIn";
import Register from "./Pages/Register";
import Community from "./Pages/Community";

import { UserProvider } from "./Components/UserContext"; // Import UserContext
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
            path="/Events"
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
                <Contact />
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
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
