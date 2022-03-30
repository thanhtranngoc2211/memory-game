import { useEffect, useState, useRef } from "react";
import "./App.css";
import { motion } from "framer-motion";

const emojis = [
	"🥔",
	"🍒",
	"🥑",
	"🌽",
	"🥕",
	"🍇",
	"🍉",
	"🍌",
	"🥭",
	"🍍",
	"🍑",
	"🥥",
	"🍆",
	"🌶️",
	"🫐",
];

const initEmojis = (emojis) => {
	let roundEmojis = Array(0);
	let dummyArray = Array(0);
	for (let i = 0; i < emojis.length; i++) {
		dummyArray.push(i);
	}
	for (let i = 0; i < 8; i++) {
		let count = 0;
		let element = dummyArray[Math.floor(Math.random() * dummyArray.length)];
		roundEmojis.push(element);
		for (let i = 0; i < dummyArray.length; i++) {
			if (element === dummyArray[i]) {
				dummyArray.splice(count, 1);
				count = 0;
			} else {
				count++;
			}
		}
	}
	return roundEmojis;
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

function emojiObject(icon, index) {
	this.icon = icon;
	this.flip = false;
	this.index = index;
}

const generateRound = (array) => {
	let roundObject = Array(0);
	for (let i in array) {
		roundObject.push(new emojiObject(emojis[array[i]], roundObject.length));
	}
	return roundObject;
};

function App() {
	const [start, setStart] = useState(false);
	const [roundEmojis, setRoundEmojis] = useState([]);
	const [win, setWin] = useState(false);
	const [count, setCount] = useState(0);
	const [compareEmojis, setCompareEmojis] = useState([]);
	const [winCount, setWinCount] = useState(0);
	const [restart, setRestart] = useState(false);
	const [move, setMove] = useState(0);
	const [time, setTime] = useState(0);
	const intervalRef = useRef();

	useEffect(() => {
		setWinCount(0);
		let roundEmojis = initEmojis(emojis);
		let roundArray = shuffle([...roundEmojis, ...roundEmojis]);
		let roundObject = generateRound(roundArray);
		setRoundEmojis(roundObject);
	}, [restart]);

	useEffect(() => {
		if (winCount === 8) {
			setWin(true);
			clearInterval(intervalRef.current);
			console.log("win");
			setWinCount(0);
		}

		if (count === 2) {
			if (compareEmojis[0].icon === compareEmojis[1].icon) {
				setCount(0);

				setWinCount(winCount + 1);
			} else {
				setTimeout(() => {
					setCount(0);

					let round = [...roundEmojis];
					round[compareEmojis[0].index].flip = false;
					round[compareEmojis[1].index].flip = false;
					setRoundEmojis(round);
				}, 500);
			}
		} else return;
	}, [count, roundEmojis, compareEmojis, winCount]);

	const handleClick = (index) => {
		if (compareEmojis.length === 2) {
			setCompareEmojis([]);
			let round = [...roundEmojis];
			setCompareEmojis([round[index]]);
			round[index].flip = true;
			setRoundEmojis(round);

			setCount(count + 1);
		} else {
			let round = [...roundEmojis];
			round[index].flip = true;
			setCompareEmojis([...compareEmojis, round[index]]);
			setRoundEmojis(round);

			setCount(count + 1);
		}
		setMove(move + 1);
	};

	const handleStart = () => {
		setStart(true);
		let timeOut = 0;
		let round = [...roundEmojis];
		for (let i in round) {
			round[i].flip = true;
		}
		setRoundEmojis(round);
		setTimeout(() => {
			round = [...roundEmojis];
			for (let i in round) {
				round[i].flip = false;
			}
			setRoundEmojis(round);
			let timeStart = setInterval(() => {
				timeOut++;
				setTime(timeOut);
			}, 1000);
			intervalRef.current = timeStart;
		}, 1500);
	};

	const handleRestart = () => {
		setMove(0);
		setTime(0);
		setRestart(!restart);
		setWin(false);
		setStart(false);
	};

	if (start === false) {
		return (
			<div className="App">
				<div>
					<div className="controls">
						<motion.button
							onClick={handleStart}
							animate={{ scale: [1, 0.8, 0.8, 1] }}
							transition={{ repeat: Infinity, duration: 1 }}
						>
							Start
						</motion.button>
						<div className="stats">
							<div className="moves">0 moves</div>
							<div className="timer">time: {time} sec</div>
						</div>
						{win && (
							<button className="restart" onClick={handleRestart}>
								Restart
							</button>
						)}
					</div>
					<div className="board-container">
						<div className="board">
							{roundEmojis.map((i, index) => (
								<div className="card" key={index}>
									<div className={!i.flip ? "card-front" : "card-back"}></div>
									<div className={!i.flip ? "card-back" : "card-front"}></div>
								</div>
							))}
						</div>
						{win && <div className="win">You won!</div>}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="App">
			<div>
				<div className="controls">
					<button>Start</button>
					<div className="stats">
						<div className="moves">{move} moves</div>
						<div className="timer">time: {time} sec</div>
					</div>
					{win && (
						<motion.button
							className="restart"
							onClick={handleRestart}
							animate={{ scale: [1, 0.8, 0.8, 1] }}
							transition={{ repeat: Infinity, duration: 1 }}
						>
							Restart
						</motion.button>
					)}
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
