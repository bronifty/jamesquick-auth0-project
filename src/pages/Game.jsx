// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Game({ history }) {
//   const navigate = useNavigate();
//   const [score, setScore] = React.useState(0);
//   const MAX_SECONDS = 5;
//   const [ms, setMs] = React.useState(999);
//   const [seconds, setSeconds] = React.useState(MAX_SECONDS);

//   React.useEffect(() => {
//     const currentTime = new Date();
//     const interval = setInterval(() => updateTime(currentTime), 1);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   const updateTime = (startTime) => {
//     const endTime = new Date();
//     const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
//     //add zeros if necessary to ensure the string has exactly 5 characters
//     const formattedMSString = ("0000" + msPassedStr).slice(-5);
//     //0000 - first 2 are the seconds, and the last 3 are the ms
//     const updatedSeconds =
//       MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
//     const updatedMs =
//       1000 -
//       parseInt(formattedMSString.substring(formattedMSString.length - 3));
//     setSeconds(addLeadingZeros(updatedSeconds, 2));
//     setMs(addLeadingZeros(updatedMs, 3));
//   };

//   React.useEffect(() => {
//     if (seconds <= -1) {
//       navigate("/gameOver");
//       //   history.push("/gameOver");
//       //   window.history.pushState(null, null, "/highScores");
//       //   window.location.pathname = "highScores";
//     }
//   }, [seconds, ms, navigate]);

//   const addLeadingZeros = (str, length) => {
//     let zeros = "";
//     for (let i = 0; i < length; i++) {
//       zeros += "0";
//     }
//     return (zeros + str).slice(-length);
//   };

//   return (
//     <>
//       <div>
//         Score: <strong>{score}</strong>
//       </div>

//       <div>A</div>
//       <div>
//         Time:{" "}
//         <strong>
//           {seconds}:{ms}
//         </strong>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { atomScore } from "../store/store.js";
import { useScoreContext } from "../store/ScoreContext";
import { atom } from "nanostores";

export default function Game() {
  const navigate = useNavigate();
  const [score, setScore] = useScoreContext();
  // const [score, setScore] = useState(0);
  // const { scoreContext, incrementScore, resetScore } = useScoreContext();
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
