import GenericSimulator from "../practical/GenericSimulator";
import { LabIcon } from "../practical/LabIcons";
import "./ObservationOfFungus.css";
import sciencePractical from "../../assets/data/sciencePractical.json";

const Neutralization = () => {
  const allChapters = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals);

  const chapter =
    allChapters.find((p) => p.id === "chem-9-06") || {
      id: "chem-9-06",
      title: "To study the neutralization with the help of acid and base",
      requirements: [
        "0.1 N Hydrochloric acid (HCl)",
        "0.1 N Sodium hydroxide (NaOH)",
        "Phenolphthalein indicator",
        "Burette",
        "Pipette",
        "Conical flask",
        "Clean white tile",
        "Distilled water",
      ],
      procedure: [
        "Wash the burette with water and rinse it with hydrochloric acid. Fill the burette with dilute HCl and remove air bubbles, if any.",
        "Wash the pipette with water and rinse it with sodium hydroxide solution. Using the pipette, transfer 10 ml of NaOH solution into a clean conical flask.",
        "Add 1–2 drops of phenolphthalein indicator to the NaOH solution in the conical flask.",
        "Keep the conical flask on a white tile.",
        "Add hydrochloric acid solution from the burette slowly into the conical flask while swirling continuously.",
        "Observe the change in colour of the solution in the conical flask.",
        "Stop adding acid when the pink colour just disappears.",
        "Record the burette reading.",
      ],
    };

  const renderNeutralization = ({
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
          <p className="fungus-hint">Drag materials here to set up the experiment</p>
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
    <GenericSimulator chapter={chapter} customRenderer={renderNeutralization} />
  );
};

export default Neutralization;
