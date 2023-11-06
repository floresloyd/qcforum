/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "./Recent.css";
import { supabase } from "../Client";

function Recent() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts("created_at", false); // Fetch posts initially by creation date descending
  }, []);

  // Function to fetch posts with a specific order
  const fetchPosts = async (sortBy, ascending) => {
    try {
      const { data } = await supabase
        .from("Posts")
        .select()
        .order(sortBy, { ascending: ascending });

      setPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle sorting by creation date
  const sortByCreationDate = () => {
    fetchPosts("created_at", false);
  };

  // Function to handle sorting by likes
  const sortByLikes = () => {
    fetchPosts("likes", false);
  };

  return (
    <div className="container margin-top">
      <div className="sorting-buttons">
        <button
          className="button-style sort-by-date"
          onClick={sortByCreationDate}
        >
          Sort by Date
        </button>
        <button className="button-style sort-by-likes" onClick={sortByLikes}>
          Sort by Likes
        </button>
      </div>
      {posts && posts.length > 0 ? (
        posts.map((post, _index) => (
          <Card
            key={post.id}
            id={post.id}
            title={post.title}
            subject={post.subject}
            code={post.coursecode}
            professor={post.p_firstname + " " + post.p_lastname}
            date={post.created_at}
            post={post.comment}
            likes={post.likes}
            context={"recent"}
          />
        ))
      ) : (
        <h2>No posts yet, create a post!</h2>
      )}
    </div>
  );
}

export default Recent;
