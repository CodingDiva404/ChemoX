import GenericSimulator from "../practical/GenericSimulator";
import { LabIcon } from "../practical/LabIcons";
import "./ObservationOfFungus.css";
import sciencePractical from "../../assets/data/sciencePractical.json";

const FerricSulphide = () => {
  const allChapters = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals);

  const chapter =
    allChapters.find((p) => p.id === "phy-8-01") || {
      id: "phy-8-01",
      title: "Preparation of Ferric Sulphide and Study its Properties",
      materials: [
        "Evaporating dish",
        "Tripod stand",
        "Horseshoe magnet",
        "Bunsen burner",
        "Glass rod",
      ],
      chemical: ["Iron filings", "Sulphur powder"],
      procedure: [
        "Take two evaporating dishes. Take 7 g iron filings in the first dish and 4 g sulphur powder in the second.",
        "Take a horseshoe magnet near the matter in both the dishes and observe the effect of magnet on it.",
        "Observe the colours of iron filings and sulphur powder.",
        "Transfer the entire iron filings from the first dish to the second. Stir with a glass rod and observe the colour of the mixture and the effect of taking the horseshoe magnet near this mixture.",
        "Now heat the matter in the second dish on a tripod stand till it becomes red hot. Let it cool.",
        "Observe the colour change, if any, in the matter and observe whether there is any effect of the horseshoe magnet on it.",
        "Record all your observations.",
      ],
    };

  const renderFerricExperiment = ({
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
    <GenericSimulator chapter={chapter} customRenderer={renderFerricExperiment} />
  );
};

export default FerricSulphide;
