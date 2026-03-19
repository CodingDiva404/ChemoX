import sciencePractical from "../../assets/data/sciencePractical.json";
import { Link, useSearchParams } from "react-router-dom";
import "./Curriculum.css";

const Curriculum = () => {
  const [searchParams] = useSearchParams();
  const subjectFilter = searchParams.get("subject");

  const chapters = sciencePractical.classes.flatMap(cls =>
    cls.subjects.flatMap(sub =>
      sub.practicals.map(practical => ({
        ...practical,
        subject: sub.subject,
        class: cls.class
      }))
    )
  );

  // Apply subject filter if present
  const filteredChapters = subjectFilter
    ? chapters.filter(ch => ch.subject === subjectFilter)
    : chapters;

  return (
    <section className="curriculum-section">
      <h2 className="curriculum-heading">📓 Science Curriculum</h2>

      {subjectFilter && (
        <p className="active-filter">Showing: {subjectFilter} Experiments</p>
      )}

      <div className="curriculum-cards">
        {filteredChapters.map(chapter => (
          <Link
            key={chapter.id}
            to={`/chapter/${chapter.id}`}
            className={`curriculum-box ${chapter.subject.toLowerCase()}`}
          >
            <span className="floating-icon" />

            <span className="class-badge">Class {chapter.class}</span>

            <h3>{chapter.title}</h3>
            <p>{chapter.subject}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Curriculum;