import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

const CardFlip = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(true); // Lật card, thêm điều kiện để lật card lại nếu cả 2 đều k matched
    if (!props.flipped) {
      props.handleChoice(props.CardData);
    }
  };

  useEffect(() => {
    if ((props.TurnDownUnmatched === true) && (!props.CardData.matched) && (isFlipped === true)) {
      console.log('reflip', props.CardData.index)
      setIsFlipped((prevIsFlipped) => props.CardData.Matched);
    }
  }, [props.TurnDownUnmatched]);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div>
        <button onClick={handleClick}>{/*props.CardUp*/}</button>
      </div>

      <div>
        <button>{props.CardDown}</button>
      </div>
    </ReactCardFlip>
  );
};

export default CardFlip;
