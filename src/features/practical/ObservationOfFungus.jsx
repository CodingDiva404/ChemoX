import { useState, useEffect } from "react";
import GenericSimulator from "../practical/GenericSimulator";
import "./ObservationOfFungus.css";
import sciencePractical from "../../assets/data/sciencePractical.json";

import bread from "../../assets/images/bread-slice.png";
import slide from "../../assets/images/glass-slide.png";
import microscope from "../../assets/images/microscope.png";
import hyphae from "../../assets/images/hyphae.png";

const ObservationOfFungus = () => {

  const [slideInContainer, setSlideInContainer] = useState(false);
  const [showFungus, setShowFungus] = useState(false);
  const [currentStepState, setCurrentStepState] = useState(0);
  const [sampleTaken, setSampleTaken] = useState(false);
  const [microscopeView, setMicroscopeView] = useState(false);

  /* Fungus growth timelapse */
  useEffect(() => {
    if (currentStepState >= 2) {
      const timer = setTimeout(() => {
        setShowFungus(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentStepState]);

  const allChapters = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals);

  const chapter =
    allChapters.find((p) => p.id === "bio-8-01") || {
      title: "Observation of Fungus",
      materials: ["Bread or roti", "Glass Slide", "Water", "Container"],
      procedure: [
        "Take a piece of bread or roti on a glass slide.",
        "Dampen it with a little water.",
        "Keep it in a container.",
        "Place it in a warm and humid corner.",
        "Observe the bread piece after 2–3 days.",
        "Take a few fragments of this fungus and observe under the microscope."
      ]
    };

  const renderFungusExperiment = ({
    placedMaterials,
    handleDrop,
    handleDragOver,
    currentStep
  }) => {

    if (currentStep !== currentStepState) {
      setCurrentStepState(currentStep);
    }

    /* Show only result screen */
    if (microscopeView) {
      return (
        <div className="result-screen">
          <img src={hyphae} alt="hyphae" />
          <p className="result-text">
            Mucor hyphae observed under microscope
          </p>
        </div>
      );
    }

    const humidEnvironment = currentStep >= 1;

    const slidePlaced = placedMaterials.includes("Glass Slide");
    const breadPlaced = placedMaterials.includes("Bread or roti");
    const waterAdded = placedMaterials.includes("Water");

    const handlePreparedSlideDrag = (e) => {
      e.stopPropagation();
      e.dataTransfer.setData("prepared", "true");
    };

    const handleContainerDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const item = e.dataTransfer.getData("prepared");

      if (item === "true") {
        setSlideInContainer(true);
      }
    };

    return (
      <div
        className={`fungus-workspace ${sampleTaken ? "fade-out-experiment" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >

        {!slidePlaced && (
          <p className="fungus-hint">Drag the Glass Slide here</p>
        )}

    { /* STEP 1: Prepare slide */}
    {slidePlaced && !slideInContainer && currentStep <= 2 && (
      <div
        className="slide-area"
        draggable={breadPlaced && waterAdded}
        onDragStart={handlePreparedSlideDrag}
        onClick={() => {
          /* Mobile-friendly: Click to place in container if ready */
          if (breadPlaced && waterAdded && currentStep === 2) {
            setSlideInContainer(true);
          }
        }}
        style={{ 
          cursor: (breadPlaced && waterAdded && currentStep === 2) ? "pointer" : "default" 
        }}
        title={ (breadPlaced && waterAdded && currentStep === 2) ? "Click or drag to place in container" : "" }
      >

            <img src={slide} className="slide-img" alt="slide" />

            {breadPlaced && (
              <div className="bread-wrapper">
                <img src={bread} className="bread-img" alt="bread" />
              </div>
            )}

            {waterAdded && <div className="water-splash"></div>}

          </div>
        )}

        {/* Container + Microscope Row */}
        <div className="experiment-row">

          {/* Container */}
          <div
            className={`container-area ${humidEnvironment ? "humid-bg" : ""}`}
            onDrop={handleContainerDrop}
            onDragOver={(e) => e.preventDefault()}
          >

            <div className="glass-container">

              {slideInContainer && (
                <div className="inside-container">

                  <div className="bread-wrapper">
                    <img src={bread} className="bread-img" alt="bread" />

                    {/* STEP 4: Fungus growth */}
                    {showFungus && (
                      <div
                        className="fungus"
                        draggable={currentStep >= 4}
                        onDragStart={(e) => {
                          e.dataTransfer.setData("fungusSample", "true");
                        }}
                        onClick={() => {
                          /* Mobile-friendly: Click to take sample to microscope */
                          if (currentStep >= 4) {
                            setSampleTaken(true);
                            setTimeout(() => {
                              setMicroscopeView(true);
                            }, 800);
                          }
                        }}
                        style={{ cursor: currentStep >= 4 ? "pointer" : "default" }}
                        title={currentStep >= 4 ? "Click or drag fungus sample to microscope" : ""}
                      ></div>
                    )}

                  </div>

                </div>
              )}

            </div>

          </div>

          {/* STEP 5: Microscope */}
          {currentStep >= 4 && (
            <div
              className="microscope-area"
              onDrop={(e) => {
                e.preventDefault();
                const sample = e.dataTransfer.getData("fungusSample");

                if (sample === "true") {
                  setSampleTaken(true);

                  setTimeout(() => {
                    setMicroscopeView(true);
                  }, 800);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
            >

              <img
                src={microscope}
                className="microscope-img"
                alt="microscope"
              />

              {!sampleTaken && (
                <p className="microscope-hint">
                  Drag fungus sample to microscope
                </p>
              )}

            </div>
          )}

        </div>

      </div>
    );
  };

  return (
    <GenericSimulator
      chapter={chapter}
      customRenderer={renderFungusExperiment}
    />
  );
};

export default ObservationOfFungus;