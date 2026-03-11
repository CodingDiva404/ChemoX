import GenericSimulator from "../practical/GenericSimulator";
import { LabIcon } from "../practical/LabIcons";
import "./ObservationOfFungus.css";
import sciencePractical from "../../assets/data/sciencePractical.json";

const ParallelResistors = () => {
  const allChapters = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals);

  const chapter =
    allChapters.find((p) => p.id === "phy-10-02") || {
      id: "phy-10-02",
      title:
        "Determination of the effective resistance of the parallel combination of two resistors",
      requirements: [
        "Two resistors",
        "Ammeter",
        "Voltmeter",
        "Rheostat",
        "Plug key",
        "Battery",
        "Connecting wires",
      ],
      procedure: [
        "Select two resistors and note their resistance values.",
        "Connect the circuit with the two resistors in parallel.",
        "Connect the ammeter in series and the voltmeter across the parallel combination.",
        "Insert the plug key and adjust the rheostat to obtain a suitable current.",
        "Note the readings of ammeter and voltmeter.",
        "Change the current by adjusting the rheostat and note different readings.",
        "Repeat the experiment for each resistor individually by removing the other resistor.",
        "Disconnect the circuit after completing the observations.",
      ],
    };

  const renderParallelResistors = ({
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
    <GenericSimulator
      chapter={chapter}
      customRenderer={renderParallelResistors}
    />
  );
};

export default ParallelResistors;
