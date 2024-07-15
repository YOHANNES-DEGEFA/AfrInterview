import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">AFRINTERVIEW</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/webrtc">Peer to Peer Interview</Link>
        </li>
        <li>
          <Link to="/home">AI Simulation</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
