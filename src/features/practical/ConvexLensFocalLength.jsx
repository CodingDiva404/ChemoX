import GenericSimulator from "../practical/GenericSimulator";
import { LabIcon } from "../practical/LabIcons";
import "./ObservationOfFungus.css";
import sciencePractical from "../../assets/data/sciencePractical.json";

const ConvexLensFocalLength = () => {
  const allChapters = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals);

  const chapter =
    allChapters.find((p) => p.id === "phy-10-10") || {
      id: "phy-10-10",
      title: "Determination of the focal length of a convex lens",
      requirements: ["Convex lens", "Lens stand", "Metre scale", "White screen", "Screen holder"],
      procedure: [
        "Mount the convex lens on the lens stand.",
        "Select a distant object and turn one surface of the lens towards the object.",
        "Place the white screen on the screen holder and adjust it in front of the lens.",
        "Move the screen towards or away from the lens to obtain a sharp image.",
        "Measure the distance between the lens and the screen.",
        "Repeat the procedure using two more distant objects.",
        "Record the observations in the observation table.",
        "Rotate the lens by 180° so that the other surface faces the distant object.",
        "Obtain a sharp image and measure the distance again.",
        "Repeat for other distant objects.",
        "Find the average focal length of the lens.",
        "Compare f₁ and f₂ to check whether the lens is symmetric.",
      ],
    };

  const renderLensFocalExperiment = ({ placedMaterials, handleDrop, handleDragOver, currentStep }) => {
    return (
      <div className="fungus-custom-zone" onDrop={handleDrop} onDragOver={handleDragOver}>
        <div className="generic-action-hint">
          {currentStep === 0 && placedMaterials.length === 0 && "Step 1: Mount the convex lens on the lens stand."}
          {currentStep === 1 && "Step 2: Select a distant object and face the lens towards it."}
          {currentStep === 2 && "Step 3: Place the white screen in front of the lens."}
          {currentStep === 3 && "Step 4: Move the screen to obtain a sharp image of the object."}
          {currentStep === 4 && "Step 5: Measure the distance between the lens and the screen."}
          {currentStep >= 5 && "Step 6: Repeat the procedure for other objects and rotate the lens."}
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

  return <GenericSimulator chapter={chapter} customRenderer={renderLensFocalExperiment} />;
};

export default ConvexLensFocalLength;
