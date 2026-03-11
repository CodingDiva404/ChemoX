import GenericSimulator from "../practical/GenericSimulator";
import { LabIcon } from "../practical/LabIcons";
import "./ObservationOfFungus.css";
import sciencePractical from "../../assets/data/sciencePractical.json";

const StaticElectricity = () => {
  const allChapters = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals);

  const raw =
    allChapters.find((p) => p.id === "phy-7-02") || null;

  const chapter = raw
    ? {
        ...raw,
        materials: (raw.materials || []).map((m) =>
          m.toLowerCase().includes("straw") ? "Straw" : m
        ),
      }
    : {
        title: "Static Electricity",
        id: "phy-7-02",
        materials: ["Straw", "Woollen Cloth", "Glass Bottle"],
        procedure: [
          "Keep a straw on a glass bottle. Bring another straw near the first straw and observe.",
          "Rub the second straw on a woollen cloth and bring it near the straw kept on the bottle. Observe.",
          "Rub both straws on the woollen cloth. Keep one on the bottle and bring the other near it.",
          "Bring the woollen cloth (used to rub the straw) near the straw kept on the bottle. Observe.",
        ],
      };

  const renderStaticExperiment = ({
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
    <GenericSimulator chapter={chapter} customRenderer={renderStaticExperiment} />
  );
};

export default StaticElectricity;
