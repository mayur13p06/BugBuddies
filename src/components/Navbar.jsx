import  { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import  {UserContext}  from '../Components/UserContext'; // Named import
import ProfileIcon from "./ProfileIcon"; // Import ProfileIcon component
import "../Styling/Navbar.css";
import { px } from "framer-motion";
// import  "../assets/images/WhatsApp Image 2025-01-31 at 09.01.03_4b13f6cb.jpg"

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
     <div className="navbar-logo">
  <a href="/"> {/* Add the home page URL here */}
    <img 
      src="images\WhatsApp_Image_2025-01-31_at_09.01.03_4b13f6cb-removebg-preview.png" 
      alt="hi" 
      width={70} 
    />
    StudSync
  </a>
</div>

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
          <NavLink to="/flat" activeclassname="active">
            Find Flatmate
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeclassname="active">
            Success Stories
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