import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { atomScore } from "../store/store.js";
import { useScoreContext } from "../store/ScoreContext";

export default function Game() {
  const navigate = useNavigate();
  const [score, setScore] = useScoreContext();
  const MAX_SECONDS = 5;
  const [time, setTime] = useState({ sec: MAX_SECONDS, ms: 0 });
  const [currentCharacter, setCurrentCharacter] = useState("");
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * 36);
    setCurrentCharacter(characters[randomInt]);
  };

  useEffect(() => {
    setRandomCharacter();
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime.ms === 0) {
          if (prevTime.sec === 0) {
            clearInterval(interval);
            return prevTime;
          } else {
            return { sec: prevTime.sec - 1, ms: 99 };
          }
        } else {
          return { sec: prevTime.sec, ms: prevTime.ms - 1 };
        }
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time.sec === 0 && time.ms === 0) {
      navigate("/gameOver");
    }
  }, [time, navigate]);

  const keyUpHandler = useCallback(
    (e) => {
      console.log(e.key, currentCharacter);
      if (e.key === currentCharacter) {
        setScore((prevScore) => prevScore + 1);
        atomScore.set(atomScore.get() + 1);
      } else {
        if (score > 0) {
          setScore((prevScore) => prevScore - 1);
          atomScore.set(atomScore.get() - 1);
        }
      }
      setRandomCharacter();
    },
    [currentCharacter]
  );

  useEffect(() => {
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [keyUpHandler]);

  return (
    <>
      <div>
        Score: <strong>{score}</strong>
      </div>

      <div>{currentCharacter}</div>
      <div>
        Time:{" "}
        <strong>
          {time.sec}:{time.ms < 10 ? `0${time.ms}` : time.ms}
        </strong>
      </div>
    </>
  );
}
