// import use state to remember square component was clicked
import { useState } from "react";

function Square({ value, onSquareClick }) {
	/*
	// value stores value, setValue is a function to change value
	const [value, setValue] = useState(null);
	// make square interactive
	function handleClick() {
		setValue("X");
	}
	return (
		<>
			<button className="square" onClick={handleClick}>
				{value}
			</button>
		</>
	);
  */
	return (
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
}

export default function Board() {
	const [xIsNext, setXIsNext] = useState(true);
	// Array(9).fill(null) creates array with 9 elements and sets them to null
	const [squares, setSquares] = useState(Array(9).fill(null));

	function handleClick(i) {
		// return early - check if square has x or o
		if (squares[i] || calculateWinner(squares)) {
			return;
		}
		// take turns between x and o
		// x goes first
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}
		setSquares(nextSquares);
		setXIsNext(!xIsNext);
	}

	// let players know when game is over
	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}

	return (
		// user fragments <> </> to wrap multiple adjacent JSX elements
		<>
			<div className="status">{status}</div>
			<div className="board-row">
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>

			<div className="board-row">
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>

			<div className="board-row">
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	);
}

// winner
// doesn't matter if you define calculateWinner function before or after Board component
function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
