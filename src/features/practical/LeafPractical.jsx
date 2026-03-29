import { useEffect, useState } from "react";
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
  const [newspaperChanged, setNewspaperChanged] = useState(false); // Step 3 completion
  const [weekPassed, setWeekPassed] = useState(false); // Step 4 completion (after 2s)
  const [simCurrentStep, setSimCurrentStep] = useState(0);

  useEffect(() => {
    // Step 4 simulation: show clock for 2s then reveal summary.
    if (simCurrentStep === 3) {
      setWeekPassed(false);
      const timer = setTimeout(() => setWeekPassed(true), 2000);
      return () => clearTimeout(timer);
    }

    // Reset when leaving the observation step.
    setWeekPassed(false);
  }, [simCurrentStep]);

  useEffect(() => {
    // Step 3 must be completed fresh whenever user goes back before it.
    if (simCurrentStep < 2) setNewspaperChanged(false);
  }, [simCurrentStep]);

  const materialImages = {
    Maize: leaf2,
    Peepal: leaf3,
    Canna: leaf1,
    Newspaper: newspaperImg,
  };

  const renderLeafExperiment = ({ placedMaterials, currentStep }) => {
    const isStep1 = currentStep === 0; // Wash with water
    const isStep2 = currentStep === 1; // Keep between folds of newspaper
    const isStep3 = currentStep === 2; // Change newspaper (same action as step 2)
    const isStep4 = currentStep === 3; // Observe after 2s (summary)
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

    /* STEP 2 & STEP 3: Newspaper Drop */
    const handleNewspaperDrop = (e) => {
      e.preventDefault();
      const leaf = e.dataTransfer.getData("text/plain");
      if (leaf !== selectedLeaf) return;

      if (currentStep === 1) setLeafInNewspaper(leaf);
      if (currentStep === 2) setNewspaperChanged(true);
    };

    return (
      <div className="leaf-custom-ui">
        <div className="generic-action-hint">
          {currentStep === 0 && !leafInWater && "Step 1: Select a leaf and wash it with water."}
          {currentStep === 0 && leafInWater && "Step 1: Leaf washed! Wipe it dry and move to next step."}
          {currentStep === 1 && !leafInNewspaper && `Step 2: Place the ${selectedLeaf} leaf between the folds of the newspaper.`}
          {currentStep === 1 && leafInNewspaper && "Step 2: Leaf placed! Change newspaper daily to avoid fungal growth."}
          {currentStep === 2 && !newspaperChanged && "Step 3: Change the newspaper (place the same leaf again)."}
          {currentStep === 2 && newspaperChanged && "Step 3: Newspaper changed! Wait for observation (step 4)."}
          {currentStep === 3 && !weekPassed && "Step 4: Clock time-lapse... (2 seconds) Observe the leaf structure."}
          {currentStep === 3 && weekPassed && "Step 4: Observation complete! Review the summary below."}
        </div>
        {/* Leaf Selection */}
        <div className="leaf-selection">
          {availableLeaves.map((leaf) => {
            let isDisabled = false;
            if (isStep1) isDisabled = leafInWater && leafInWater !== leaf;
            if (isStep2 || isStep3) isDisabled = leaf !== selectedLeaf;
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
                onClick={() => {
                  /* Mobile-friendly: Click to place leaf */
                  if (!isDisabled) {
                    if (isStep1) {
                      setLeafInWater(leaf);
                      setSelectedLeaf(leaf);
                    } else if ((isStep2 || isStep3) && leaf === selectedLeaf) {
                      setLeafInNewspaper(leaf);
                      if (isStep3) setNewspaperChanged(true);
                    }
                  }
                }}
                style={{ cursor: !isDisabled ? "pointer" : "default" }}
                title={!isDisabled ? "Click or drag to place leaf" : ""}
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

        {/* STEP 2 & STEP 3: Newspaper Drop */}
        {(isStep2 || isStep3) && (
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

        {/* STEP 4: Clock time-lapse */}
        {isStep4 && !weekPassed && (
          <div className="week-clock-container">
            <svg className="clock-svg" viewBox="0 0 100 100" aria-hidden="true">
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
            <div className="week-message">Time-lapse running...</div>
          </div>
        )}

        {/* STEP 4: Summary */}
        {isStep4 && weekPassed && selectedLeaf && (
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
      onStepChange={(step) => setSimCurrentStep(step)}
      canGoNext={(step) => {
        if (step === 0) return !!leafInWater;        
        if (step === 1) return !!leafInNewspaper;   
        if (step === 2) return newspaperChanged;
        return true;                                
      }}
    />
  );
};

export default LeafPractical;