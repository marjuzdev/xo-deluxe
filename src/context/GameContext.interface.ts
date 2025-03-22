import { GameState, GameConfiguration } from '@models/game';

export interface GameContextProps {
  gameState: GameState;
  makeMove: (row: number, col: number) => void;
  resetGame: () => void;
  configureGame: (config: Partial<GameConfiguration>) => void;
  undoMove: () => void;
}