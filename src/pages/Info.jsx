/* eslint-disable react-hooks/exhaustive-deps */
//import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../Client";
import Card from "../components/Card";
import Comment from "../components/Comment";

function Info() {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState(null);
  const [comments, setComments] = useState([]); // State to store comments

  useEffect(() => {
    // Function to fetch the post by id
    async function fetchPostById(postId) {
      const { data, error } = await supabase
        .from("Posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
        return;
      }

      setCurrentPost(data);
    }

    // Function to fetch comments for the post
    async function fetchCommentsByPostId(postId) {
      const { data, error } = await supabase
        .from("Comments")
        .select("*")
        .eq("postid", postId);

      if (error) {
        console.error("Error fetching comments:", error);
        return;
      }

      setComments(data);
    }

    fetchPostById(id);
    fetchCommentsByPostId(id); // Fetch comments when the component mounts
  }, [id]); // Re-run effect if 'id' changes

  // DATE FORMATTER
  function formatDate(dateString) {
    const date = new Date(dateString);
    // Get the date parts
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed, add leading 0
    const day = date.getDate().toString().padStart(2, "0");

    // Get the time parts and convert to 12-hour format
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours.toString().padStart(2, "0") : "12"; // the hour '0' should be '12'

    // Format the date and time
    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
  }

  return (
    <div className="container margin-top">
      {currentPost && (
        <Card
          key={currentPost.id}
          id={currentPost.id}
          title={currentPost.title}
          subject={currentPost.subject}
          code={currentPost.coursecode}
          professor={currentPost.p_firstname + " " + currentPost.p_lastname}
          date={currentPost.created_at}
          post={currentPost.comment}
          likes={currentPost.likes}
          context={"info"}
        />
      )}

      {/* Render comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            postId={id}
            key={comment.id}
            date={formatDate(comment.created_at)}
            commentId={comment.id}
            commentText={comment.response}
          />
        ))
      ) : (
        <p>No comments on this post.</p>
      )}
    </div>
  );
}

export default Info;
