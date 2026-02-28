import { useState } from "react";
import "./LeafPractical.css";

import newspaperImg from "../../assets/images/newspaper.png";
import leaf1 from "../../assets/images/canna.png";
import leaf2 from "../../assets/images/maize.png";
import leaf3 from "../../assets/images/peepal.png";

const LeafPractical = ({ chapter }) => {

  const materialsList = chapter?.materials ?? chapter?.requirements ?? [];
  const steps = chapter?.procedure ?? [];

  const [simStep, setSimStep] = useState(0);
  const [selectedLeaf, setSelectedLeaf] = useState(null);
  const [hasNewspaper, setHasNewspaper] = useState(false);

  const materialImages = {
    Maize: leaf2,
    Peepal: leaf3,
    Canna: leaf1,
    Newspaper: newspaperImg
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("text/plain");

    if (item === "Newspaper") {
      setHasNewspaper(true);
    } else {
      if (!hasNewspaper) return;
      setSelectedLeaf(item);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const nextStep = () => {
    if (!selectedLeaf || !hasNewspaper) return;
    if (simStep < steps.length - 1) {
      setSimStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (simStep > 0) {
      setSimStep(prev => prev - 1);
    }
  };

  return (
    <div className="leaf-container">
      <div className="leaf-content">
        {/* 75% Simulator */}
        <div
          className="simulator-box"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >

        {hasNewspaper && (
          <img
            src={materialImages["Newspaper"]}
            alt="Newspaper"
            className="newspaper-image"
          />
        )}

        {hasNewspaper && selectedLeaf && (
          <img
            src={materialImages[selectedLeaf]}
            alt={selectedLeaf}
            className="leaf-image"
          />
        )}

        {hasNewspaper && selectedLeaf && steps.length > 0 && (
          <div className="step-overlay">
            <div className="step-badge">
              Step {simStep + 1}
            </div>
            <div className="step-text">
              {steps[simStep]}
            </div>
          </div>
        )}
        </div>

        {/* 25% Materials */}
        <div className="materials-box">
        <h4>Materials</h4>

        <div className="materials-scroll">
          {materialsList.length > 0 ? (
            materialsList.map((item, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className="draggable-item"
              >
                {item}
              </div>
            ))
          ) : (
            <p>No materials available</p>
          )}
        </div>
        </div>
      </div>

      {/* Controls */}
      <div className="stimulator-controls">
        <button onClick={prevStep} disabled={simStep === 0}>
          Previous
        </button>
        <button onClick={nextStep} disabled={!selectedLeaf || !hasNewspaper}>
          Next
        </button>
      </div>

    </div>
  );
};

export default LeafPractical;
