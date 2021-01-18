import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

import "jquery/dist/jquery.min.js";
// import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/rooms" className="nav-link">
            Rooms
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/screening" className="nav-link">
            Screening
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/seances" className="nav-link">
            Seances
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
