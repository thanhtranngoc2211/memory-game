import { useEffect, useState } from "react";
import "./App.css";
import StartButton from "./Component/StartButton";
import MovesCount from "./Component/Moves";
import MatchedCount from "./Component/MatchedCount";
import CardFlip from "./Component/Card";
import InitCard from "./GamePlay/InitCard";

const emojis = ["🥔", "🍒", "🥑", "🌽", "🥕", "🍇", "🍉", "🍌", "🥭", "🍍"];
const timeout = 2000;
const winConditions = 8; // Match 8 cặp, sẽ tính toán theo độ lớn của mảng sau
function App() {
  const [roundEmojis, setRoundEmojis] = useState([]);
  const [moves, setMoves] = useState(0);
  const [win, setWin] = useState(false);
  const [CardOne, setCardOne] = useState(null);
  const [CardTwo, setCardTwo] = useState(null);
  const [TurnDownUnmatched, setTurnDownUnmatched] = useState(null);
  const [countMatched, setCountMatched] = useState(0);

  //handle first time playing (chưa bấm nút start)
  useEffect(() => {
    setTurnDownUnmatched((prevTurnDownUnmatched) => true);
    setCountMatched((prevCountMatched) => 0);
    setWin((prevWin) => false);
    setMoves((prevMoves) => 0);
    let roundArray = InitCard();
    setRoundEmojis(roundArray);
  }, []);

  // Xử lý GamePlay
  // handle a choise
  const handleChoice = (roundEmojis) => {
    setMoves((prevMoves) => prevMoves + 1);
    CardOne ? setCardTwo(roundEmojis) : setCardOne(roundEmojis);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (CardOne && CardTwo) {
      if (CardOne.value === CardTwo.value) {
        console.log("Match");
        roundEmojis[CardOne.index].matched = true;
        roundEmojis[CardTwo.index].matched = true;
        setCountMatched((prevCountMatched) => prevCountMatched + 1);
        resetTurn();
      } else {
        console.log("Doesnt match");
        setTimeout(() => {
          setTurnDownUnmatched((preTurnDownUnmatched) => true);
          resetTurn();
        }, timeout);
      }
    }
  }, [CardOne, CardTwo]);

  // console.log(roundEmojis);
  console.log(TurnDownUnmatched);
  //   // reset choices
  const resetTurn = () => {
    setCardOne((prevCardOne) => null);
    setCardTwo((prevCardTwo) => null);
    setTurnDownUnmatched((preTurnDownUnmatched) => false);
  };

  // Điều kiện chiến thắng
  useEffect(() => {
    if (countMatched === winConditions) {
      setWin((preWin) => true);
    }
  }, [countMatched]);

  return (
    <div className="App">
      <div>
        <div className="controls">
          <StartButton
            setRoundEmojis={setRoundEmojis}
            setMoves={setMoves}
            setTurnDownUnmatched={setTurnDownUnmatched}
            setCountMatched={setCountMatched}
            setWin={setWin}
          />
          <div className="stats">
            <MovesCount moves={moves} />
            <MatchedCount countMatched={countMatched} />
            {/* <div className="timer">time: 0 sec</div> time t làm sau vì 1. Hết chỗ; 2. Ngại tìm thuật toán count*/}
          </div>
        </div>
        <div className="board-container">
          <div className="board" data-dimension="4">
            {/* Khi test roundLarge = 6, số hàng ngang sinh ra vẫn là 4. Cần fix sau */}
            {roundEmojis.map((i) => (
              <CardFlip
                key={i.index}
                CardData={i}
                CardUp={i.value}
                CardDown={emojis[i.value]}
                handleChoice={handleChoice}
                TurnDownUnmatched={TurnDownUnmatched}
                Flipped={i === CardOne || i === CardTwo || i.CardMatched}
              />
            ))}
          </div>
          {win && (
            <div className="win">
              You won in {moves} moves! Press Start to play again!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
