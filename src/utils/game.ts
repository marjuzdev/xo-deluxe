import { WINNING_COMBINATIONS } from "../constants/game";
import { GameBoard, PlayerMark } from "../models/game";

// Check if a player has won
export function checkWinner(board: GameBoard, player: PlayerMark): any {
    for (const combination of WINNING_COMBINATIONS) {
      const [[row1, col1], [row2, col2], [row3, col3]] = combination;
      if (
        board[row1][col1] === player &&
        board[row2][col2] === player &&
        board[row3][col3] === player
      ) {
        return {
          game:[
            { row: row1, col: col1 },
            { row: row2, col: col2 },
            { row: row3, col: col3 }
          ],
          winner: player
        };
      }
    }
    return [];
}