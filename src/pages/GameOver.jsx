import React from "react";
import { atomScore } from "../store/store.js";
import { useStore } from "@nanostores/react";
import { useScoreContext } from "../store/ScoreContext";

export default function GameOver() {
  const atomScoreStore = useStore(atomScore);
  const [score, setScore] = useScoreContext();

  return (
    <div>
      <h1>Game Over</h1>
      <p>nanostore Score: {atomScoreStore}</p>
      <p>context Score: {score}</p>
    </div>
  );
}
