import { useState, useMemo, useRef, useEffect } from "react";
import gsap from "gsap";
import "./GenericSimulator.css";

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

/**
 * Extracts materials mentioned in a step (case-insensitive match).
 */
const getMaterialsForStep = (stepText, materialsList) => {
  if (!stepText || !materialsList?.length) return [];
  const step = stepText.toLowerCase();

  return materialsList.filter((material) => {
    const mat = material.toLowerCase();
    return step.includes(mat);
  });
};

const GenericSimulator = ({ 
  chapter, 
  customRenderer, 
  canGoNext, 
  onStepChange, 
  onMaterialPlace 
}) => {
  const materialsList = useMemo(() => getAllMaterials(chapter), [chapter]);
  const steps = useMemo(() => getProcedureSteps(chapter), [chapter]);

  const [isStarted, setIsStarted] = useState(false);
  const [placedMaterials, setPlacedMaterials] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [removingItem, setRemovingItem] = useState(null);
  const [stepError, setStepError] = useState(null);

  // Sync state with parent if callbacks are provided
  useEffect(() => {
    if (onStepChange) onStepChange(currentStep);
  }, [currentStep, onStepChange]);

  useEffect(() => {
    if (onMaterialPlace) onMaterialPlace(placedMaterials);
  }, [placedMaterials, onMaterialPlace]);

  const allowedMaterials = useMemo(() => {
    return steps[currentStep]
      ? getMaterialsForStep(steps[currentStep], materialsList)
      : materialsList;
  }, [steps, currentStep, materialsList]);

  const placedContainerRef = useRef(null);
  const stepOverlayRef = useRef(null);
  const prevPlacedCountRef = useRef(0);
  const prevStepRef = useRef(0);

  /* Animation when material is dropped */
  useEffect(() => {
    const container = placedContainerRef.current;
    if (!container || placedMaterials.length === 0) return;

    const children = container.children;
    const lastIndex = placedMaterials.length - 1;

    if (placedMaterials.length > prevPlacedCountRef.current) {
      const newEl = children[lastIndex];

      if (newEl) {
        gsap.fromTo(
          newEl,
          {
            scale: 0,
            opacity: 0,
            rotation: -15,
            y: -30,
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            overwrite: true,
          }
        );
      }
    }

    prevPlacedCountRef.current = placedMaterials.length;
  }, [placedMaterials]);

  /* Clear error on step change */
  useEffect(() => {
    setStepError(null);
  }, [currentStep]);

  /* Step transition animation */
  useEffect(() => {
    const el = stepOverlayRef.current;
    if (!el || steps.length === 0) return;

    if (currentStep !== prevStepRef.current) {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          overwrite: true,
        }
      );

      prevStepRef.current = currentStep;
    }
  }, [currentStep, steps.length]);

  /* Initial step animation */
  useEffect(() => {
    const el = stepOverlayRef.current;
    if (!el || steps.length === 0) return;

    if (prevStepRef.current === 0 && currentStep === 0) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, []);

  const handleDragStart = (e, item, isAllowed) => {
    if (!isAllowed) {
      e.preventDefault();
      return;
    }

    e.dataTransfer.setData("text/plain", item);

    gsap.to(e.currentTarget, {
      scale: 0.92,
      duration: 0.15,
      ease: "power2.out",
    });
  };

  const handleDragEnd = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.2,
      ease: "elastic.out(1, 0.5)",
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setStepError(null);

    const item = e.dataTransfer.getData("text/plain");

    if (!item) return;
    if (placedMaterials.includes(item)) return;

    const isAllowed = allowedMaterials.includes(item);

    if (!isAllowed) {
      setStepError(
        `"${item}" is not needed in this step. Use only the materials mentioned in the current step.`
      );
      return;
    }

    setPlacedMaterials((prev) => [...prev, item]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const nextStep = (e) => {
    if (currentStep < steps.length - 1) {
      gsap.fromTo(
        e.currentTarget,
        { scale: 0.88 },
        { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.6)" }
      );

      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = (e) => {
    if (currentStep > 0) {
      gsap.fromTo(
        e.currentTarget,
        { scale: 0.88 },
        { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.6)" }
      );

      setCurrentStep((prev) => prev - 1);
    }
  };

  const hasMaterials = materialsList.length > 0;
  const hasSteps = steps.length > 0;

  return (
    <div className="generic-simulator">
      {!isStarted && (
        <div className="generic-start-overlay">
          <button 
            className="generic-play-button" 
            onClick={() => setIsStarted(true)}
            aria-label="Start Experiment"
          >
            <div className="play-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span>Start Experiment</span>
          </button>
        </div>
    
      )}

      <div className={`generic-simulator-content ${!isStarted ? 'is-blurred' : ''}`}>
        <div
          className="generic-simulator-zone"
          onDragOver={handleDragOver}
          style={{ pointerEvents: (customRenderer || !isStarted) ? "none" : "auto" }}
        >
          {stepError && (
            <div className="generic-step-error">
              <span className="generic-step-error-icon">!</span>
              {stepError}
            </div>
          )}


          {customRenderer ? (
            <div style={{ pointerEvents: "auto", width: "100%", height: "100%" }}>
              {customRenderer({
                placedMaterials,
                currentStep,
                steps,
                handleDrop,
                handleDragOver,
              })}
            </div>
          ) : (
            <>
              <div className="generic-action-hint">
                {placedMaterials.length === 0 
                  ? `Step ${currentStep + 1}: Drag materials from the sidebar to begin.` 
                  : `Step ${currentStep + 1}: Follow the procedure steps below.`
                }
              </div>
              {placedMaterials.length > 0 && (
                <div
                  ref={placedContainerRef}
                  className="generic-simulator-placed"
                >
                  {placedMaterials.map((item) => (
                    <div
                      key={item}
                      data-material={item}
                      className="generic-placed-item"
                    >
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {hasSteps && steps[currentStep] && (
            <div ref={stepOverlayRef} className="generic-step-overlay">
              <span className="generic-step-badge">
                Step {currentStep + 1}
              </span>
              <p className="generic-step-text">{steps[currentStep]}</p>
            </div>
          )}
        </div>

        {hasMaterials && (
          <div className="generic-materials-box">
            <h4>Materials</h4>

            <div className="generic-materials-scroll">
              {materialsList.map((item) => {
                const isAllowed = allowedMaterials.includes(item);

                return (
                  <div
                    key={item}
                    draggable={customRenderer ? true : isAllowed}
                    onDragStart={(e) =>
                      handleDragStart(
                        e,
                        item,
                        customRenderer ? true : isAllowed
                      )
                    }
                    onDragEnd={handleDragEnd}
                    onClick={() => {
                      /* Mobile-friendly: Click to place material */
                      const canPlace = customRenderer ? true : isAllowed;
                      if (canPlace && !placedMaterials.includes(item)) {
                        setPlacedMaterials((prev) => [...prev, item]);
                      }
                    }}
                    className={`generic-draggable-item ${
                      (!isAllowed && !customRenderer) ? "generic-draggable-disabled" : ""
                    }`}
                    title={
                      (isAllowed || customRenderer)
                        ? `Click or drag to simulator (Step ${currentStep + 1})`
                        : `Not needed in Step ${
                            currentStep + 1
                          }. Advance to the step that uses this material.`
                    }
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

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
            disabled={
              canGoNext
                ? !canGoNext(currentStep, placedMaterials)
                : currentStep >= steps.length - 1
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GenericSimulator;