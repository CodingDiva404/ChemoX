import sciencePractical from "../../assets/data/sciencePractical.json";
import { Link } from "react-router-dom";
import "./Curriculum.css";

const Curriculum = () => {
  const chapters = sciencePractical.classes.flatMap(cls =>
    cls.subjects.flatMap(sub =>
      sub.practicals.map(practical => ({
        ...practical,
        subject: sub.subject,
        class: cls.class
      }))
    )
  );

  return (
    <section className="curriculum-section">
      <h2 className="curriculum-heading">📓 Science Curriculum</h2>

      <div className="curriculum-cards">
        {chapters.map(chapter => (
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
