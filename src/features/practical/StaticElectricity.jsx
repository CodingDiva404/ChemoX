import { useState } from "react";
import GenericSimulator from "../practical/GenericSimulator";
import "./StaticElectricity.css";

const StaticElectricity = () => {

  /* STEP 1 + STEP 2 */
  const [straw1Placed, setStraw1Placed] = useState(false);
  const [straw2Placed, setStraw2Placed] = useState(false);

  /* STEP 3 */
  const [clothPlaced, setClothPlaced] = useState(false);
  const [straw2PlacedStep3, setStraw2PlacedStep3] = useState(false);
  const [isRubbing, setIsRubbing] = useState(false);
  const [charged, setCharged] = useState(false);
  const [nearBottle, setNearBottle] = useState(false);
  const [strawMovedToBottle, setStrawMovedToBottle] = useState(false);

  /* STEP 4 */
  const [clothStep4, setClothStep4] = useState(false);
  const [straw1OnCloth, setStraw1OnCloth] = useState(false);
  const [straw2OnCloth, setStraw2OnCloth] = useState(false);
  const [bothRubbing, setBothRubbing] = useState(false);
  const [bothCharged, setBothCharged] = useState(false);
  const [straw1Bottle4, setStraw1Bottle4] = useState(false);
  const [straw2NearBottle4, setStraw2NearBottle4] = useState(false);

  /* STEP 5 */
  const [clothNearBottle5, setClothNearBottle5] = useState(false);

  const chapter = {
    materials: ["Straw 1", "Straw 2", "Glass Bottle", "Woollen Cloth"],
    procedure: [
      "Keep Straw 1 on the Glass Bottle.",
      "Bring Straw 2 near Straw 1 and observe.",
      "Rub Straw 2 on a woollen cloth and bring it near Straw 1.",
      "Rub both Straw 1 and Straw 2 on a woollen cloth and observe.",
      "Bring the woollen cloth (used to rub the straw) near the straw kept on the bottle. Observe."
    ]
  };

  const customRenderer = ({ handleDragOver, handleDrop, currentStep }) => {

    /* STEP 5 BOTTLE DROP */
    const handleStep5BottleDrop = (e) => {
      e.preventDefault();
      const item = e.dataTransfer.getData("text/plain");

      if (item === "Woollen Cloth") {
        setClothNearBottle5(true);
      }
    };

    /* Bottle Drop (Step1-3) */
    const handleBottleDrop = (e) => {
      e.preventDefault();
      const item = e.dataTransfer.getData("text/plain");

      if (item === "Straw 1" && currentStep === 0) {
        setStraw1Placed(true);
        handleDrop(e);
      }

      if (item === "Straw 2" && straw1Placed && currentStep === 1) {
        setStraw2Placed(true);
        handleDrop(e);
      }

      if (item === "Straw 2" && charged && currentStep === 2) {
        setNearBottle(true);
        setStrawMovedToBottle(true);
      }
    };

    /* Cloth Drop (Step3) */
    const handleClothDrop = (e) => {
      e.preventDefault();
      const item = e.dataTransfer.getData("text/plain");

      if (item === "Woollen Cloth") {
        setClothPlaced(true);
        handleDrop(e);
      }

      if (item === "Straw 2" && clothPlaced) {

        setStraw2PlacedStep3(true);
        setIsRubbing(true);

        setTimeout(() => {
          setIsRubbing(false);
          setCharged(true);
        }, 2000);
      }
    };

    /* STEP 4 CLOTH DROP */
    const handleStep4ClothDrop = (e) => {
      e.preventDefault();
      const item = e.dataTransfer.getData("text/plain");

      if (item === "Woollen Cloth") {
        setClothStep4(true);
      }

      if (item === "Straw 1" && clothStep4) {
        setStraw1OnCloth(true);
      }

      if (item === "Straw 2" && clothStep4) {
        setStraw2OnCloth(true);
      }
    };

    /* STEP 4 BOTTLE DROP */
    const handleStep4BottleDrop = (e) => {
      e.preventDefault();
      const item = e.dataTransfer.getData("text/plain");

      if (item === "Straw 1" && bothCharged) {
        setStraw1Bottle4(true);
      }

      if (item === "Straw 2" && straw1Bottle4) {
        setStraw2NearBottle4(true);
      }
    };

    /* STEP 5 RENDER */
    if (currentStep === 4) {
      return (
        <div className="static-zone">

          <div
            className="bottle-zone"
            onDragOver={handleDragOver}
            onDrop={handleStep5BottleDrop}
          >
            <div className="bottle">
              <div className="bottle-neck"></div>
            </div>

            {/* Straw 1 */}
            <div className={`straw red-straw ${clothNearBottle5 ? "attract" : ""}`} />

            {/* Straw 2 */}
            <div className={`straw blue-straw bottle-straw ${clothNearBottle5 ? "attract" : ""}`} />

            {clothNearBottle5 && (
              <div className="cloth bottle-cloth"></div>
            )}
          </div>

          {!clothNearBottle5 && (
            <div className="cloth-zone">
              <div
                className="cloth draggable-cloth"
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/plain", "Woollen Cloth")
                }
              ></div>
            </div>
          )}

          {clothNearBottle5 && (
            <div className="final-message">
              ⚡ Unlike charges attract each other.
            </div>
          )}

        </div>
      );
    }

    /* STEP 4 RENDER */
    if (currentStep === 3) {
      return (
        <div className="static-zone">

          <div
            className="bottle-zone"
            onDragOver={handleDragOver}
            onDrop={handleStep4BottleDrop}
          >
            <div className="bottle">
              <div className="bottle-neck"></div>
            </div>

            {straw1Bottle4 && (
              <div className={`straw red-straw ${straw2NearBottle4 ? "repel" : ""}`} />
            )}

            {straw2NearBottle4 && (
              <div className={`straw blue-straw bottle-straw ${straw1Bottle4 ? "repel" : ""}`} />
            )}
          </div>

          <div
            className="cloth-zone"
            onDragOver={handleDragOver}
            onDrop={handleStep4ClothDrop}
          >
            {clothStep4 && <div className="cloth"></div>}

            {straw1OnCloth && !straw1Bottle4 && (
              <div
                className={`straw red-straw ${bothRubbing ? "rub" : ""}`}
                draggable={bothCharged}
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/plain", "Straw 1")
                }
              >
                {bothRubbing && <div className="charge-effect"></div>}
              </div>
            )}

            {straw2OnCloth && !straw2NearBottle4 && (
              <div
                className={`straw blue-straw ${bothRubbing ? "rub" : ""}`}
                draggable={bothCharged}
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/plain", "Straw 2")
                }
              >
                {bothRubbing && <div className="charge-effect"></div>}
              </div>
            )}
          </div>

          {straw1OnCloth && straw2OnCloth && !bothCharged && (
            <div className="rub-zone">
              <button
                className="rub-btn"
                onClick={() => {

                  setBothRubbing(true);

                  setTimeout(() => {
                    setBothRubbing(false);
                    setBothCharged(true);
                  }, 2000);

                }}
              >
                Rub Both Straws
              </button>
            </div>
          )}

          {straw2NearBottle4 && (
            <div className="final-message">
              ⚡ Like charges repel each other.
            </div>
          )}

        </div>
      );
    }

    /* STEP 3 */
    if (currentStep === 2) {
      return (
        <div className="static-zone">

          <div
            className="bottle-zone"
            onDragOver={handleDragOver}
            onDrop={handleBottleDrop}
          >
            <div className="bottle">
              <div className="bottle-neck"></div>
            </div>

            <div className={`straw red-straw ${nearBottle ? "attract" : ""}`} />

            {strawMovedToBottle && (
              <div className="straw blue-straw bottle-straw"></div>
            )}
          </div>

          <div
            className="cloth-zone"
            onDragOver={handleDragOver}
            onDrop={handleClothDrop}
          >
            {clothPlaced && <div className="cloth"></div>}

            {straw2PlacedStep3 && !strawMovedToBottle && (
              <div
                className={`straw blue-straw ${isRubbing ? "rub" : ""}`}
                draggable={charged}
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/plain", "Straw 2")
                }
              >
                {isRubbing && <div className="charge-effect"></div>}
              </div>
            )}
          </div>

          {charged && !nearBottle && (
            <div className="charged-info">
              Straw 2 is now charged ⚡. Drag it near the bottle.
            </div>
          )}

          {nearBottle && (
            <div className="final-message">
              ⚡ A charged object can attract an uncharged object.
            </div>
          )}

        </div>
      );
    }

    /* STEP 1 + STEP 2 */
    return (
      <div className="static-zone">

        <div
          className="bottle-zone"
          onDragOver={handleDragOver}
          onDrop={handleBottleDrop}
        >
          <div className="bottle">
            <div className="bottle-neck"></div>
          </div>

          {straw1Placed && (
            <div className={`straw red-straw ${straw2Placed ? "repel" : ""}`} />
          )}

          {straw2Placed && (
            <div className="straw blue-straw"></div>
          )}
        </div>

      </div>
    );
  };

  return (
    <GenericSimulator
      chapter={chapter}
      customRenderer={customRenderer}
    />
  );
};

export default StaticElectricity;