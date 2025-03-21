import { AIDifficulty, GameBoard, GameMode, GameState } from '../models/game';


export const BOARD_SIZE = 3;

export const INITIAL_BOARD: GameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

export const INITIAL_GAME_STATE: GameState = {
  board: INITIAL_BOARD,
  boardSize: BOARD_SIZE,
  currentPlayer: 'X',
  winner: null,
  isGameOver: false,
  isDraw: false,
  gameMode: 'PVP' as GameMode,
  aiDifficulty: AIDifficulty.EASY,
  moveHistory: [INITIAL_BOARD],
  lastMove: null
};

export const WINNING_COMBINATIONS = [
  // Rows
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  // Columns
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  // Diagonals
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]]
];

export const AI_THINKING_TIME = {
  [AIDifficulty.EASY]: 300,
  [AIDifficulty.MEDIUM]: 500,
  [AIDifficulty.HARD]: 700,
  [AIDifficulty.SUPER_HARD]: 1000
};