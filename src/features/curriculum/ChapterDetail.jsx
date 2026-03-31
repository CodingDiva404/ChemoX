import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import sciencePractical from "../../assets/data/sciencePractical.json";
import "./ChapterDetails.css";
import LeafPractical from "../practical/LeafPractical.jsx";
import ObservationOfFungus from '../practical/ObservationOfFungus.jsx'
// import GenericSimulator from "../practical/GenericSimulator.jsx";
import StaticElectricity from "../practical/StaticElectricity.jsx";
import FerricSulphide from "../practical/FerricSulphide.jsx";
// import IdentificationOfAcidsBases from "../practical/IdentificationOfAcidsBases.jsx";
// import PHUsingIndicators from "../practical/PHUsingIndicators.jsx";
// import Neutralization from "../practical/Neutralization.jsx";
// import ParallelResistors from "../practical/ParallelResistors.jsx";
// import RefractionVerification from "../practical/RefractionVerification.jsx";
// import ConvexLensFocalLength from "../practical/ConvexLensFocalLength.jsx";
import PendingPractical from "../practical/PendingPractical.jsx";

const ChapterDetail = () => {
  const { id } = useParams();
  // const navigate = useNavigate()
  const [showAITheory, setShowAITheory] = useState(false);
  const [aiTheoryContent, setAITheoryContent] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const allChapters = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals);

  const chapter = allChapters.find((p) => p.id === id);
  // const currentIndex = allChapters.findIndex((p) => p.id === id);

  const getCacheKey = useCallback(() => {
    if (!chapter?.id) return null;
    return `theory-${chapter.id}`;
  }, [chapter?.id]);

  const generateAITheory = useCallback(async () => {
    const cacheKey = getCacheKey();
    if (!cacheKey || !chapter) return;

    /* =========================
       🧠 FRONTEND CACHE CHECK
    ========================= */
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      console.log("⚡ Loaded from frontend cache");
      const points = cached.split("-").map(p => p.trim()).filter(p => p);
      setAITheoryContent(points);
      setShowAITheory(true);
      return;
    }

    setIsGenerating(true);
    setShowAITheory(true);

    try {
      const response = await fetch("http://localhost:5000/generate-theory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: chapter.title,
          aim: chapter.aim,
        }),
      });

      const data = await response.json();

      console.log("AI RESPONSE:", data);

      const text = data.text || "";
      const points = text
        .split("-")
        .map(p => p.trim())
        .filter(p => p);

      setAITheoryContent(points);

      /* =========================
         💾 SAVE TO FRONTEND CACHE
      ========================= */
      localStorage.setItem(cacheKey, text);

    } catch (error) {
      console.error(error);
      setAITheoryContent([
        "⚠️ Failed to generate theory. Try again."
      ]);
    }

    setIsGenerating(false);
  }, [chapter, getCacheKey]);

  // Auto-generate AI Theory on mount / chapter change
  useEffect(() => {
    if (chapter) generateAITheory();
  }, [chapter, generateAITheory]);

  // ✅ Clear backend cache
  const clearBackendCache = async () => {
    try {
      const res = await fetch("http://localhost:5000/clear-cache", { method: "POST" });
      const data = await res.json();
      console.log(data.message); // "Cache cleared ✅"
      alert(data.message);
    } catch (err) {
      console.error("Failed to clear backend cache", err);
      alert("Failed to clear cache");
    }
  };

  // const formatAIText = (text) => {
  //   if (!text) return "";
  //   const parts = text.split(/(\*\*.*?\*\*)/g);
  //   return parts.map((part, i) => {
  //     if (part.startsWith("**") && part.endsWith("**")) {
  //       return <strong key={i}>{part.slice(2, -2)}</strong>;
  //     }
  //     return part;
  //   });
  // };

  if (!chapter) return <h2>Chapter not found 😬</h2>;

  const materialItems = [
    ...(chapter.materials || []),
    ...(chapter.chemical || []),
    ...(chapter.requirements || [])
  ];

  let experimentComponent;
  if (chapter.id === "bio-7-01") {
    experimentComponent = <LeafPractical chapter={chapter} />;
  } else if (chapter.id === "bio-8-01") {
    experimentComponent = <ObservationOfFungus />;
  } else if (chapter.id === "phy-7-02") {
    experimentComponent = <StaticElectricity />;
  } else if (chapter.id === "phy-8-01") {
    experimentComponent = <FerricSulphide />;
  } else {
    experimentComponent = <PendingPractical chapter={chapter} />;
  }

  const renderContent = (data) => {
    if (!data) return null;
    if (Array.isArray(data) && typeof data[0] === "object") {
      const headers = Object.keys(data[0]);
      return (
        <div className="table-wrapper">
          <table className="observation-table">
            <thead>
              <tr>{headers.map((key) => (<th key={key}>{key}</th>))}</tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {headers.map((key) => (<td key={key}>{row[key]}</td>))}
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
          {data.map((item, i) => (<li key={i}>{item}</li>))}
        </ul>
      );
    }

    return <p>{data}</p>;
  };

  return (
    <div className="chapter-detail-container">
      <header className="chapter-main-header">
        <h1 className="chapter-main-title">{chapter.title}</h1>
        <div className="header-actions">
          <button
            className="ai-theory-btn"
            onClick={() => generateAITheory()}
            title="Generate AI Theory"
          >
            <span className="ai-icon">✨</span> AI Theory
          </button>

          {/* Clear Backend Cache */}
          <button
            className="ai-clear-cache-btn"
            onClick={clearBackendCache}
            title="Clear Backend Cache"
          >
            🗑️ Clear Cache
          </button>

          <button
            className="how-to-use-btn"
            title="How to use this practical"
          >
            <span>?</span> How to Use
          </button>
        </div>
      </header>

      <main className="chapter-main-content">
        <aside className="chapter-doc-panel">
          <h2 className="chapter-doc-title">{chapter.title}</h2>
          <div className="chapter-doc-content">
            {chapter.aim && (
              <section className="chapter-doc-section">
                <h4 className="chapter-doc-heading">Aim</h4>
                {renderContent(chapter.aim)}
              </section>
            )}
            {materialItems.length > 0 && (
              <section className="chapter-doc-section">
                <h4 className="chapter-doc-heading">
                  Materials / Requirements
                </h4>
                {renderContent(materialItems)}
              </section>
            )}
            {chapter.procedure?.length > 0 && (
              <section className="chapter-doc-section">
                <h4 className="chapter-doc-heading">Procedure</h4>
                <ol>
                  {chapter.procedure.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </section>
            )}
            {(chapter.observation?.length > 0 ||
              chapter.observations?.length > 0 ||
              chapter.observationsAndConclusions?.length > 0) && (
                <section className="chapter-doc-section">
                  <h4 className="chapter-doc-heading">Observation</h4>
                  {chapter.observation?.length > 0
                    ? renderContent(chapter.observation)
                    : chapter.observations?.length > 0
                      ? renderContent(chapter.observations)
                      : renderContent(chapter.observationsAndConclusions)}
                </section>
              )}
            {chapter.chemicalReaction && (
              <section className="chapter-doc-section">
                <h4 className="chapter-doc-heading">Chemical Reaction</h4>
                <p className="chapter-doc-reaction">{chapter.chemicalReaction}</p>
              </section>
            )}
            {chapter.conclusion && (
              <section className="chapter-doc-section">
                <h4 className="chapter-doc-heading">Conclusion</h4>
                {renderContent(chapter.conclusion)}
              </section>
            )}
          </div>
        </aside>

        <div className="chapter-content-panel">
          <h2 className="chapter-content-title">{chapter.title}</h2>
          <div className="chapter-content-split">
            <div className="chapter-stimulator-section">
              {experimentComponent}
            </div>
          </div>
        </div>
      </main>

      {/* AI Theory Overlay */}
      {showAITheory && (
        <div className="ai-theory-overlay" onClick={() => setShowAITheory(false)}>
          <div className="ai-theory-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-theory-header">
              <div className="ai-title-wrapper">
                <span className="ai-title-icon">✨</span>
                <div className="ai-title-text">
                  <h3>AI Lab Assistant</h3>
                  <p>Simplified Scientific Theory</p>
                </div>
              </div>
              <button className="close-ai-btn" onClick={() => setShowAITheory(false)}>&times;</button>
            </div>
            <div className="ai-theory-content">
              {isGenerating ? (
                <div className="ai-loading">
                  <div className="ai-spinner"></div>
                  <p>Generating simplified theory...</p>
                </div>
              ) : (
                <div className="ai-result">
                  <div className="ai-theory-cards">
                    {aiTheoryContent.map((point, index) => (
                      <div key={index} className="ai-theory-card">
                        <span className="ai-bullet">⚡</span>
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                  <div className="ai-disclaimer">
                    <small>AI-generated content for educational purposes.</small>
                  </div>
                </div>
              )}
            </div>
            <div className="ai-theory-footer">
              <button className="ai-close-btn" onClick={() => setShowAITheory(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterDetail;