import LibraryCard from "./LibraryCard";
import "./Library.css";


const Library = () => {
    return (
        <div className="library-wrapper">
            <h1 className="library-title">Library</h1>
            <p className="library-subtitle">
                Learn concepts • Understand experiments • Revise smartly
            </p>

            <div className="library-grid">
                <LibraryCard
                    icon="📘"
                    title="Chemistry Fundamentals"
                    description="Core concepts like atoms, elements, states of matter"
                    path="/library/fundamentals"
                />

                <LibraryCard
                    icon="🧪"
                    title="Laboratory & Experiments"
                    description="Theory, apparatus, safety & observations"
                    path="/library/experiments"
                />

                <LibraryCard
                    icon="⚛"
                    title="Matter & Reactions"
                    description="Chemical reactions, acids, bases & energy changes"
                    path="/library/reactions"
                />

                <LibraryCard
                    icon="📊"
                    title="Measurements & Units"
                    description="SI units, density, mass, volume & lab data"
                    path="/library/measurements"
                />

                <LibraryCard
                    icon="🧠"
                    title="Revision Notes"
                    description="Quick summaries, formulas & exam tips"
                    wide
                    path="/library/revision"
                />

            </div>
        </div>
    );
};

export default Library;
