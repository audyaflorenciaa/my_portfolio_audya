// app/mini-projects/tic-tac-toe/page.js
"use client"; // This is needed for interactive client-side components

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Initial game state
const initialBoard = Array(9).fill(null); // Represents the 3x3 board
const PLAYER_X = 'X'; // Human player
const PLAYER_O = 'O'; // AI player

export default function TicTacToePage() {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_X); // Player X starts
  const [gameStatus, setGameStatus] = useState("Your Turn (X)");
  const [winner, setWinner] = useState(null); // Stores 'X', 'O', or 'Draw'
  const [isLoading, setIsLoading] = useState(false); // For AI thinking time
  const [errorMessage, setErrorMessage] = useState(''); // For backend errors

  // Function to check for a winner
  const checkWinner = (currentBoard) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6],           // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a]; // Return 'X' or 'O'
      }
    }

    if (currentBoard.every(cell => cell !== null)) {
      return 'Draw'; // All cells filled, no winner
    }

    return null; // No winner yet
  };

  // Handle player's move
  const handleCellClick = (index) => {
    if (board[index] || winner || isLoading) {
      return; // Cell already taken, game over, or AI is thinking
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      if (gameResult === 'Draw') {
        setGameStatus("It's a Draw!");
      } else {
        setGameStatus(`${gameResult} Wins!`);
      }
    } else {
      setCurrentPlayer(PLAYER_O); // Switch to AI's turn
      setGameStatus("AI's Turn (O)");
    }
  };

  // AI's turn (triggered by useEffect when currentPlayer becomes PLAYER_O)
  useEffect(() => {
    if (currentPlayer === PLAYER_O && !winner) {
      setIsLoading(true);
      setErrorMessage('');

      const getAiMove = async () => {
        try {
          // --- Actual AI Backend Call ---
          // FIX: Use the environment variable for the API URL
          const ticTacToeApiUrl = process.env.NEXT_PUBLIC_TIC_TAC_TOE_API_URL;
          
          // Add a check to ensure the environment variable is loaded
          if (!ticTacToeApiUrl) {
              throw new Error("Tic Tac Toe API URL is not configured. Please check Vercel environment variables.");
          }

          // Send the current board state to your Flask backend for the AI move.
          const response = await fetch(`${ticTacToeApiUrl}/ai_move`, { // Use the apiUrl variable here
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ board: board, player: PLAYER_O }), // Send current board and AI's marker
          });

          if (!response.ok) {
            const errorText = await response.text();
            let parsedError = errorText;
            try {
              const errorJson = JSON.parse(errorText);
              parsedError = errorJson.error || errorText;
            } catch (e) {}
            throw new Error(`Server error (${response.status}): ${parsedError}`);
          }
          
          const data = await response.json();
          const bestMove = data.move; // Assuming backend returns { move: index }

          if (bestMove !== -1 && board[bestMove] === null) { // Ensure move is valid and cell is empty
            const newBoard = [...board];
            newBoard[bestMove] = PLAYER_O;
            setBoard(newBoard);

            const gameResult = checkWinner(newBoard);
            if (gameResult) {
              setWinner(gameResult);
              if (gameResult === 'Draw') {
                setGameStatus("It's a Draw!");
              } else {
                setGameStatus(`${gameResult} Wins!`);
              }
            } else {
              setCurrentPlayer(PLAYER_X); // Switch back to player X
              setGameStatus("Your Turn (X)");
            }
          } else if (bestMove === -1 && checkWinner(board) === 'Draw') {
              setWinner('Draw');
              setGameStatus("It's a Draw!");
            } else {
              setErrorMessage("AI returned an invalid move or game is already over.");
              setGameStatus("Error in AI Turn.");
            }
        } catch (error) {
          console.error("AI move error:", error);
          setErrorMessage(`AI Error: ${error.message || 'Could not get AI move.'}`);
          setGameStatus("Error in AI Turn.");
        } finally {
          setIsLoading(false);
        }
      };

      // Small delay to simulate AI thinking
      const timer = setTimeout(getAiMove, 500); // 500ms delay
      return () => clearTimeout(timer); // Cleanup timeout if component unmounts
    }
  }, [board, currentPlayer, winner]); // Dependencies for useEffect

  // Reset the game
  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer(PLAYER_X);
    setGameStatus("Your Turn (X)");
    setWinner(null);
    setIsLoading(false);
    setErrorMessage('');
  };

  return (
    <div className="page-container">
      {/* Back Button */}
      <Link
        href="/"
        style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          color: 'white',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          padding: '8px 15px',
          borderRadius: '25px',
          backgroundColor: '#000000',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          fontWeight: '600',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          zIndex: 10,
          cursor: 'pointer',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '24px', height: '24px', marginRight: '8px', stroke: 'currentColor' }}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      <div className="main-card-wrapper">
        <div className="main-card">
          <h1 className="title">Tic-Tac-Toe AI Player</h1>
          <p className="description">
            Play a classic game of Tic-Tac-Toe against an AI opponent! Can you beat it?
          </p>

          <div className="game-status-area">
            <p className="game-status">{gameStatus}</p>
            {errorMessage && <p className="error-message-small">{errorMessage}</p>}
          </div>

          <div className="board-grid">
            {board.map((cell, index) => (
              <div
                key={index}
                className={`cell ${cell === PLAYER_X ? 'player-x' : cell === PLAYER_O ? 'player-o' : ''}`}
                onClick={() => handleCellClick(index)}
              >
                {cell}
              </div>
            ))}
          </div>

          <button
            onClick={resetGame}
            className="reset-button"
            disabled={isLoading}
          >
            Reset Game
          </button>
        </div>
      </div>

      {/* Scoped CSS for this component */}
      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #4CAF50, #2196F3, #9C27B0); /* Green -> Blue -> Purple gradient */
          color: white;
          position: relative;
          font-family: 'Inter', sans-serif;
        }

        .back-button {
          position: absolute;
          top: 15px;
          left: 15px;
          color: white;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          padding: 8px 15px;
          border-radius: 25px;
          background-color: #000000;
          border: 1px solid rgba(255, 255, 255, 0.3);
          font-weight: 600;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          z-index: 10;
          cursor: pointer;
        }

        .back-button:hover {
          color: #E0E0E0;
          background-color: #333333;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 6px 18px rgba(0,0,0,0.5);
        }

        .back-icon {
          width: 24px;
          height: 24px;
          margin-right: 8px;
          stroke: currentColor;
        }

        .main-card-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          padding: 20px;
          box-sizing: border-box;
        }

        .main-card {
          background-color: rgba(30, 41, 59, 0.8); /* Dark gray with opacity */
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          max-width: 500px; /* Smaller max-width for game board */
          width: 100%;
          text-align: center;
          border: 1px solid rgba(33, 150, 243, 0.5); /* Blue border */
          transform: scale(1);
          transition: transform 0.3s ease-in-out;
        }

        .main-card:hover {
          transform: scale(1.02);
        }

        .title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 15px;
          background: linear-gradient(to right, #00BCD4, #8BC34A); /* Cyan to Light Green gradient */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .description {
          font-size: 1.1rem;
          color: #E0E0E0;
          margin-bottom: 30px;
        }

        .game-status-area {
          margin-bottom: 20px;
          min-height: 40px; /* Reserve space for status */
        }

        .game-status {
          font-size: 1.8rem;
          font-weight: bold;
          color: #E0E0E0;
        }

        .error-message-small {
          color: #EF4444; /* Red */
          font-size: 0.9rem;
          margin-top: 5px;
        }

        .board-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 10px;
          width: 300px; /* Fixed size for the board */
          height: 300px;
          margin: 0 auto 30px auto; /* Center board and add bottom margin */
          background-color: #2D3748; /* Darker gray for board background */
          border-radius: 10px;
          padding: 10px;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
        }

        .cell {
          background-color: #3B475B; /* Slightly lighter gray for cells */
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem; /* Large X/O */
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
          color: white; /* Default color for X/O */
        }

        .cell:hover {
          background-color: #4A566B; /* Darker hover */
        }

        .cell.player-x {
          color: #FFD700; /* Gold for X */
        }

        .cell.player-o {
          color: #00BFFF; /* Deep Sky Blue for O */
        }

        .reset-button {
          background: linear-gradient(to right, #2196F3, #4CAF50); /* Blue to Green gradient */
          color: white;
          font-weight: bold;
          padding: 15px 40px;
          border-radius: 50px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          font-size: 1.2rem;
          letter-spacing: 0.05em;
          transition: all 0.3s ease-in-out;
          border: none;
          cursor: pointer;
        }

        .reset-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .reset-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .title {
            font-size: 2.5rem;
          }
          .main-card {
            padding: 30px;
          }
          .board-grid {
            width: 250px;
            height: 250px;
            font-size: 3rem;
          }
          .cell {
            font-size: 3rem;
          }
          .game-status {
            font-size: 1.5rem;
          }
          .reset-button {
            padding: 12px 30px;
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
