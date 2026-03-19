import GenericSimulator from "../practical/GenericSimulator";
import { LabIcon } from "../practical/LabIcons";
import "./ObservationOfFungus.css";
import sciencePractical from "../../assets/data/sciencePractical.json";

const IdentificationOfAcidsBases = () => {
  const allChapters = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals);

  const chapter =
    allChapters.find((p) => p.id === "phy-9-01") || {
      id: "phy-9-01",
      title: "Identification of Acids and Bases using Indicators",
      materials: ["Test tubes", "Test Tube Stand", "Water"],
      chemical: [
        "Red litmus paper",
        "Blue litmus paper",
        "Phenolphthalein",
        "Methyl orange",
        "Distilled water",
        "Lemon juice",
        "Vinegar",
        "Ammonium hydroxide (NH4OH)",
        "Baking soda (NaHCO3)",
        "Soap solution",
        "Dilute hydrochloric acid",
      ],
      procedure: [
        "Take 5 ml of lime juice in four different test tubes. Keep them in a test tube stand.",
        "Dip red litmus paper strip in the solution in test tube 1 and observe.",
        "Dip blue litmus paper strip in the solution in test tube 2 and observe.",
        "Add 3–4 drops of phenolphthalein in test tube 3 and observe.",
        "Add 3–4 drops of methyl orange in test tube 4 and observe.",
        "Repeat the same steps for vinegar, ammonium hydroxide, baking soda solution, soap solution, dilute hydrochloric acid and distilled water.",
      ],
    };

  const renderIndicatorsExperiment = ({
    placedMaterials,
    handleDrop,
    handleDragOver,
    currentStep
  }) => {
    return (
      <div
        className="fungus-custom-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="generic-action-hint">
          {currentStep === 0 && placedMaterials.length === 0 && "Step 1: Drag four test tubes into the workspace and place them in the stand."}
          {currentStep === 0 && placedMaterials.includes("Test tubes") && "Step 1: Now add 5 ml of Lemon juice to each of the four test tubes."}
          {currentStep === 1 && "Step 2: Dip Red Litmus paper into the first test tube and observe."}
          {currentStep === 2 && "Step 3: Dip Blue Litmus paper into the second test tube and observe."}
          {currentStep === 3 && "Step 4: Add Phenolphthalein to the third test tube and observe."}
          {currentStep === 4 && "Step 5: Add Methyl Orange to the fourth test tube and observe."}
          {currentStep === 5 && "Step 6: Repeat the tests for other solutions like Vinegar, NH4OH, etc."}
        </div>
        <div className="fungus-placed-items">
          {placedMaterials.map((item) => (
            <div key={item} className="fungus-item">
              <LabIcon name={item} size={80} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <GenericSimulator chapter={chapter} customRenderer={renderIndicatorsExperiment} />
  );
};

export default IdentificationOfAcidsBases;
