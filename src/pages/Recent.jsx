/* eslint-disable no-unused-vars */
import Card from "../components/Card";
import "./Recent.css";
import { supabase } from "../Client";
import { useEffect, useState } from "react";

function Recent() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await supabase
          .from("Posts")
          .select()
          .order("created_at", { ascending: false });

        // Set our data our state
        setPosts(data);
        console.log("test" + posts[0].subject);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="container margin-top">
      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <Card
            key={index}
            id={posts[index].id}
            title={posts[index].title}
            subject={posts[index].subject}
            code={posts[index].coursecode}
            professor={posts[index].p_firstname + " " + posts[index].p_lastname}
            date={posts[index].created_at}
            post={posts[index].comment}
            likes={posts[index].likes}
          />
        ))
      ) : (
        <h2>{"No posts yet, create a post!"}</h2>
      )}
    </div>
  );
}

export default Recent;

// <Card
// title="Hell with heller"
// subject="CSCI"
// code="331"
// professor="Peter Heller"
// date="11/5/2023"
// post="Worst professor, i learned sql but at what cost. THe man is making me do work as if i was his intern"
// likes={2}
// ></Card>
