import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Components/UserContext"; // Ensure correct path
import { auth } from "./firebase"; // Ensure Firebase is configured correctly
import "../Styling/ProfileIcon.css";
import { CgProfile } from "react-icons/cg";

const ProfileIcon = () => {
  const { user, setUser } = useContext(UserContext); // Use `setUser` to update the user state
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".profile-icon-container")) {
        setIsDropdownVisible(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownVisible]);

  const handleSignOut = async () => {
    try {
      console.log("Attempting to sign out...");
      await auth.signOut(); // Sign out from Firebase
      console.log("User signed out successfully");

      // Clear the user context
      setUser(null);

      // Navigate to sign-in page
      navigate("/signin");
    } catch (error) {
      console.error("Sign Out Error:", error.message);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-icon-container">
      <CgProfile
        className="profile-icon"
        onClick={toggleDropdown}
        role="button"
        aria-haspopup="true"
        aria-expanded={isDropdownVisible}
      />
      {isDropdownVisible && (
        <div className="profile-dropdown">
          <p className="user-name">{user.name || "User"}</p>
          <p className="user-email">{user.email}</p>
          {user.company && <p className="user-company">{user.company}</p>}
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
