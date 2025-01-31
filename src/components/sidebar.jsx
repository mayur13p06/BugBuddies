import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Admin Menu</h3>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/events">Manage Events</Link></li>
        <li><Link to="/registrations">Registrations</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
}
