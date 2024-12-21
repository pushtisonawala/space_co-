import React, { useState, useEffect } from 'react';
import './MarsChallenge.css'; // Ensure this file is created with the styles
import axios from 'axios';
import victorySound from './victory.mp3'; // Ensure these files exist in a "sounds" folder
import failureSound from './failure.mp3';

const MarsChallenge = ({ history }) => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Tic-Tac-Toe board (3x3)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Boolean to track whose turn it is
  const [winner, setWinner] = useState(null); // Winner ('X' or 'O')
  const [score, setScore] = useState(0); // Score based on wins
  const playerName = localStorage.getItem('playerName') || 'Player'; // Retrieve player name from local storage
  const [scoreSaved, setScoreSaved] = useState(false); // Flag to track if score has been saved

  const victoryAudio = new Audio(victorySound);
  const failureAudio = new Audio(failureSound);

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      // AI makes its move
      setTimeout(aiMove, 500); // Delay AI move for effect
    }
  }, [isPlayerTurn, winner]);

  const aiMove = () => {
    const emptySpaces = board
      .map((value, index) => (value === null ? index : null))
      .filter((value) => value !== null);

    const randomIndex = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
    makeMove(randomIndex, 'O'); // AI uses 'O'
  };

  const makeMove = (index, player) => {
    if (board[index] === null && !winner) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setIsPlayerTurn(player === 'O' ? true : false); // Switch turn
    }
  };

  const checkWinner = (board) => {
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

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return 'X' or 'O' if a winner is found
      }
    }

    return null; // No winner
  };

  useEffect(() => {
    const currentWinner = checkWinner(board);
    if (currentWinner) {
      setWinner(currentWinner);
      if (currentWinner === 'X') {
        victoryAudio.play(); // Play victory sound
        setScore((prevScore) => prevScore + 1); // Player 'X' wins
      } else {
        failureAudio.play(); // Play failure sound
      }
      saveScore();
    } else if (board.every((space) => space !== null)) {
      setWinner('Tie'); // Tie if board is full and no winner
      saveScore(); // Save score even on tie (optional)
    }
  }, [board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true); // Player goes first
    setScoreSaved(false);
  };

  const saveScore = async () => {
    if (!scoreSaved) {
      setScoreSaved(true);
      try {
        const response = await axios.post('http://localhost:8000/mars/saveScore', {
          playerName: playerName,
          score: score,
        });

        if (response.data.success) {
          console.log('Score saved successfully!');
        } else {
          console.error('Error saving score:', response.data.message);
        }
      } catch (error) {
        console.error('Error saving score:', error);
        setScoreSaved(false);
      }
    }
  };

  return (
    <div className="mars-escape">
      <h1>Space Tic-Tac-Toe</h1>
      <p>Player vs Alien</p>
      <div className="game-stats">
        <p>Score: {score}</p>
        <p>{winner ? (winner === 'Tie' ? 'It\'s a Tie!' : `${winner} wins!`) : `Player's Turn: ${isPlayerTurn ? 'X' : 'O'}`}</p>
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => makeMove(index, 'X')}
            style={{
              pointerEvents: isPlayerTurn && cell === null ? 'auto' : 'none',
            }}
          >
            {cell}
          </div>
        ))}
      </div>

      {winner && (
        <div className="game-over">
          <h2>{winner === 'Tie' ? 'Tie Game' : `${winner} Wins!`}</h2>
          <div className="button-container">
            <button onClick={resetGame}>Play Again</button>
            <button onClick={() => (window.location.href = '/')}>Go Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarsChallenge;
