import { useMemo } from 'react';
import Cell from '../Cell/Cell';
import { useGame } from '../../hooks/useGame';
import styles from './Board.module.scss';
import { checkWinner } from '../../utils/ai/minimax';

const Board: React.FC = () => {

  const { gameState, makeMove } = useGame();
  const { board, winner, lastMove } = gameState;

  // Calculate winning cells
  const winningCells = useMemo(() => {
    if (!winner) return [];
    return checkWinner(board, winner)
  }, [winner, board]);

  // Check if a cell is in the winning combination
  const isWinningCell = (row: number, col: number): boolean => {
    return winningCells.some(cell => cell.row === row && cell.col === col);
  };

  // Check if a cell is the last move
  const isLastMove = (row: number, col: number): boolean => {
    return lastMove?.row === row && lastMove?.col === col;
  };

  return (
    <div className={styles.board}>
      { board.map((row, rowIndex) => {

          return (
            <div key={`row-${rowIndex}`} className={styles.row}>
              {
                row.map((cell, colIndex) => (
                  <Cell
                    key={`cell-${rowIndex}-${colIndex}`}
                    rowIndex={rowIndex}
                    value={cell}
                    onClick={() => makeMove(rowIndex, colIndex)}
                    isWinningCell={isWinningCell(rowIndex, colIndex)}
                    isLastMove={isLastMove(rowIndex, colIndex)}
                  />
                ))
              }
            </div>
          )
        })
      }
    </div>
  );
};

export default Board;