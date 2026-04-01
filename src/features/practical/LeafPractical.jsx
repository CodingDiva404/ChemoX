import { useEffect, useMemo, useState } from "react";
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
  // Remove "change newspaper daily" from simulator steps (keep only 3 steps in the simulator UI).
  const simulatorChapter = useMemo(() => {
    const proc = chapter?.procedure ?? [];
    if (!Array.isArray(proc) || proc.length === 0) return chapter;
    return {
      ...chapter,
      procedure: proc.filter((_, i) => i !== 2),
    };
  }, [chapter]);

  const [leafInWater, setLeafInWater] = useState(null);
  const [leafInNewspaper, setLeafInNewspaper] = useState(null);
  const [selectedLeaf, setSelectedLeaf] = useState(null);
  const [newspaperFolded, setNewspaperFolded] = useState(false); // Step 2 fold action
  const [weekPassed, setWeekPassed] = useState(false); // Step 3 completion (after 2s)
  const [simCurrentStep, setSimCurrentStep] = useState(0);

  useEffect(() => {
    // Step 3 simulation: show clock for 2s then reveal summary.
    if (simCurrentStep === 2) {
      setWeekPassed(false);
      const timer = setTimeout(() => setWeekPassed(true), 2000);
      return () => clearTimeout(timer);
    }

    // Reset when leaving the observation step.
    setWeekPassed(false);
  }, [simCurrentStep]);

  useEffect(() => {
    // Reset folding when leaving Step 2 or when leaf changes.
    if (simCurrentStep !== 1) setNewspaperFolded(false);
  }, [simCurrentStep, selectedLeaf]);

  const renderLeafExperiment = ({
    placedMaterials,
    handleDrop,
    handleDragOver,
    currentStep,
  }) => {
    // Logic for Step 1: Placing leaf in water
    const handleWaterDrop = (e) => {
      e.preventDefault();
      const item = e.dataTransfer.getData("text/plain");
      if (["Canna", "Maize", "Peepal"].includes(item)) {
        setLeafInWater(item);
        setSelectedLeaf(item);
        handleDrop(e);
      }
    };

    // Logic for Step 2: Placing leaf in newspaper
    const handleNewspaperDrop = (e) => {
      e.preventDefault();
      const item = e.dataTransfer.getData("text/plain");
      if (item === selectedLeaf) {
        setLeafInNewspaper(item);
        setLeafInWater(null);
      }
    };

    return (
      <div className="leaf-workspace" onDragOver={handleDragOver} onDrop={handleDrop}>
        <div className="generic-action-hint">
          {currentStep === 0 && !leafInWater && "Step 1: Drag a leaf into the beaker of water."}
          {currentStep === 0 && leafInWater && "Step 1 complete: Leaf is in water. Click Next."}
          
          {currentStep === 1 && !leafInNewspaper && "Step 2: Drag the leaf from the water to the newspaper."}
          {currentStep === 1 && leafInNewspaper && !newspaperFolded && "Step 2: Now click the newspaper to fold it."}
          {currentStep === 1 && newspaperFolded && "Step 2 complete: Leaf is pressed. Click Next."}
          
          {currentStep === 2 && !weekPassed && "Step 3: Keeping it for a week... (2 seconds simulation)"}
          {currentStep === 2 && weekPassed && "Step 3 complete: Observe the preserved leaf."}
        </div>

        <div className="experiment-row">
          {/* Beaker Area */}
          <div 
            className="beaker-zone" 
            onDrop={handleWaterDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="beaker">
              <div className="water-line" />
              {leafInWater && (
                <img 
                  src={leafInWater === "Canna" ? leaf1 : leafInWater === "Maize" ? leaf2 : leaf3} 
                  className="leaf-in-beaker" 
                  alt="leaf"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", leafInWater)}
                />
              )}
            </div>
            <p className="zone-label">Beaker of Water</p>
          </div>

          {/* Newspaper Area */}
          <div 
            className={`newspaper-zone ${newspaperFolded ? "folded" : ""}`}
            onDrop={handleNewspaperDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => {
              if (leafInNewspaper && !newspaperFolded) setNewspaperFolded(true);
            }}
          >
            <img src={newspaperImg} className="newspaper-img" alt="newspaper" />
            {leafInNewspaper && !newspaperFolded && (
              <img 
                src={leafInNewspaper === "Canna" ? leaf1 : leafInNewspaper === "Maize" ? leaf2 : leaf3} 
                className="leaf-on-paper" 
                alt="leaf" 
              />
            )}
            <p className="zone-label">Newspaper</p>
          </div>
        </div>

        {/* Observation View (Step 3) */}
        {currentStep === 2 && weekPassed && selectedLeaf && (
          <div className="leaf-observation-overlay">
            <div className="observation-card">
              <h3>{selectedLeaf} Leaf Preserved</h3>
              <img 
                src={selectedLeaf === "Canna" ? leaf1 : selectedLeaf === "Maize" ? leaf2 : leaf3} 
                className="leaf-preserved" 
                alt="preserved" 
              />
              <div className="observation-details">
                <p><strong>Observation:</strong> {observationTable[selectedLeaf].structure}</p>
                <p className="sci-note">Note: Changing the newspaper daily prevents fungal growth.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <GenericSimulator
      chapter={simulatorChapter}
      customRenderer={renderLeafExperiment}
      onStepChange={(step) => setSimCurrentStep(step)}
      canGoNext={(step, placedMaterials) => {
        if (step === 0) return !!leafInWater;
        if (step === 1) return !!leafInNewspaper && newspaperFolded;
        if (step === 2) return weekPassed;
        return true;
      }}
    />
  );
};

export default LeafPractical;
