import React from "react";
import { atomScore } from "../store/store.js";
import { useStore } from "@nanostores/react";

export default function GameOver() {
  const atomScoreStore = useStore(atomScore);
  return (
    <div>
      <h1>Game Over</h1>
      <p>Score: {atomScoreStore}</p>
    </div>
  );
}
