import React, { useState} from "react";
import ReactCardFlip from "react-card-flip";

const CardFlip = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
    props.handleChoice(props.CardEmoji);
};

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div>
        <button onClick={handleClick}>{props.CardUp}</button>
      </div>

      <div>
        <button onClick={handleClick}>{props.CardDown}</button>
      </div>
    </ReactCardFlip>
  );
};

export default CardFlip;
