import GenericSimulator from "../practical/GenericSimulator";
import { LabIcon } from "../practical/LabIcons";
import "./ObservationOfFungus.css";
import sciencePractical from "../../assets/data/sciencePractical.json";

const PHUsingIndicators = () => {
  const allChapters = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals);

  const chapter =
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
  }) => {
    return (
      <div
        className="fungus-custom-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {placedMaterials.length === 0 && (
          <p className="fungus-hint">
            Drag materials here to set up the experiment
          </p>
        )}
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
