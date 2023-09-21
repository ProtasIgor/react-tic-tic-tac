import { useState } from "react";

function CalculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

function Board({ xIsNext, squares, onPlay }) {

  const winner = CalculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  }
  else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  function handleClick(i) {
    if (squares[i] || CalculateWinner(squares)) return;

    let nextSquare = squares.slice();

    nextSquare[i] = (xIsNext) ? 'X' : 'O';

    onPlay(nextSquare)
  }

  return (
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
  )
};

export default function Game() {
  const [isXNext, SetXNext] = useState(true);
  const [history, SetHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  const moves = history.map((item, index) => {
    let decoration;
    if (index > 0) {
      decoration = `Go to move #${index}`;
    }
    else {
      decoration = "Go to start";
    }

    return (
      <li key={index}>
        <button className="button__history-move" onClick={() => { MoveTo(index) }}>{decoration}</button>
      </li>
    );
  })

  function MoveTo(index) {
    setCurrentMove(index);
    SetXNext(index % 2 === 0)
  }

  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    SetHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    SetXNext(!isXNext);
  }

  return (
    <div className="game">
      <div className="game-boad">
        <Board xIsNext={isXNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
