export type PlayerMark = 'X' | 'O' | null;
export type GameBoard = PlayerMark[][];

export type GameMode = 'PVP' | 'PVE';

export enum AIDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  SUPER_HARD = 'super_hard'
}

export const nameMappingDifficulty ={
  [AIDifficulty.EASY]: 'Easy',
  [AIDifficulty.MEDIUM]: 'Medium',
  [AIDifficulty.HARD]: 'hard',
  [AIDifficulty.SUPER_HARD] : 'Super hard'
}

export type GameState = {
  board: GameBoard;
  boardSize: number;
  currentPlayer: PlayerMark;
  winner: PlayerMark;
  isGameOver: boolean;
  isDraw: boolean;
  gameMode: GameMode;
  aiDifficulty: AIDifficulty;
  moveHistory: GameBoard[];
  lastMove: { row: number; col: number } | null;
};

export interface GameConfiguration {
  initialPlayer: PlayerMark;
  gameMode: GameMode;
  aiDifficulty: AIDifficulty;
}