import React from "react";

const Home = props => {
  return (
    <div>
      {props.auth.isAuthenticated() ? (
        <h1>Home</h1>
      ) : (
        <h4>Log into your account</h4>
      )}
    </div>
  );
};

export default Home;
