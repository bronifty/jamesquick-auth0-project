import React from "react";
import { useNavigate } from "react-router-dom";

export default function Game({ history }) {
  const navigate = useNavigate();
  const [score, setScore] = React.useState(0);
  const MAX_SECONDS = 5;
  const [ms, setMs] = React.useState(999);
  const [seconds, setSeconds] = React.useState(MAX_SECONDS);

  React.useEffect(() => {
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateTime = (startTime) => {
    const endTime = new Date();
    const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
    //add zeros if necessary to ensure the string has exactly 5 characters
    const formattedMSString = ("0000" + msPassedStr).slice(-5);
    //0000 - first 2 are the seconds, and the last 3 are the ms
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
    const updatedMs =
      1000 -
      parseInt(formattedMSString.substring(formattedMSString.length - 3));
    setSeconds(addLeadingZeros(updatedSeconds, 2));
    setMs(addLeadingZeros(updatedMs, 3));
  };

  React.useEffect(() => {
    if (seconds <= -1) {
      navigate("/gameOver");
      //   history.push("/gameOver");
      //   window.history.pushState(null, null, "/highScores");
      //   window.location.pathname = "highScores";
    }
  }, [seconds, ms, window.history]);

  const addLeadingZeros = (str, length) => {
    let zeros = "";
    for (let i = 0; i < length; i++) {
      zeros += "0";
    }
    return (zeros + str).slice(-length);
  };

  return (
    <>
      <div>
        Score: <strong>{score}</strong>
      </div>

      <div>A</div>
      <div>
        Time:{" "}
        <strong>
          {seconds}:{ms}
        </strong>
      </div>
    </>
  );
}
