/* eslint-disable react/prop-types */
import "./Card.css";
import { Link } from "react-router-dom";

function Card({ id, title, subject, code, professor, date, post }) {
  const onComment = () => {
    alert("Redirecting to post");
  };

  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <h5 className="card-title">{`${subject} ${code}`}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{professor}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{date.split("T")[0]}</h6>
        <p className="card-text">{post}</p>
        <Link to={`/${id}/info`}>
          <button onClick={onComment} className="button">
            More Info
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
