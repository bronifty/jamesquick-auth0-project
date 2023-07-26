import React from "react";
import { useNavigate } from "react-router-dom";
import { atomScore } from "../store/store.js";
import { useStore } from "@nanostores/react";
import { useScoreContext } from "../store/ScoreContext";

export default function GameOver() {
  const atomScoreStore = useStore(atomScore);
  const [score, setScore] = useScoreContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <div>
      <h1>Game Over</h1>
      <p>nanostore Score: {atomScoreStore}</p>
      <p>context Score: {score}</p>
    </div>
  );
}
