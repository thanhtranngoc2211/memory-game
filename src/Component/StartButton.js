import React from "react";
import InitCard from "../GamePlay/InitCard";

export default function StartButton() {
  const handleStart = () => {
    window.location.reload(false);
  };

  return (
    <div>
      <button onClick={handleStart}>New game</button>
    </div>
  );
}
