import  { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import  {UserContext}  from '../Components/UserContext'; // Named import
import ProfileIcon from "./ProfileIcon"; // Import ProfileIcon component
import "../Styling/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Access the user state from UserContext

  // Function to handle navigation to SignIn
  const handleSignInClick = () => {
    navigate("/signin");
  };

  // Function to handle navigation to Register
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">StudSync</div>

      <ul className="navbar-links">
        <li>
          <NavLink to="/" exact="true" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/community" activeclassname="active">
            Community
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" activeclassname="active">
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/join" activeclassname="active">
            Join Group
          </NavLink>
        </li>
        <li>
          <NavLink to="/flat" activeclassname="active">
            Find Flatmate
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeclassname="active">
            Contact Us
          </NavLink>
        </li>
      </ul>

      <div className="navbar-actions">
        {/* Show Sign-In and Register buttons only if the user is NOT signed in */}
        {!user ? (
          <>
            <button className="btn-signin" onClick={handleSignInClick}>
              Sign-in
            </button>
            <button className="btn-register" onClick={handleRegisterClick}>
              Register
            </button>
          </>
        ) : (
          // Show ProfileIcon if the user is signed in
          <ProfileIcon />
        )}
      </div>
    </nav>
  );
}

export default Navbar;