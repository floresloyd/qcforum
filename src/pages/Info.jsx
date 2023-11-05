/* eslint-disable react-hooks/exhaustive-deps */
//import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../Client";
import Card from "../components/Card";

function Info() {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
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
    fetchPostById(id);
  }, []);

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
        />
      )}
    </div>
  );
}

export default Info;
