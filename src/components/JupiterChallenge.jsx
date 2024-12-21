import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './JupiterChallenge.css';
import victorySound from './victory.mp3'; // Import victory sound
import failureSound from './failure.mp3'; // Import failure sound

const WordSearchGame = ({ resources }) => {
    const [grid, setGrid] = useState([]);
    const [wordsToFind, setWordsToFind] = useState([]);
    const [selectedCells, setSelectedCells] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [timer, setTimer] = useState(150); // Timer starts at 150 seconds
    const [countdown, setCountdown] = useState(null);

    const navigate = useNavigate(); // Initialize navigation
    const playerName = localStorage.getItem('playerName') || 'Guest';

    useEffect(() => {
        startGame();
        return () => clearInterval(countdown); // Cleanup timer on unmount
    }, []);

    const playSound = (soundFile) => {
        const sound = new Audio(soundFile);
        sound.play();
    };

    const saveGameResults = (won) => {
        const timeTaken = 150 - timer;
        const wordsCorrect = foundWords.length;
        const speed = (wordsCorrect / timeTaken) * 60;

        const gameData = {
            playerName: playerName,
            completed: won,
            timeTaken,
            speed: Math.round(speed),
            wordsCorrect,
        };

        axios
            .post('http://localhost:8000/jupiter/saveResults', gameData)
            .then((response) => {
                console.log('Game results saved:', response.data);
            })
            .catch((error) => {
                console.error('Error saving game results:', error);
            });
    };

    const startGame = () => {
        const mediumGrid = [
            ['S', 'P', 'A', 'C', 'E', 'S', 'H', 'I', 'P'],
            ['A', 'R', 'T', 'E', 'R', 'I', 'S', 'P', 'A'],
            ['R', 'O', 'C', 'K', 'S', 'N', 'E', 'B', 'U'],
            ['P', 'L', 'A', 'N', 'E', 'T', 'E', 'X', 'Y'],
            ['M', 'A', 'R', 'S', 'E', 'X', 'Z', 'S', 'P'],
            ['G', 'A', 'L', 'A', 'X', 'Y', 'R', 'T', 'S'],
            ['U', 'P', 'N', 'O', 'R', 'I', 'C', 'K', 'S'],
            ['S', 'T', 'A', 'R', 'S', 'M', 'A', 'T', 'S'],
            ['P', 'O', 'L', 'A', 'R', 'I'],
        ];

        const words = ['SPACE', 'STAR', 'ROCK', 'PLANET', 'MARS', 'GALAXY', 'POLAR', 'SHIP'];

        setGrid(mediumGrid);
        setWordsToFind(words);
        setSelectedCells([]);
        setFoundWords([]);
        setGameOver(false);
        setTimer(150);

        const newCountdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(newCountdown);
                    setGameOver(true);
                    saveGameResults(false); // Game over without winning
                    playSound(failureSound); // Play failure sound
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        setCountdown(newCountdown);
    };

    const isValidWord = (cells) => {
        const selectedWord = cells.map(({ row, col }) => grid[row][col]).join('');
        return wordsToFind.includes(selectedWord);
    };

    const isContiguous = (cells) => {
        if (cells.length < 2) return false;

        const rowDiff = cells[1].row - cells[0].row;
        const colDiff = cells[1].col - cells[0].col;

        const isStraightLine =
            (Math.abs(rowDiff) === 1 && colDiff === 0) || // Vertical
            (Math.abs(colDiff) === 1 && rowDiff === 0) || // Horizontal
            (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 1); // Diagonal

        for (let i = 1; i < cells.length; i++) {
            const prevCell = cells[i - 1];
            const currentCell = cells[i];
            if (Math.abs(currentCell.row - prevCell.row) > 1 || Math.abs(currentCell.col - prevCell.col) > 1) {
                return false;
            }
        }

        return isStraightLine;
    };

    const handleCellClick = (rowIndex, colIndex) => {
        if (gameOver) return;

        const newSelection = [...selectedCells, { row: rowIndex, col: colIndex }];

        if (isContiguous(newSelection)) {
            setSelectedCells(newSelection);

            if (
                isValidWord(newSelection) &&
                !foundWords.includes(newSelection.map(({ row, col }) => grid[row][col]).join(''))
            ) {
                const selectedWord = newSelection.map(({ row, col }) => grid[row][col]).join('');
                setFoundWords((prev) => [...prev, selectedWord]);

                const updatedWordsToFind = wordsToFind.filter((word) => word !== selectedWord);
                setWordsToFind(updatedWordsToFind);
                setSelectedCells([]);

                if (updatedWordsToFind.length === 0) {
                    clearInterval(countdown); // Stop the timer
                    setGameOver(true);
                    saveGameResults(true); // Player wins
                    playSound(victorySound); // Play victory sound
                }
            }
        } else {
            setSelectedCells([{ row: rowIndex, col: colIndex }]);
        }
    };

    return (
        <div className="word-search-game">
            <h1>Space Word Search Game</h1>
            <div className="resources">
                <h2>Resources:</h2>
                <ul>
                    <li>Food: {resources.food}</li>
                    <li>Water: {resources.water}</li>
                    <li>Fuel: {resources.fuel}</li>
                </ul>
            </div>

            <div className="word-list">
                <h2>Words to Find:</h2>
                <ul>
                    {wordsToFind.map((word, index) => (
                        <li key={index} className={foundWords.includes(word) ? 'found' : ''}>
                            {word}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="timer">
                <h2>Time Left: {timer}s</h2>
            </div>

            <div className="grid-container">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid-row">
                        {row.map((cell, colIndex) => {
                            const isSelected = selectedCells.some(
                                (selected) => selected.row === rowIndex && selected.col === colIndex
                            );
                            return (
                                <div
                                    key={colIndex}
                                    className={`grid-cell ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                >
                                    {cell}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {gameOver && (
                <div className="game-over">
                    {wordsToFind.length === 0 && timer > 0 ? (
                        <h2>Congratulations! You found all the words!</h2>
                    ) : (
                        <h2>Time's up! Game Over</h2>
                    )}
                    <button onClick={() => navigate('/')}>Go Back</button> {/* Navigate back */}
                    <button onClick={startGame}>Play Again</button>
                </div>
            )}
        </div>
    );
};

export default WordSearchGame;
