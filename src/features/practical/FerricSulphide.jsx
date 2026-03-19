import { useState, useEffect } from "react";
import GenericSimulator from "../practical/GenericSimulator";
import sciencePractical from "../../assets/data/sciencePractical.json";

import dishImg from "../../assets/images/evaporating-dish.png";
import magnetImg from "../../assets/images/magnet.png";
import tripodImg from "../../assets/images/tripod.png";
import burnerImg from "../../assets/images/burner.png";

import "./FerricSulphide.css";

const FerricSulphide = () => {
  const [dish1, setDish1] = useState(null);
  const [dish2, setDish2] = useState(null);
  const [dish1Chemical, setDish1Chemical] = useState(null);
  const [dish2Chemical, setDish2Chemical] = useState(null);
  const [dish1Magnet, setDish1Magnet] = useState(false);
  const [dish2Magnet, setDish2Magnet] = useState(false);
  const [currentStepState, setCurrentStepState] = useState(0);
  const [allPlacedMaterials, setAllPlacedMaterials] = useState([]);

  // Step 4 states
  const [step4Active, setStep4Active] = useState(false);
  const [rodPlaced, setRodPlaced] = useState(false);
  const [isDraggingDish1, setIsDraggingDish1] = useState(false);
  const [dish1OverDish2, setDish1OverDish2] = useState(false);
  const [ironTransferred, setIronTransferred] = useState(false);
  const [isIronTransferring, setIsIronTransferring] = useState(false);
  const [ironInDish2, setIronInDish2] = useState(false);
  const [isStirring, setIsStirring] = useState(false);
  const [stirred, setStirred] = useState(false);
  const [showColorChange, setShowColorChange] = useState(false);

  // Step 5 states
  const [dish2OnTripod, setDish2OnTripod] = useState(false);
  const [burnerOn, setBurnerOn] = useState(false);
  const [isHeating, setIsHeating] = useState(false);
  const [isRedHot, setIsRedHot] = useState(false);
  const [isCooled, setIsCooled] = useState(false);
  const [finalMagnetChecked, setFinalMagnetChecked] = useState(false);

  // Auto-sync placedMaterials with local state for visual slots
  useEffect(() => {
    const dishesCount = allPlacedMaterials.filter(m => m === "Evaporating dish").length;
    if (dishesCount >= 1 && !dish1) setDish1("Evaporating dish");
    if (dishesCount >= 2 && !dish2) setDish2("Evaporating dish");

    if (allPlacedMaterials.includes("Iron filings") && dish1) setDish1Chemical("Iron filings");
    if (allPlacedMaterials.includes("Sulphur powder") && dish2) setDish2Chemical("Sulphur powder");

    if (allPlacedMaterials.includes("Horseshoe magnet") && currentStepState === 1) {
      // The magnet should be reusable, but GenericSimulator removes it from the 'available' list 
      // when placed. We need a way to track if it's been used on both dishes.
      // Instead of relying on allPlacedMaterials for magnet check, we'll handle it in handlePlacement.
    }

    // Step 4: Glass rod
    if (allPlacedMaterials.includes("Glass rod") && currentStepState === 3 && ironInDish2) {
      setRodPlaced(true);
    }
  }, [allPlacedMaterials, dish1, dish2, dish1Chemical, dish2Chemical, currentStepState, ironInDish2]);

  // Trigger Step 4 and reset magnets
  useEffect(() => {
    if (currentStepState === 3) {
      setDish1Magnet(false);
      setDish2Magnet(false);
    }
  }, [currentStepState]);

  // Handle Stirring completion
  useEffect(() => {
    if (rodPlaced) {
      setIsStirring(true);
      const timer = setTimeout(() => {
        setIsStirring(false);
        setStirred(true);
        setShowColorChange(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [rodPlaced]);

  // Handle Heating completion
  useEffect(() => {
    if (burnerOn && dish2OnTripod && !isRedHot) {
      setIsHeating(true);
      const timer = setTimeout(() => {
        setIsHeating(false);
        setIsRedHot(true);
        // Automatically turn off burner after mixture is red hot
        setBurnerOn(false);
        
        // Start cooling sequence automatically after burner is off
        const coolingTimer = setTimeout(() => {
          setIsCooled(true);
        }, 3000);
        return () => clearTimeout(coolingTimer);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [burnerOn, dish2OnTripod, isRedHot]);

  // canGoNext logic
  const canGoNext = (currentStep) => {
    if (currentStep === 0) return !!(dish1 && dish2 && dish1Chemical && dish2Chemical);
    if (currentStep === 1) return dish1Magnet && dish2Magnet;
    if (currentStep === 3) return ironInDish2 && stirred;
    if (currentStep === 4) return isRedHot && isCooled;
    if (currentStep === 5) return finalMagnetChecked;
    return true;
  };

  const allChapters = sciencePractical.classes
    .flatMap(cls => cls.subjects)
    .flatMap(sub => sub.practicals);

  const chapter =
    allChapters.find(p => p.id === "phy-8-01") || {
      id: "phy-8-01",
      title: "Preparation of Ferric Sulphide and Study its Properties",
      materials: ["Evaporating dish", "Iron filings", "Sulphur powder", "Horseshoe magnet", "Glass rod", "Tripod stand", "Bunsen burner"],
      procedure: [
        "Take two evaporating dishes. Take 7 g iron filings in the first dish and 4 g sulphur powder in the second.",
        "Take a horseshoe magnet near the matter in both the dishes and observe the effect of magnet on it.",
        "Observe the colours of iron filings and sulphur powder.",
        "Transfer iron filings from first dish to second. Stir with a glass rod and observe mixture color.",
        "Now heat the matter in the second dish on a tripod stand till it becomes red hot. Let it cool.",
        "Observe the colour change, if any, in the matter and observe whether there is any effect of the horseshoe magnet on it.",
        "Record all your observations.",
      ],
    };

  const handlePlacement = (item, isDish2) => {
    const isDish1 = !isDish2;
    
    if (item === "Evaporating dish") {
      if (isDish1 && !dish1) setDish1(item);
      if (isDish2 && !dish2) setDish2(item);
    } else if (item === "Iron filings") {
      if (isDish1 && dish1) setDish1Chemical(item);
    } else if (item === "Sulphur powder") {
      if (isDish2 && dish2) setDish2Chemical(item);
    } else if (item === "Horseshoe magnet") {
      if (currentStepState === 1) {
        if (isDish1 && dish1 && dish1Chemical) setDish1Magnet(true);
        if (isDish2 && dish2 && dish2Chemical) setDish2Magnet(true);
        
        // Ensure both are checked if magnet is placed once
        // This solves the "next button not working" issue where user might only check one dish
        // but the magnet is already consumed by GenericSimulator
        if (allPlacedMaterials.includes("Horseshoe magnet")) {
          if (dish1 && dish1Chemical) setDish1Magnet(true);
          if (dish2 && dish2Chemical) setDish2Magnet(true);
        }
      }
    }
  };

  const renderDish = (dish, chemical, magnet, placeholder, isDish2) => {
    const isDish1 = !isDish2;

    return (
      <div
        className="dish-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const item = e.dataTransfer.getData("text/plain");
          
          if (currentStepState === 0 || currentStepState === 1) {
            handlePlacement(item, isDish2);
          } else if (currentStepState === 3 && isDish2) {
            if (item === "Iron filings" || item === "Dish 1") {
              // Transfer iron filings from Dish 1 to Dish 2
              setIsIronTransferring(true);
              // Wait for tilt to reach a good angle before sliding iron
              setTimeout(() => {
                setIronInDish2(true);
                setDish1Chemical(null);
              }, 800);
              
              setTimeout(() => {
                setIsIronTransferring(false);
              }, 2000);
            } else if (item === "Glass rod" && ironInDish2) {
              // Place glass rod for stirring
              setRodPlaced(true);
            }
          }
        }}
        onClick={() => {
          /* Mobile-friendly fallback for magnet in Step 2 */
          if (currentStepState === 1 && allPlacedMaterials.includes("Horseshoe magnet")) {
            handlePlacement("Horseshoe magnet", isDish2);
          }
        }}
      >
        {!dish && <span style={{ fontSize: "12px", color: "#999" }}>{placeholder}</span>}

        {dish && (
          <div 
            className={`dish-content ${isDish1 && currentStepState === 3 && isIronTransferring ? "dish-tilting" : ""}`}
            draggable={isDish1 && currentStepState === 3 && !ironInDish2}
            onDragStart={(e) => {
              if (isDish1 && currentStepState === 3) {
                e.dataTransfer.setData("text/plain", "Iron filings");
              }
            }}
            onClick={() => {
              /* Mobile-friendly / Quick-click transfer */
              if (isDish1 && currentStepState === 3 && !ironInDish2) {
                setIsIronTransferring(true);
                setTimeout(() => {
                  setIronInDish2(true);
                  setDish1Chemical(null);
                }, 800);
                
                setTimeout(() => {
                  setIsIronTransferring(false);
                }, 2000);
              }
            }}
            style={{ cursor: (isDish1 && currentStepState === 3 && !ironInDish2) ? "grab" : "default" }}
          >
            <img src={dishImg} alt="dish" className="dish-img" />

            {/* Iron filings in Dish 1 */}
            {isDish1 && dish1Chemical && (
              <div className={`iron-particles ${isIronTransferring ? "iron-sliding" : ""}`}>
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className={`particle ${magnet && currentStepState === 1 ? "attracted" : ""}`}
                    style={{
                      left: `${Math.random() * 80}%`,
                      bottom: `${Math.random() * 40}%`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Mixture in Dish 2 */}
            {isDish2 && (
              <div className="dish-mixture">
                {/* Original Sulphur */}
                {dish2Chemical === "Sulphur powder" && (
                  <div className="sulphur-particles">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="sulphur-particle"
                        style={{
                          left: `${Math.random() * 80}%`,
                          bottom: `${Math.random() * 40}%`,
                          backgroundColor: stirred ? "#e6cc00" : "yellow",
                        }}
                      />
                    ))}
                  </div>
                )}
                {/* Transferred Iron */}
                {ironInDish2 && (
                  <div className="iron-particles">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="particle"
                        style={{
                          left: `${Math.random() * 80}%`,
                          bottom: `${Math.random() * 40}%`,
                          backgroundColor: stirred ? "#1a1a1a" : "#333",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Magnet - Draggable only in Step 2 */}
            {magnet && (
              <img 
                src={magnetImg} 
                alt="Magnet" 
                className="magnet-img" 
                draggable={currentStepState === 1}
                onDragStart={(e) => {
                  if (currentStepState !== 1) e.preventDefault();
                }}
              />
            )}

            {/* Glass Rod Animation in Dish 2 */}
            {isDish2 && rodPlaced && (
              <div className={`glass-rod ${isStirring ? "stirring" : ""}`} />
            )}
          </div>
        )}
      </div>
    );
  };

  const renderFerricExperiment = ({ placedMaterials }) => (
    <div className="ferric-zone">
      <div className="generic-action-hint">
        {currentStepState === 0 && "Place two evaporating dishes and add iron filings to the first dish and sulphur powder to the second dish."}
        {currentStepState === 1 && "Bring a horseshoe magnet near the dishes and observe the effect."}
        {currentStepState === 2 && "Observation: The black colour of iron filings and yellow colour of sulphur are observed distinctly."}
        {currentStepState === 3 && !ironInDish2 && "Step 4: Click or drag Dish 1 to tilt it and transfer iron filings to Dish 2."}
        {currentStepState === 3 && ironInDish2 && !stirred && "Now use the Glass Rod to stir the mixture in Dish 2."}
        {currentStepState === 3 && stirred && "Observation: The mixture color has changed, but components are still distinct."}
        {currentStepState === 4 && !dish2OnTripod && "Step 5: Drag Dish 2 onto the tripod stand to prepare for heating."}
        {currentStepState === 4 && dish2OnTripod && !burnerOn && "Now click the Bunsen Burner to turn it on and heat the mixture."}
        {currentStepState === 4 && burnerOn && isHeating && "Heating in progress... The mixture is becoming red hot."}
        {currentStepState === 4 && isRedHot && !isCooled && "The mixture is red hot! The burner has been turned off. Letting it cool..."}
        {currentStepState === 4 && isCooled && "The mixture has cooled. It has formed a black compound (Ferric Sulphide)."}
        {currentStepState === 5 && !finalMagnetChecked && "Step 6: Bring the horseshoe magnet near the cooled black substance."}
        {currentStepState === 5 && finalMagnetChecked && "Observation: The new substance (Ferric Sulphide) is not attracted by the magnet."}
        {currentStepState === 6 && "Step 7: Record your observations. You have successfully completed the experiment!"}
      </div>

      {currentStepState < 4 ? (
        <div className="dish-container">
          {renderDish(dish1, dish1Chemical, dish1Magnet, "Dish 1", false)}
          {renderDish(dish2, dish2Chemical, dish2Magnet, "Dish 2", true)}
        </div>
      ) : (
        /* Step 5 & 6: Heating & Final Observation */
        <div className="heating-setup">
          <div className="tripod-burner-unit">
            <div 
              className={`tripod-zone ${dish2OnTripod ? "has-dish" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const item = e.dataTransfer.getData("text/plain");
                if (item === "Dish 2" || item === "Evaporating dish") {
                  setDish2OnTripod(true);
                }
              }}
            >
              <img src={tripodImg} alt="Tripod" className="tripod-img" />
              
              {dish2OnTripod && (
                <div 
                  className={`dish-on-tripod ${isRedHot && !isCooled ? "red-hot" : ""} ${isCooled ? "cooled" : ""}`}
                  style={{ cursor: "default" }}
                >
                  <img src={dishImg} alt="Dish" className="dish-img-small" />
                  <div className="dish-mixture-small">
                    {isCooled ? (
                      /* Final Black Compound */
                      <div className="ferric-sulphide-compound" />
                    ) : (
                      <>
                        {/* Sulphur particles */}
                        <div className="sulphur-particles-small">
                          {[...Array(15)].map((_, i) => (
                            <div 
                              key={i} 
                              className="sulphur-particle-tiny" 
                              style={{
                                "--rand-x": Math.random(),
                                "--rand-y": Math.random()
                              }}
                            />
                          ))}
                        </div>
                        {/* Iron particles */}
                        <div className="iron-particles-small">
                          {[...Array(10)].map((_, i) => (
                            <div 
                              key={i} 
                              className="iron-particle-tiny" 
                              style={{
                                "--rand-x": Math.random(),
                                "--rand-y": Math.random()
                              }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  {isHeating && <div className="smoke-effect" />}
                  
                  {/* Final Magnet Check in Step 6 */}
                  {currentStepState === 5 && (
                    <img 
                      src={magnetImg} 
                      alt="Magnet" 
                      className={`magnet-img-final ${finalMagnetChecked ? "checked" : ""}`}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("text/plain", "finalMagnet")}
                      onDrop={(e) => {
                        if (e.dataTransfer.getData("text/plain") === "finalMagnet") {
                          setFinalMagnetChecked(true);
                        }
                      }}
                      onClick={() => setFinalMagnetChecked(true)}
                    />
                  )}
                </div>
              )}
            </div>

            <div 
              className={`burner-zone ${burnerOn ? "on" : ""}`}
              onClick={() => dish2OnTripod && currentStepState === 4 && !isRedHot && setBurnerOn(true)}
              title={dish2OnTripod ? "Click to turn on burner" : "Place dish on tripod first"}
            >
              <img src={burnerImg} alt="Burner" className="burner-img" />
              {burnerOn && <div className="flame-effect" />}
            </div>
          </div>
          
          {/* Draggable Dish 2 for Step 5 */}
          {!dish2OnTripod && currentStepState === 4 && (
            <div 
              className="draggable-dish-step5"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", "Dish 2")}
            >
              <div style={{ position: "relative", width: "80px", height: "50px" }}>
                <img src={dishImg} alt="Dish 2" className="dish-img-small" />
                <div className="dish-mixture-small" style={{ bottom: "5px" }}>
                  <div className="sulphur-particles-small">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="sulphur-particle-tiny" style={{ "--rand-x": Math.random(), "--rand-y": Math.random() }} />
                    ))}
                  </div>
                  <div className="iron-particles-small">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="iron-particle-tiny" style={{ "--rand-x": Math.random(), "--rand-y": Math.random() }} />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "12px", fontWeight: "600", marginTop: "4px" }}>Dish 2 (Mixture)</div>
              <div style={{ fontSize: "10px", color: "#666" }}>Drag to Tripod</div>
            </div>
          )}
        </div>
      )}

{/*    
      {(currentStepState === 2 || (showColorChange && currentStepState === 3)) && (
        <div className="mixture-text">
          Observation: The black colour of iron filings and yellow colour of sulphur are observed distinctly.
        </div>
      )}
      
      {isRedHot && currentStepState === 4 && !isCooled && (
        <div className="mixture-text hot">
          Observation: The mixture is red hot and a chemical reaction is taking place.
        </div>
      )}

      {isCooled && currentStepState >= 4 && (
        <div className="mixture-text cooled">
          Observation: A new black substance, Iron(II) Sulphide, has formed.
        </div>
      )}

      {finalMagnetChecked && currentStepState === 5 && (
        <div className="mixture-text final">
          Observation: The new substance is not attracted by the magnet, showing it has different properties from its elements.
        </div>
      )} */}
    </div>
  );

  return (
    <GenericSimulator
      chapter={chapter}
      customRenderer={renderFerricExperiment}
      canGoNext={canGoNext}
      onStepChange={(step) => setCurrentStepState(step)}
      onMaterialPlace={(materials) => setAllPlacedMaterials(materials)}
    />
  );
};

export default FerricSulphide;