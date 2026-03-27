import { useState } from "react";
import GenericSimulator from "../practical/GenericSimulator";
import sciencePractical from "../../assets/data/sciencePractical.json";
import './IdentificationOfAcidsBases.css'

const IdentificationOfAcidsBases = ({ chapter: chapterProp }) => {
  /* Experiment States */
  const [currentChemical, setCurrentChemical] = useState(null);
  const [tubeChemicals, setTubeChemicals] = useState([null, null, null, null]);

  const [tubeResults, setTubeResults] = useState([
    { type: null, color: null },
    { type: null, color: null },
    { type: null, color: null },
    { type: null, color: null },
  ]);

  const allChapters = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals);

  const chapter =
    chapterProp ||
    allChapters.find((p) => p.id === "phy-9-01") || {
      id: "phy-9-01",
      title: "Identification of Acids and Bases using Indicators",
      materials: ["Test tubes", "Test Tube Stand"],
      chemical: [
        "Red litmus paper",
        "Blue litmus paper",
        "Phenolphthalein",
        "Methyl orange",
        "Lemon juice",
        "Vinegar",
        "Ammonium hydroxide (NH4OH)",
        "Baking soda (NaHCO3)",
        "Soap solution",
        "Dilute hydrochloric acid",
      ],
      procedure: [
        "Four test tubes are already placed in a stand.",
        "Add a chemical into all test tubes.",
        "Add Red Litmus to Tube 1.",
        "Add Blue Litmus to Tube 2.",
        "Add Phenolphthalein to Tube 3.",
        "Add Methyl Orange to Tube 4.",
      ],
    };

  /* Indicator Logic */
  const indicatorLogic = (chemical, indicator) => {
    const isAcid = ["Lemon juice", "Vinegar", "Dilute hydrochloric acid"].includes(chemical);
    const isBase = ["Ammonium hydroxide (NH4OH)", "Baking soda (NaHCO3)", "Soap solution"].includes(chemical);

    if (indicator === "Red litmus paper") {
      return isBase ? "blue" : "red";
    }
    if (indicator === "Blue litmus paper") {
      return isAcid ? "red" : "blue";
    }
    if (indicator === "Phenolphthalein") {
      return isBase ? "pink" : "transparent";
    }
    if (indicator === "Methyl orange") {
      return isAcid ? "red" : isBase ? "yellow" : "orange";
    }
    return null;
  };

  const renderIndicatorsExperiment = ({
    handleDrop,
    handleDragOver,
    currentStep,
  }) => {
    const onDropZone = (e) => {
      e.preventDefault();
      const item = e.dataTransfer.getData("text/plain");

      /* Step 1: Add Chemical */
      if (currentStep === 0) {
        const chemicals = [
          "Lemon juice",
          "Vinegar",
          "Ammonium hydroxide (NH4OH)",
          "Baking soda (NaHCO3)",
          "Soap solution",
          "Dilute hydrochloric acid",
        ];

        if (chemicals.includes(item)) {
          setCurrentChemical(item);
          setTubeChemicals([item, item, item, item]);
          handleDrop(e);
        }
      }

      /* Step 2–5: Add Indicators */
      if (currentStep >= 1 && currentStep <= 4) {
        const expectedIndicators = [
          "Red litmus paper",
          "Blue litmus paper",
          "Phenolphthalein",
          "Methyl orange",
        ];

        const tubeIdx = currentStep - 1;

        if (item === expectedIndicators[tubeIdx]) {
          const resultColor = indicatorLogic(currentChemical, item);
          const newResults = [...tubeResults];
          newResults[tubeIdx] = { type: item, color: resultColor };
          setTubeResults(newResults);
          handleDrop(e);
        }
      }
    };

    const renderActionHint = () => (
      <div className="generic-action-hint">
        {currentStep === 0 && !currentChemical &&
          "Step 1: Drag a chemical (e.g., Lemon juice) into the test tubes."}
        {currentStep === 0 && currentChemical &&
          `${currentChemical} added! Click next.`}

        {currentStep === 1 && !tubeResults[0].type &&
          "Step 2: Add Red Litmus to Tube 1."}
        {currentStep === 2 && !tubeResults[1].type &&
          "Step 3: Add Blue Litmus to Tube 2."}
        {currentStep === 3 && !tubeResults[2].type &&
          "Step 4: Add Phenolphthalein to Tube 3."}
        {currentStep === 4 && !tubeResults[3].type &&
          "Step 5: Add Methyl Orange to Tube 4."}
      </div>
    );

    return (
      <div
        className="acids-bases-workspace"
        onDrop={onDropZone}
        onDragOver={handleDragOver}
      >
        {renderActionHint()}

        <div className="lab-setup">
          <div className="tube-stand-container">
            <div className="test-tube-stand">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="tube-slot">
                  <div className="test-tube">
                    {tubeChemicals[i] && (
                      <div
                        className="tube-liquid"
                        style={{
                          backgroundColor:
                            tubeResults[i].color || "#dfe6e9",
                        }}
                      />
                    )}

                    <div className="tube-label">Tube {i + 1}</div>

                    {tubeResults[i].type && (
                      <div className="indicator-applied">
                        {tubeResults[i].type.includes("litmus")
                          ? "🔖"
                          : "💧"}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {currentStep > 4 && (
          <div className="experiment-result">
            <h4>Observations for {currentChemical}</h4>
            <ul>
              <li>
                Red Litmus:{" "}
                {tubeResults[0].color === "blue"
                  ? "Turned Blue (Base)"
                  : "No Change"}
              </li>
              <li>
                Blue Litmus:{" "}
                {tubeResults[1].color === "red"
                  ? "Turned Red (Acid)"
                  : "No Change"}
              </li>
              <li>
                Phenolphthalein:{" "}
                {tubeResults[2].color === "pink"
                  ? "Turned Pink (Base)"
                  : "Colorless"}
              </li>
              <li>
                Methyl Orange:{" "}
                {tubeResults[3].color === "red"
                  ? "Turned Red (Acid)"
                  : tubeResults[3].color === "yellow"
                  ? "Turned Yellow (Base)"
                  : "No Change"}
              </li>
            </ul>

            <button
              className="reset-btn"
              onClick={() => {
                setCurrentChemical(null);
                setTubeChemicals([null, null, null, null]);
                setTubeResults([
                  { type: null, color: null },
                  { type: null, color: null },
                  { type: null, color: null },
                  { type: null, color: null },
                ]);
              }}
            >
              Test Another Chemical
            </button>
          </div>
        )}
      </div>
    );
  };

  const canGoNext = (step) => {
    if (step === 0) return !!currentChemical;
    if (step === 1) return !!tubeResults[0].type;
    if (step === 2) return !!tubeResults[1].type;
    if (step === 3) return !!tubeResults[2].type;
    if (step === 4) return !!tubeResults[3].type;
    return true;
  };

  return (
    <GenericSimulator
      chapter={chapter}
      customRenderer={renderIndicatorsExperiment}
      canGoNext={canGoNext}
    />
  );
};

export default IdentificationOfAcidsBases;