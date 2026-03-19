import GenericSimulator from "../practical/GenericSimulator";
import { LabIcon } from "../practical/LabIcons";
import "./ObservationOfFungus.css";
import sciencePractical from "../../assets/data/sciencePractical.json";

const RefractionVerification = () => {
  const allChapters = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals);

  const chapter =
    allChapters.find((p) => p.id === "phy-10-08") || {
      id: "phy-10-08",
      title: "Verification of the laws of refraction of light",
      requirements: [
        "Rectangular glass slab",
        "Drawing board",
        "Drawing paper",
        "Drawing pins",
        "Optical pins",
        "Protractor",
        "Sharp pencil",
      ],
      procedure: [
        "Fix a drawing paper on the drawing board using drawing pins.",
        "Place the rectangular glass slab on it and trace its boundary.",
        "Remove the glass slab and draw a normal at a point on the boundary.",
        "Draw an incident ray making a known angle with the normal.",
        "Fix two pins vertically on the incident ray.",
        "Place the glass slab back in its original position.",
        "Observe the images of the pins through the glass slab and fix two more pins in line with the images.",
        "Remove the pins and glass slab and draw the refracted and emergent rays.",
        "Measure the angles of incidence, refraction and emergence.",
        "Repeat the experiment for different angles of incidence.",
        "Calculate the ratio sin i / sin r for each observation.",
      ],
    };

  const renderRefraction = ({
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
          {currentStep === 0 && placedMaterials.length === 0 && "Step 1: Fix the drawing paper on the board using pins."}
          {currentStep === 1 && "Step 2: Place the glass slab and trace its boundary."}
          {currentStep === 2 && "Step 3: Draw a normal at a point on the boundary."}
          {currentStep === 3 && "Step 4: Draw an incident ray and fix two pins on it."}
          {currentStep === 4 && "Step 5: Place the glass slab back and observe images of pins."}
          {currentStep >= 5 && "Step 6: Fix two more pins in line with the images."}
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
    <GenericSimulator chapter={chapter} customRenderer={renderRefraction} />
  );
};

export default RefractionVerification;
