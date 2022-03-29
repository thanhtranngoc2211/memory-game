import { useEffect, useState } from "react";
import "./App.css";

const emojis = ["🥔", "🍒", "🥑", "🌽", "🥕", "🍇", "🍉", "🍌", "🥭", "🍍"];

const initEmojis = () => {
	let emojis = Array(0);
	for (let i = 0; i < 8; i++) {
		emojis.push(Math.floor(Math.random() * 10));
	}
	console.log(emojis);
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

function emojiObject(icon) {
	this.icon = icon;
	this.flip = false;
}

const generateRound = (array) => {
	let roundObject = Array(0);
	for (let i in array) {
		roundObject.push(new emojiObject(emojis[array[i]]));
	}
	return roundObject;
};

function App() {
	const [roundEmojis, setRoundEmojis] = useState([]);
	const [win, setWin] = useState(false);
	const [count, setCount] = useState(0);

	useEffect(() => {
		let roundEmojis = initEmojis();
		let roundArray = shuffle([...roundEmojis, ...roundEmojis]);
		let roundObject = generateRound(roundArray);
		setRoundEmojis(roundObject);
		console.log(roundObject);
	}, []);

	useEffect(() => {
		if (count === 2) {
			setTimeout(() => {
				setCount(0);
				console.log("set");
				let round = [...roundEmojis];
				for (let i in round) {
					if (round[i].flip === true) {
						round[i].flip = false;
					}
				}
				setRoundEmojis(round);
			}, 2000);
		} else return;
	}, [count, roundEmojis]);

	const handleClick = (index) => {
		let round = [...roundEmojis];
		round[index].flip = true;
		setRoundEmojis(round);
		console.log(roundEmojis);
		setCount(count + 1);
	};

	return (
		<div className="App">
			<div>
				<div className="controls">
					<button>Start</button>
					<div className="stats">
						<div className="moves">0 moves</div>
						<div className="timer">time: 0 sec</div>
					</div>
				</div>
				<div className="board-container">
					<div className="board">
						{roundEmojis.map((i, index) => (
							<div className="card" key={index}>
								<div
									className={!i.flip ? "card-front" : "card-back"}
									onClick={count !== 2 ? () => handleClick(index) : null}
								></div>
								<div className={!i.flip ? "card-back" : "card-front"}>
									{i.icon}
								</div>
							</div>
						))}
					</div>
					{win && <div className="win">You won!</div>}
				</div>
			</div>
		</div>
	);
}

export default App;
