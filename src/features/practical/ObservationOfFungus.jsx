import { useState, useEffect } from "react";
import GenericSimulator from "../practical/GenericSimulator";
import "./ObservationOfFungus.css";
import sciencePractical from "../../assets/data/sciencePractical.json";

const ObservationOfFungus = () => {
  const bread = `${process.env.PUBLIC_URL}/images/bread-slice.png`;
  const slide = `${process.env.PUBLIC_URL}/images/glass-slide.png`;
  const microscope = `${process.env.PUBLIC_URL}/images/microscope.png`;
  const hyphae = `${process.env.PUBLIC_URL}/images/hyphae.png`;

  const [simCurrentStep, setSimCurrentStep] = useState(0);
  const [latestPlacedMaterials, setLatestPlacedMaterials] = useState([]);
  const [humidTimerDone, setHumidTimerDone] = useState(false);
  const [slideInContainer, setSlideInContainer] = useState(false);
  const [sampleTaken, setSampleTaken] = useState(false);
  const [microscopeView, setMicroscopeView] = useState(false);

  const containerReady =
    latestPlacedMaterials.includes("Glass Slide") &&
    latestPlacedMaterials.includes("Bread or roti") &&
    latestPlacedMaterials.includes("Water");

  /* Warm/humid time-lapse */
  useEffect(() => {
    if (simCurrentStep === 1 && containerReady && !humidTimerDone) {
      const timer = setTimeout(() => {
        setHumidTimerDone(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [simCurrentStep, containerReady, humidTimerDone]);

  /* Reset when going back before warm & humid step */
  useEffect(() => {
    if (simCurrentStep < 1) {
      setHumidTimerDone(false);
      setSlideInContainer(false);
      setSampleTaken(false);
      setMicroscopeView(false);
    }
  }, [simCurrentStep]);

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

    const slidePlaced = placedMaterials.includes("Glass Slide");
    const breadPlaced = placedMaterials.includes("Bread or roti");
    const waterAdded = placedMaterials.includes("Water");
    const isContainerReady = slidePlaced && breadPlaced && waterAdded;

    // Matches the JSON procedure:
    // Step 1: prepare setup
    // Step 2: warm & humid (2s simulation)
    // Step 3+: fungus appears after warm/humid simulation
    const showFungus = humidTimerDone && currentStep >= 2 && isContainerReady;
    const canTakeSample = showFungus && currentStep >= 4;

    /* Show only result screen */
    if (microscopeView) {
      const observations = Array.isArray(chapter?.observation)
        ? chapter.observation
        : [];

      return (
        <div className="result-screen">
          <img src={hyphae} alt="hyphae" />
          <p className="result-text">
            Mucor hyphae observed under microscope
          </p>
          {observations.length > 0 && (
            <div className="result-observation-block">
              <h3 className="result-observation-title">Observation</h3>
              <ul className="result-observation-list">
                {observations.map((obs, i) => (
                  <li key={i}>{obs}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }

    const humidEnvironment = currentStep >= 1;
    const preparedReady = isContainerReady;

    const handlePreparedDragStart = (e) => {
      if (!preparedReady) return;
      e.dataTransfer.setData("preparedSlide", "true");
    };

    const handleContainerDrop = (e) => {
      e.preventDefault();
      const prepared = e.dataTransfer.getData("preparedSlide");
      if (prepared === "true") setSlideInContainer(true);
    };

    return (
      <div
        className={`fungus-workspace ${sampleTaken ? "fade-out-experiment" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="generic-action-hint">
          {currentStep === 0 &&
            !isContainerReady &&
            "Step 1: Drag Bread or roti, Glass Slide, and Water into the workspace."}
          {currentStep === 0 &&
            isContainerReady &&
            !slideInContainer &&
            "Step 1: Now drag (or click) the prepared slide into the container."}
          {currentStep === 0 &&
            isContainerReady &&
            slideInContainer &&
            "Step 1 complete: Setup placed in container. Click Next."}

          {currentStep === 1 &&
            !humidTimerDone &&
            "Step 2: Keep it in a warm and humid corner (2 seconds simulation)."}
          {currentStep === 1 &&
            humidTimerDone &&
            "Step 2 complete: Time-lapse done. Click Next to observe."}

          {currentStep === 2 &&
            (showFungus
              ? "Step 3: Observe the bread piece after 2–3 days for fungus growth."
              : "Step 3: Waiting for fungus growth...")}

          {currentStep === 3 &&
            "Step 4: The stale bread shows cottony growth of fungal hyphae (Mucor)."}

          {currentStep === 4 &&
            showFungus &&
            !sampleTaken &&
            "Step 5: Drag or click the fungus sample to the microscope."}
          {currentStep === 4 && sampleTaken && "Step 5: Observing under microscope..."}
        </div>

        {/* Step 1: Slide preparation view */}
        {currentStep === 0 && slidePlaced && (
          <div className="slide-area">
            <div
              className="slide-area"
              draggable={preparedReady && !slideInContainer}
              onDragStart={handlePreparedDragStart}
              onClick={() => {
                if (preparedReady && !slideInContainer) setSlideInContainer(true);
              }}
              style={{
                cursor: preparedReady && !slideInContainer ? "pointer" : "default",
              }}
              title={
                preparedReady && !slideInContainer
                  ? "Drag or click to place in container"
                  : ""
              }
            >

              <img src={slide} className="slide-img" alt="slide" />

              {breadPlaced && (
                <div className="bread-wrapper">
                  <img src={bread} className="bread-img" alt="bread" />
                </div>
              )}

              {waterAdded && <div className="water-splash"></div>}

            </div>
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
              {slideInContainer && isContainerReady && (
                <div className="inside-container">
                  <div className="bread-wrapper">
                    <img src={bread} className="bread-img" alt="bread" />

                    {showFungus && (
                      <div
                        className="fungus"
                        draggable={canTakeSample}
                        onDragStart={(e) => {
                          if (!canTakeSample) return;
                          e.dataTransfer.setData("fungusSample", "true");
                        }}
                        onClick={() => {
                          if (!canTakeSample) return;
                          setSampleTaken(true);
                          setTimeout(() => {
                            setMicroscopeView(true);
                          }, 800);
                        }}
                        style={{ cursor: canTakeSample ? "pointer" : "default" }}
                        title={canTakeSample ? "Click or drag fungus sample to microscope" : ""}
                      />
                    )}
                  </div>

                  {currentStep === 3 && showFungus && Array.isArray(chapter?.observation) && (
                    <div className="fungus-observation">
                      {chapter.observation[0]}
                    </div>
                  )}
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

                if (sample === "true" && canTakeSample) {
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
      onStepChange={(step) => setSimCurrentStep(step)}
      onMaterialPlace={(mats) => setLatestPlacedMaterials(mats)}
      canGoNext={(step, placedMaterials) => {
        const hasBread = placedMaterials.includes("Bread or roti");
        const hasSlide = placedMaterials.includes("Glass Slide");
        const hasWater = placedMaterials.includes("Water");
        const ready = hasBread && hasSlide && hasWater;

        if (step === 0) return ready && slideInContainer;
        if (step === 1) return humidTimerDone;
        const total = chapter?.procedure?.length ?? 0;
        if (!total) return true;
        return step < total - 1;
      }}
    />
  );
};

export default ObservationOfFungus;