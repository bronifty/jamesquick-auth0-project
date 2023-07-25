import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1em",
        background: "#f5f5f5",
        borderBottom: "1px solid #ccc",
      }}>
      <Link to="/">Home</Link>
      <Link to="/game">Game</Link>
      <Link to="/highScores">High Scores</Link>
      <Link to="/login">Login/Register</Link>
    </div>
  );
};

export default Nav;
