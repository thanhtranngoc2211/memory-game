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
    if ((props.TurnDownUnmatched === true) && (!props.CardData.matched)) {
      console.log('reflip', props.CardData.index)
      setIsFlipped((prevIsFlipped) => props.CardData.Matched);
      //Mỗi khi pick sai đang phải render lại mọi card chưa lật. Cần improve để chỉ duyệt qua những thằng đang lật.

    }
  }, [props.TurnDownUnmatched]);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div>
        <button onClick={handleClick}>{props.CardUp}</button>
      </div>

      <div>
        <button>{props.CardDown}</button>
      </div>
    </ReactCardFlip>
  );
};

export default CardFlip;
