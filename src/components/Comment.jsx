/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./Comment.css";
import { supabase } from "../Client";

const Comment = ({ commentText, date, postid, commentId }) => {
  // Function to handle editing a comment

  const onEdit = async (updatedText) => {
    alert("EDIT FUNCTIONALITY");
  };

  const onDelete = async () => {
    // Delete comment from Supabase
    const { error } = await supabase
      .from("Comments") // Make sure 'Comments' matches your table name exactly
      .delete()
      .match({ id: commentId, postid: postid }); // match both comment ID and post ID for safety

    if (error) {
      alert("Error deleting comment:", error.message);
    } else {
      alert(`Comment deleted successfully`);
      window.location.reload();
    }
  };

  return (
    <div className="response-container">
      <div className="response-content">
        <div className="response-date">{date}</div>

        <div className="response-text">{commentText}</div>
      </div>
      <div className="response-actions">
        <button className="edit-button" onClick={onEdit}>
          edit
        </button>
        <button className="delete-button" onClick={onDelete}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Comment;
