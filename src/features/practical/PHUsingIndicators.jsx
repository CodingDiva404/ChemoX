import GenericSimulator from "../practical/GenericSimulator";
import { LabIcon } from "../practical/LabIcons";
import sciencePractical from "../../assets/data/sciencePractical.json";

const PHUsingIndicators = ({ chapter: chapterProp }) => {
  const allChapters = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals);

  const chapter = chapterProp || 
    allChapters.find((p) => p.id === "chem-11-01") || {
      id: "chem-11-01",
      title:
        "To find the pH of various solutions using (A) pH paper and (B) universal indicator",
      materials: [
        "Test tubes",
        "Test tube stand",
        "Dropper",
        "White glazed tile",
        "pH paper",
        "Universal indicator solution",
        "Distilled water",
        "Given sample solutions",
      ],
      procedure: [
        "Take eight clean and dry test tubes and label them from 1 to 8.",
        "Take 10 ml of each given solution in the respective test tubes.",
        "Place a small piece of pH paper on a white glazed tile.",
        "Using a dropper, add 1–2 drops of the solution from test tube 1 onto the pH paper.",
        "Observe the colour change and compare it with the pH chart.",
        "Note the approximate pH value.",
        "Take eight clean and dry test tubes and label them from 1 to 8.",
        "Add 10 ml of each given solution into the respective test tubes.",
        "Using a dropper, add two drops of universal indicator solution to each test tube.",
        "Observe the colour produced in each test tube.",
        "Compare the colour with the universal indicator colour chart.",
        "Note the approximate pH value for each solution.",
      ],
    };

  const renderPHExperiment = ({
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
          {currentStep === 0 && placedMaterials.length === 0 && "Step 1: Drag eight test tubes and place them in the stand."}
          {currentStep === 1 && "Step 2: Add 10 ml of each sample solution into the respective test tubes."}
          {currentStep === 2 && "Step 3: Place a small piece of pH paper on the white glazed tile."}
          {currentStep === 3 && "Step 4: Use a dropper to add a drop of sample solution to the pH paper."}
          {currentStep === 4 && "Step 5: Observe the colour change and compare with the pH chart."}
          {currentStep >= 5 && "Continue with Part B using Universal Indicator solution."}
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
    <GenericSimulator chapter={chapter} customRenderer={renderPHExperiment} />
  );
};

export default PHUsingIndicators;
