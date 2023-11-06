/* eslint-disable react/prop-types */
import "./Card.css";
import { Link } from "react-router-dom";
import { supabase } from "../Client";
import { useEffect, useState } from "react";
function Card({
  id,
  title,
  subject,
  code,
  professor,
  date,
  post,
  context,
  likes,
}) {
  // HANDLE LIKES
  const [likeCount, setLikeCount] = useState(likes); // Create a local state variable

  useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  const onLike = async () => {
    // Increment likes for the post in the database
    const { error } = await supabase
      .from("Posts")
      .update({ likes: likeCount + 1 })
      .eq("id", id);

    if (error) {
      console.error("Error updating likes:", error);
      return;
    }

    setLikeCount(likeCount + 1); // Increment the local like count
  };

  // HANDLE COMMENTS
  const onComment = () => {
    alert("Redirecting to post");
  };

  const [comment, setComment] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming 'post_id' column exists in your 'Comment' table and 'id' in your component state is the post ID.
    const { data, error } = await supabase
      .from("Comments")
      .insert([{ response: comment, postid: id }]);

    if (error) {
      console.error("Error inserting comment:", error);
    } else {
      // Clear the comment field on successful insert
      setComment("");
      alert("Comment inserted", data);
      window.location.reload();
    }
  };

  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <h5 className="card-title">{`${subject} ${code}`}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{professor}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{date.split("T")[0]}</h6>
        <p className="card-text">{post}</p>
        {context === "recent" && (
          <div>
            {" "}
            <Link to={`/${id}/info`}>
              <button onClick={onComment} className="button">
                More Info
              </button>
            </Link>
            <span> Likes : {likeCount} </span>
          </div>
        )}
        {context === "info" && (
          <div>
            <button onClick={onLike} className="button">
              👍
            </button>
            <span> Likes: {likeCount}</span>
          </div>
        )}

        {context === "info" && (
          <div className="commentbox-container">
            <form onSubmit={handleSubmit} className="commentbox-form">
              <textarea
                id="comment"
                className="comment-input"
                placeholder="Type your comment here..."
                value={comment}
                required
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
