import React from "react";

const ScoreContext = React.createContext(0);
const useScoreContext = () => React.useContext(ScoreContext);

const ScoreProvider = ({ children }) => {
  const [score, setScore] = React.useState(0);
  // const increment = () => setScore((prevScore) => prevScore + 1);
  // const reset = () => setScore(0);
  return (
    <ScoreContext.Provider value={[score, setScore]}>
      {children}
    </ScoreContext.Provider>
  );
};

export { ScoreProvider, useScoreContext };
