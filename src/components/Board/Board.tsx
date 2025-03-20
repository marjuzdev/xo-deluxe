import { useEffect, useMemo } from 'react';
import Cell from '../Cell/Cell';
import { useGame } from '../../hooks/useGame';
import { WINNING_COMBINATIONS } from '../../constants/game';
import styles from './Board.module.scss';

const Board: React.FC = () => {
  const { gameState, makeMove } = useGame();

  const { board, winner, lastMove } = gameState;

  // Calculate winning cells
  const winningCells = useMemo(() => {

    if (!winner) return [];

    for (const combination of WINNING_COMBINATIONS) {
      const [[row1, col1], [row2, col2], [row3, col3]] = combination;

      if (
        board[row1][col1] === winner &&
        board[row2][col2] === winner &&
        board[row3][col3] === winner
      ) {
        return [
          { row: row1, col: col1 },
          { row: row2, col: col2 },
          { row: row3, col: col3 }
        ];
      }
    }

    return [];

  }, [winner, board]);

  useEffect(() => {
    console.log('board', board);
    console.log('winner', winner);
  }, [])

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
      {board.map((row, rowIndex) => {

        return (

          <div key={`row-${rowIndex}`} className={styles.row}>
            {
              row.map((cell, colIndex) => (
                <Cell
                  key={`cell-${rowIndex}-${colIndex}`}
                  rowIndex={ rowIndex }
                  value={cell}
                  onClick={() => makeMove(rowIndex, colIndex)}
                  isWinningCell={isWinningCell(rowIndex, colIndex)}
                  isLastMove={isLastMove(rowIndex, colIndex)}
                />
              ))
            }
          </div>
        )
      }

      )}
    </div>
  );
};

export default Board;