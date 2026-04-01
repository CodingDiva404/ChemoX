import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const HeroSection = () => {
  const navigate = useNavigate();
  const kid = "/1.png";

  const handleStart = () => {
    navigate("/curriculum");
  };

  return (
    <section className="hero-container">
      <div className="hero-left">
        <h1 className="hero-title">
          Science Comes to Life! <br />
          Perform Dangerous Experiments Safely
        </h1>

        <p className="hero-sub">
          Hands-on virtual labs for Science Enthusiasts. Physics, Chemistry, and
          Biology — all in one place.
        </p>

        <button className="cta-btn" onClick={handleStart}>
          START EXPERIMENTING NOW
        </button>
      </div>

      <div className="hero-right">
        <img src={kid} alt="Kid Experimenting" className="hero-image" />
      </div>
    </section>
  );
};

export default HeroSection;