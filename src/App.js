import { useEffect, useState } from "react";
import "./App.css";
import CardFlip from "./Component/Card";
import MovesCount from "./Component/Moves";

const emojis = ["🥔", "🍒", "🥑", "🌽", "🥕", "🍇", "🍉", "🍌", "🥭", "🍍"];

// const emojis = [
// {emoji : "🥔", matched : false},
// {emoji : "🍒", matched : false},
// {emoji : "🥑", matched : false},
// {emoji : "🌽", matched : false},
// {emoji : "🥕", matched : false},
// {emoji : "🍇", matched : false},
// {emoji : "🍉", matched : false},
// {emoji : "🍌", matched : false},
// {emoji : "🥭", matched : false},
// {emoji : "🍍", matched : false},
// ];

const initEmojis = () => {
  let emojis = Array(0);
  for (let i = 0; i < 8; i++) {
    emojis.push(Math.floor(Math.random() * 10));
  }
  //   console.log(emojis);
  return emojis;
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

function App() {
  const [roundEmojis, setRoundEmojis] = useState([]);
  const [win, setWin] = useState(false);

  useEffect(() => {
    let roundEmojis = initEmojis();
    let roundArray = shuffle([...roundEmojis, ...roundEmojis]);
    setRoundEmojis(roundArray);
    // console.log(roundArray);
  }, []);

  //   const [cards, setCards] = useState([]); // card = roundEmojis
  const [CardOne, setCardOne] = useState(null);
  const [CardTwo, setCardTwo] = useState(null);

  // reset game

  // handle a choise
  const handleChoice = (roundEmojis) => {
    console.log(roundEmojis);
    CardOne ? setCardTwo(roundEmojis) : setCardOne(roundEmojis);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (CardOne && CardTwo) {
      if (CardOne === CardTwo) {
        console.log("Match");
        resetTurn();
      } else {
        console.log("Doesnt match");
        resetTurn();
      }
    }
  }, [CardOne, CardTwo]);

  console.log(roundEmojis);
  //   // reset choices
  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
  };

  return (
    <div className="App">
      <div>
        <div className="controls">
          <button>Start</button>
          <div className="stats">
            <MovesCount />
            <div className="timer">time: 0 sec</div>
          </div>
        </div>
        <div className="board-container">
          <div className="board" data-dimension="4">
            {roundEmojis.map((i) => (
              <CardFlip
                CardId={i}
                CardUp={i}
				CardEmoji={emojis[i]}
                CardDown={emojis[i]}
                handleChoice={handleChoice}
              />
            ))}
          </div>
          {win && <div className="win">You won!</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
