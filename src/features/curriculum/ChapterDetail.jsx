import { useParams, useNavigate } from "react-router-dom";
import sciencePractical from "../../assets/data/sciencePractical.json";
import "./ChapterDetails.css";
import LeafPractical from "../practical/LeafPractical.jsx";
import ObservationOfFungus from '../practical/ObservationOfFungus.jsx'
import GenericSimulator from "../practical/GenericSimulator.jsx";
import StaticElectricity from "../practical/StaticElectricity.jsx";
import FerricSulphide from "../practical/FerricSulphide.jsx";
import IdentificationOfAcidsBases from "../practical/IdentificationOfAcidsBases.jsx";
import PHUsingIndicators from "../practical/PHUsingIndicators.jsx";
import Neutralization from "../practical/Neutralization.jsx";
import ParallelResistors from "../practical/ParallelResistors.jsx";
import RefractionVerification from "../practical/RefractionVerification.jsx";
import ConvexLensFocalLength from "../practical/ConvexLensFocalLength.jsx";

const ChapterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const allChapters = sciencePractical.classes
    .flatMap((cls) => cls.subjects)
    .flatMap((sub) => sub.practicals);

  const chapter = allChapters.find((p) => p.id === id);
  const currentIndex = allChapters.findIndex((p) => p.id === id);

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
  } else if (chapter.id === "phy-9-01") {
    experimentComponent = <IdentificationOfAcidsBases />;
  } else if (chapter.id === "chem-11-01") {
    experimentComponent = <PHUsingIndicators />;
  } else if (chapter.id === "chem-9-06") {
    experimentComponent = <Neutralization />;
  } else if (chapter.id === "phy-10-02") {
    experimentComponent = <ParallelResistors />;
  } else if (chapter.id === "phy-10-08") {
    experimentComponent = <RefractionVerification />;
  } else if (chapter.id === "phy-10-10") {
    experimentComponent = <ConvexLensFocalLength />;
  } else {
    experimentComponent = <GenericSimulator chapter={chapter} />;
  }


  const renderContent = (data) => {
    if (!data) return null;

    if (Array.isArray(data) && typeof data[0] === "object") {
      const headers = Object.keys(data[0]);


      console.log(LeafPractical, GenericSimulator);

      return (
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

  // // const materialsList = chapter.materials ?? chapter.requirements ?? [];
  // const hasLeafPractical = chapter.id === "bio-7-01";

  // const handlePrevious = () => {
  //   if (currentIndex > 0) {
  //     navigate(`/chapter/${allChapters[currentIndex - 1].id}`);
  //   }
  // };

  // const handleNext = () => {
  //   if (currentIndex < allChapters.length - 1) {
  //     navigate(`/chapter/${allChapters[currentIndex + 1].id}`);
  //   }
  // };

  return (
    <div className="chapter-detail-container">
      {/* Main header */}
      <header className="chapter-main-header">
        <h1 className="chapter-main-title">{chapter.title}</h1>
      </header>

      {/* Main content area: two columns */}
      <main className="chapter-main-content">
        {/* Left column: document with all details */}
        <aside className="chapter-doc-panel">
          <h2 className="chapter-doc-title">{chapter.title}</h2>
          <div className="chapter-doc-content">
            {chapter.aim && (
              <section className="chapter-doc-section">
                <h4 className="chapter-doc-heading">Aim</h4>
                {renderContent(chapter.aim)}
              </section>
            )}
            {/* {(materialsList.length > 0 || chapter.chemical?.length > 0) && (
              <section className="chapter-doc-section">
                <h4 className="chapter-doc-heading">
                  Materials / Requirements
                </h4>
                {materialsList.length > 0 && renderContent(materialsList)}
                {chapter.chemical?.length > 0 && (
                  <>
                    <p className="chapter-doc-subheading">Chemical</p>
                    {renderContent(chapter.chemical)}
                  </>
                )}
              </section>
            )} */}

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

        {/* Right column: Stimulator + Materials */}
        <div className="chapter-content-panel">
          <h2 className="chapter-content-title">{chapter.title}</h2>
          <div className="chapter-content-split">
            {/* Stimulator section (main content ~70–75%) */}
            <div className="chapter-stimulator-section">
              {experimentComponent}
            </div>

          </div>
        </div>
      </main>

      {/* Bottom navigation */}
      {/* <footer className="chapter-nav-footer">
        <button
          type="button"
          className="chapter-nav-btn chapter-nav-prev"
          onClick={handlePrevious}
          disabled={currentIndex <= 0}
        >
          Previous
        </button>
        <button
          type="button"
          className="chapter-nav-btn chapter-nav-next"
          onClick={handleNext}
          disabled={currentIndex >= allChapters.length - 1}
        >
          Next
        </button>
      </footer> */}
    </div>
  );
};

export default ChapterDetail;
