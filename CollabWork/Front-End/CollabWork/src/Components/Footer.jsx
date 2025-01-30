import React from 'react';
import '../Styling/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} StudSync. All Rights Reserved.</p>
      <ul className="footer-links">
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
