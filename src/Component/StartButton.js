import React from "react";
import InitCard from "../GamePlay/InitCard";

export default function StartButton(props) {
  const handleStart = () => {
    props.setTurnDownUnmatched((prevTurnDownUnmatched) => true);
    props.setCountMatched((prevSetCountMatched) => 0);
    props.setWin((prevWin) => false);
    props.setMoves(prevMoves => 0);
    props.setTurnDownUnmatched((prevTurnDownUnmatched) => false);
    let roundArray = InitCard();
    props.setRoundEmojis(roundArray);
  };

  return (
    <div>
      <button onClick={handleStart}>Start</button>
    </div>
  );
}
