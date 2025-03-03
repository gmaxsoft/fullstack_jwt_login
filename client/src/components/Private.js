import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";

const Home = () => {
  const [privatePosts, setPrivatePosts] = useState([]);

  useEffect(() => {
    PostService.getAllPrivatePosts().then(
      (response) => {
        setPrivatePosts(response.data);
      },
      (error) => {
        console.log("Private page", error.response);
      }
    );
  }, []);

  return (
    <div>
      <h3>{privatePosts.map((post) => post.content)}</h3>
    </div>
  );
};

export default Home;