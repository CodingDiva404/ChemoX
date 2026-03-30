import React, { useState } from "react";
import "../../App.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navBar">
      <div className="logo">
        <Link to="/" className="navLink">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="desktop-menu">
        <ul>
          <li>
            <Link
              to="/curriculum"
              className="navLink"
              onClick={() => {
                const section = document.getElementById("curriculum");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Curriculum
            </Link>
          </li>

          {/* <li>
            <Link to="/library" className="navLink">
              Library
            </Link>
          </li> */}

          <li>
            <Link to="/perodic-table" className="navLink">
              PT Class
            </Link>
          </li>
        </ul>
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <ul>
          <li>
            <Link
              to="/curriculum"
              className="navLink"
              onClick={() => {
                setMenuOpen(false);
                const section = document.getElementById("curriculum");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Curriculum
            </Link>
          </li>

          <li>
            <Link
              to="/library"
              className="navLink"
              onClick={() => setMenuOpen(false)}
            >
              Library
            </Link>
          </li>

          <li>
            <Link
              to="/perodic-table"
              className="navLink"
              onClick={() => setMenuOpen(false)}
            >
              PT Class
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
