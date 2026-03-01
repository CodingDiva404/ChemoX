import { useState } from "react";
import "./LeafPractical.css";
import GenericSimulator from "../practical/GenericSimulator";

import newspaperImg from "../../assets/images/newspaper.png";
import leaf1 from "../../assets/images/canna.png";
import leaf2 from "../../assets/images/maize.png";
import leaf3 from "../../assets/images/peepal.png";

// Simulated observation table
const observationTable = {
  Maize: { structure: "Parallel venation, long narrow leaf" },
  Peepal: { structure: "Reticulate venation, heart-shaped leaf" },
  Canna: { structure: "Parallel venation, broad leaf" },
};

const LeafPractical = ({ chapter }) => {
  const [leafInWater, setLeafInWater] = useState(null);
  const [leafInNewspaper, setLeafInNewspaper] = useState(null);
  const [selectedLeaf, setSelectedLeaf] = useState(null);
  const [weekPassed, setWeekPassed] = useState(false); // Step 3 completion (week step becomes Step 4 now)

  const materialImages = {
    Maize: leaf2,
    Peepal: leaf3,
    Canna: leaf1,
    Newspaper: newspaperImg,
  };

  const renderLeafExperiment = ({ placedMaterials, currentStep }) => {
    const isStep1 = currentStep === 0;
    const isStep2 = currentStep === 1;
    const isStep3 = currentStep === 2; // Week step now
    const isStep4 = currentStep === 3; // Summary
    const availableLeaves = placedMaterials.filter((m) => m !== "Newspaper");
    const allowDrop = (e) => e.preventDefault();

    /* STEP 1: Water Drop */
    const handleWaterDrop = (e) => {
      e.preventDefault();
      const leaf = e.dataTransfer.getData("text/plain");
      if (!leafInWater && leaf) {
        setLeafInWater(leaf);
        setSelectedLeaf(leaf);
      }
    };

    /* STEP 2: Newspaper Drop */
    const handleNewspaperDrop = (e) => {
      e.preventDefault();
      const leaf = e.dataTransfer.getData("text/plain");
      if (leaf === selectedLeaf) setLeafInNewspaper(leaf);
    };

    /* STEP 3: Week Passed Animation */
    const handleWeekPass = () => setWeekPassed(true);

    return (
      <div className="leaf-custom-ui">
        {/* Leaf Selection */}
        <div className="leaf-selection">
          {availableLeaves.map((leaf) => {
            let isDisabled = false;
            if (isStep1) isDisabled = leafInWater && leafInWater !== leaf;
            if (isStep2) isDisabled = leaf !== selectedLeaf;
            return (
              <img
                key={leaf}
                src={materialImages[leaf]}
                alt={leaf}
                className={`leaf-image ${isDisabled ? "disabled" : ""}`}
                draggable={!isDisabled}
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/plain", leaf)
                }
              />
            );
          })}
        </div>

        {/* STEP 1: Water Container */}
        {isStep1 && (
          <div
            className="water-container"
            onDrop={handleWaterDrop}
            onDragOver={allowDrop}
          >
            <svg viewBox="0 0 200 250" className="water-svg">
              <path
                d="M40 40 L40 200 Q40 220 60 220 L140 220 Q160 220 160 200 L160 40"
                fill="none"
                stroke="#3498db"
                strokeWidth="4"
              />
              <defs>
                <clipPath id="glassClip">
                  <path d="M40 40 L40 200 Q40 220 60 220 L140 220 Q160 220 160 200 L160 40" />
                </clipPath>
              </defs>
              <g clipPath="url(#glassClip)">
                <path
                  className="wave"
                  d="M0 140 Q50 130 100 140 T200 140 V250 H0 Z"
                  fill="#6ec6ff"
                  opacity="0.8"
                />
              </g>
            </svg>
            {leafInWater && (
              <img
                src={materialImages[leafInWater]}
                alt=""
                className="leaf-in-water"
              />
            )}
          </div>
        )}

        {/* STEP 2: Newspaper Drop */}
        {isStep2 && (
          <div
            className="newspaper-container"
            onDrop={handleNewspaperDrop}
            onDragOver={allowDrop}
          >
            <img src={newspaperImg} alt="Newspaper" className="newspaper-img" />
            {leafInNewspaper && (
              <img
                src={materialImages[leafInNewspaper]}
                className="leaf-in-newspaper"
                alt=""
              />
            )}
          </div>
        )}

        {/* STEP 3: Week Clock */}
        {isStep3 && (
          <div className="week-clock-container" onClick={handleWeekPass}>
            <svg className="clock-svg" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#333"
                strokeWidth="3"
                fill="#f5f5f5"
              />
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="30"
                stroke="#333"
                strokeWidth="3"
                className="hour-hand"
              />
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="20"
                stroke="#333"
                strokeWidth="2"
                className="minute-hand"
              />
            </svg>
            <div className="week-message">
              {weekPassed ? "Week passed ✅" : "Click to advance week"}
            </div>
          </div>
        )}

        {/* STEP 4: Summary */}
        {isStep4 && selectedLeaf && (
          <div className="summary-container">
            <h2>Practical Summary</h2>
            <div className="summary-card">
              <img
                src={materialImages[selectedLeaf]}
                alt={selectedLeaf}
                className="summary-leaf-img"
              />
              <h3>{selectedLeaf}</h3>
              <p>Structure: {observationTable[selectedLeaf]?.structure}</p>
              <p>Status: Leaf was washed, pressed, and placed in newspaper.</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <GenericSimulator
      chapter={chapter}
      customRenderer={renderLeafExperiment}
      canGoNext={(step) => {
        if (step === 0) return !!leafInWater;        
        if (step === 1) return !!leafInNewspaper;   
        if (step === 2) return true;                
        return true;                                
      }}
    />
  );
};

export default LeafPractical;