import { useParams } from "react-router-dom";
import { useState } from "react";
import sciencePractical from "../../assets/data/sciencePractical.json";
import "./ChapterDetails.css";
import emojiStore from "../../utils/emojiStore";

const ChapterDetail = () => {
  const { id } = useParams();
  const [simStep, setSimStep] = useState(0);

  const chapter = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals)
    .find((p) => p.id === id);

  // Buttons Logic
  const totalSteps = chapter.procedure?.length || 0;

  const nextStep = () => {
    if (simStep < totalSteps - 1) {
      setSimStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (simStep > 0) {
      setSimStep((prev) => prev - 1);
    }
  };

  if (!chapter) return <h2 className="error">Chapter not found 😬</h2>;

  /* ------------------ Drag & Drop ------------------ */

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItem = e.dataTransfer.getData("text/plain");
    alert(`You dropped: ${droppedItem}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  /* ------------------ Dynamic Renderer ------------------ */

  const renderContent = (data) => {
    if (!data) return null;

    if (Array.isArray(data) && typeof data[0] === "object") {
      const headers = Object.keys(data[0]);

      return (
        <div className="table-wrapper">
          <table className="observation-table">
            <thead>
              <tr>
                {headers.map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {headers.map((key) => (
                    <td key={key}>{row[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }

    return <p>{data}</p>;
  };

  const materialsList = chapter.materials || chapter.requirements || [];

  return (
    <div className="lab-container">
      <div className="content-wrapper">

        {/* ---------------- THEORY PANEL ---------------- */}
        <div className="right-panel">
          <h2>{chapter.title}</h2>

          {chapter.aim && (
            <section>
              <h4>Aim</h4>
              {renderContent(chapter.aim)}
            </section>
          )}

          {materialsList.length > 0 && (
            <section>
              <h4>Materials / Requirements</h4>
              {renderContent(materialsList)}
            </section>
          )}

          {chapter.procedure?.length > 0 && (
            <section>
              <h4>Procedure</h4>
              <ol>
                {chapter.procedure.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </section>
          )}

          {chapter.observation?.length > 0 && (
            <section>
              <h4>Observation</h4>
              {renderContent(chapter.observation)}
            </section>
          )}

          {chapter.conclusion && (
            <section>
              <h4>Conclusion</h4>
              {renderContent(chapter.conclusion)}
            </section>
          )}

          {chapter.result && (
            <section>
              <h4>Result</h4>
              {renderContent(chapter.result)}
            </section>
          )}
        </div>

        {/* ---------------- STIMULATOR PANEL ---------------- */}
        <div className="stimulator-panel">
          <div className="stimulator-inner">

            <h3>Stimulator</h3>

            <div className="stimulator-content">

              {/* Drop Area */}
              <div
                className="stimulator-box"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="step-animation" key={simStep}>
                  {chapter.procedure && (
                    <>
                      <div className="step-badge">
                        Step {simStep + 1}
                      </div>

                      <div className="step-text">
                        {chapter.procedure[simStep]}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Materials List */}
              <div className="materials-box">
                <h4>Materials</h4>

                <div className="materials-scroll">
                  <ul>
                    {materialsList.map((item, index) => (
                      <li
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        className="draggable-item"
                      >
                        <span className="material-icon">
                          {emojiStore[item] || "🧰"}
                        </span>
                        <span className="material-name">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Controls */}
            <div className="stimulator-controls">
              <button
                className="btn prev-btn"
                onClick={prevStep}
                disabled={simStep === 0}
              >
                Previous
              </button>

              <button
                className="btn next-btn"
                onClick={nextStep}
                disabled={simStep === totalSteps - 1}
              >
                Next
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ChapterDetail;