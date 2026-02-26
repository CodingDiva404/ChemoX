import { useNavigate } from "react-router-dom";

const LibraryCard = ({ icon, title, description, wide, path }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`library-card ${wide ? "wide" : ""}`}
      onClick={() => path && navigate(path)}

    >
      <div className="library-icon">{icon}</div>
      <h2 className="library-card-title">{title}</h2>
      <p className="library-card-desc">{description}</p>
    </div>
  );
};

export default LibraryCard;
