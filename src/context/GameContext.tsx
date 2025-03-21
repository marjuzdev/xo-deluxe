import { createContext, ReactNode, useEffect, useState } from 'react';
import { AIDifficulty, GameBoard, GameConfiguration, GameState } from '../models/game';
import { INITIAL_GAME_STATE } from '../constants/game';
import { getAIMove } from '../utils/ai/minimax';
import { cloneDeep } from '../utils/helpers';
import { checkWinner } from '../utils/game';

interface GameContextProps {
  gameState: GameState;
  makeMove: (row: number, col: number) => void;
  resetGame: () => void;
  configureGame: (config: Partial<GameConfiguration>) => void;
  undoMove: () => void;
}

export const GameContext = createContext<GameContextProps>({} as GameContextProps);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [aiThinking, setAiThinking] = useState(false);
  
  // Check for draw
  const checkForDraw = (board: GameBoard): boolean => {
    return board.every((row) => row.every((cell) => cell !== null));
  };

  // Make move
  const makeMove = (row: number, col: number) => {

    if (
      gameState.board[row][col] !== null ||
      gameState.isGameOver ||
      gameState.winner ||
      aiThinking
    ) {
      return;
    }

    // Create a new board with the move
    const newBoard = cloneDeep(gameState.board);
    newBoard[row][col] = gameState.currentPlayer;

    // Update history
    const newHistory = [...gameState.moveHistory, cloneDeep(newBoard)];
    // Check if there's a winner or draw
    const winner = checkWinner(newBoard, newBoard[row][col])['winner'];

    const isDraw = !winner && checkForDraw(newBoard);
    const isGameOver = !!winner || isDraw;


    // Update game state
    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner,
      isDraw,
      isGameOver,
      moveHistory: newHistory,
      lastMove: { row, col }
    });
  };

  // AI move
  useEffect(() => {
    if (
      gameState.gameMode === 'PVE' &&
      gameState.currentPlayer === 'O' &&
      !gameState.isGameOver &&
      !gameState.winner
    ) {
      setAiThinking(true);

      // Add a small delay to simulate "thinking"
      const thinkingTime = Math.random() * 500 + 300;

      setTimeout(() => {
        const { row, col } = getAIMove(
          gameState.board,
          gameState.aiDifficulty,
          gameState.lastMove
        );
        
        makeMove(row, col);
        setAiThinking(false);
      }, thinkingTime);
    }
  }, [gameState.currentPlayer, gameState.gameMode, gameState.isGameOver, gameState.winner]);

  // Reset game
  const resetGame = () => {
    setGameState(INITIAL_GAME_STATE);
  };

  // Configure game
  const configureGame = (config: Partial<GameConfiguration>) => {
    setGameState({
      ...INITIAL_GAME_STATE,
      currentPlayer: config.initialPlayer || 'X',
      gameMode: config.gameMode || 'PVP',
      aiDifficulty: config.aiDifficulty || AIDifficulty.EASY
    });
  };

  // Undo move
  const undoMove = () => {
    if (gameState.moveHistory.length <= 1) {
      return;
    }

    const newHistory = [...gameState.moveHistory];
    newHistory.pop(); // Remove the last move
    const previousBoard = newHistory[newHistory.length - 1];

    setGameState({
      ...gameState,
      board: cloneDeep(previousBoard),
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner: null,
      isDraw: false,
      isGameOver: false,
      moveHistory: newHistory,
      lastMove: null
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        makeMove,
        resetGame,
        configureGame,
        undoMove
      }}
    >
      {children}
    </GameContext.Provider>
  );
};