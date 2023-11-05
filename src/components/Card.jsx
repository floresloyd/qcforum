/* eslint-disable react/prop-types */
import "./Card.css";
function Card({ title, subject, code, professor, date, likes, post }) {
  const onComment = () => {
    alert("REDIRECT TO MORE COMMENTS");
  };

  const onLike = () => {
    alert("ADD A LIKE");
  };
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <h5 className="card-title">{`${subject} ${code}`}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{professor}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{date}</h6>
        <p className="card-text">{post}</p>
        <button onClick={onLike} className="button">
          {" "}
          Likes : {likes}
        </button>
        <button onClick={onComment} className="button">
          Comment
        </button>
      </div>
    </div>
  );
}

export default Card;
