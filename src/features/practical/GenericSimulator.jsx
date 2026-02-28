import { useState, useMemo, useRef, useEffect } from "react";
import "./GenericSimulator.css";
import { LabIcon } from "./LabIcons.jsx";

/**
 * Extracts all procedure steps from a chapter (handles various JSON structures).
 */
const getProcedureSteps = (chapter) => {
  if (chapter.procedure?.length > 0) {
    return chapter.procedure;
  }
  if (chapter.methods) {
    return Object.values(chapter.methods).flatMap((m) => m.procedure ?? []);
  }
  return [];
};

/**
 * Combines materials, requirements, and chemical into a single list.
 */
const getAllMaterials = (chapter) => {
  const mats = chapter.materials ?? chapter.requirements ?? [];
  const chem = chapter.chemical ?? [];
  return [...new Set([...mats, ...chem])];
};

const GenericSimulator = ({ chapter }) => {
  const materialsList = useMemo(() => getAllMaterials(chapter), [chapter]);
  const steps = useMemo(() => getProcedureSteps(chapter), [chapter]);

  const [placedMaterials, setPlacedMaterials] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepAnimKey, setStepAnimKey] = useState(0);
  const prevStepRef = useRef(0);

  useEffect(() => {
    if (currentStep !== prevStepRef.current) {
      setStepAnimKey((k) => k + 1);
      prevStepRef.current = currentStep;
    }
  }, [currentStep]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("text/plain");
    if (item && !placedMaterials.includes(item)) {
      setPlacedMaterials((prev) => [...prev, item]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const removePlacedMaterial = (item) => {
    setPlacedMaterials((prev) => prev.filter((m) => m !== item));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const hasMaterials = materialsList.length > 0;
  const hasSteps = steps.length > 0;

  return (
    <div className="generic-simulator">
      <div className="generic-simulator-content">
        {/* Simulator drop zone */}
        <div
          className="generic-simulator-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {placedMaterials.length === 0 && (
            <p className="generic-simulator-hint">
              Drag materials here to set up your experiment
            </p>
          )}
          {placedMaterials.length > 0 && (
            <div className="generic-simulator-placed">
              {placedMaterials.map((item) => (
                <div
                  key={item}
                  className="generic-placed-item generic-placed-item-animate"
                  title={`${item} – Click to remove`}
                  onClick={() => removePlacedMaterial(item)}
                >
                  <div className="generic-placed-icon">
                    <LabIcon name={item} size={56} />
                  </div>
                  <span className="generic-placed-label">{item}</span>
                  <span className="generic-placed-remove">×</span>
                </div>
              ))}
            </div>
          )}
          {hasSteps && steps[currentStep] && (
            <div
              key={stepAnimKey}
              className="generic-step-overlay generic-step-animate"
            >
              <span className="generic-step-badge">Step {currentStep + 1}</span>
              <p className="generic-step-text">{steps[currentStep]}</p>
            </div>
          )}
        </div>

        {/* Materials sidebar */}
        {hasMaterials && (
          <div className="generic-materials-box">
            <h4>Materials</h4>
            <div className="generic-materials-scroll">
              {materialsList.map((item, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="generic-draggable-item"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step controls */}
      {hasSteps && (
        <div className="generic-simulator-controls">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <span className="generic-step-indicator">
            Step {currentStep + 1} of {steps.length}
          </span>
          <button
            type="button"
            onClick={nextStep}
            disabled={currentStep >= steps.length - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GenericSimulator;
