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

function App() {
	const [roundEmojis, setRoundEmojis] = useState([]);
	const [win, setWin] = useState(false);

	useEffect(() => {
		let roundEmojis = initEmojis();
		let roundArray = shuffle([...roundEmojis, ...roundEmojis]);
		setRoundEmojis(roundArray);
		console.log(roundArray);
	}, []);

	const handleClick = () => {};

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
					<div className="board" data-dimension="4">
						{roundEmojis.map((i) => (
							<div className="card">
								<div className="card-front" onClick={handleClick}>
									{i}
								</div>
								<div className="card-back" onClick={handleClick}>
									1
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
