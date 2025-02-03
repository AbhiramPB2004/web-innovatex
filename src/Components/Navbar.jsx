import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px", borderBottom: "2px solid #ddd" }}>
      <ul style={{ display: "flex", listStyle: "none", gap: "15px", padding: 0, margin: 0 }}>
        <li><ScrollLink to="dashboard" smooth={true} duration={500}>Dashboard</ScrollLink></li>
        <li><ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink></li>
        <li><ScrollLink to="events" smooth={true} duration={500}>Events</ScrollLink></li>
        <li><ScrollLink to="contact" smooth={true} duration={500}>Contact</ScrollLink></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;