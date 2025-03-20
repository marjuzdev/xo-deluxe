import { useEffect, useRef, useState } from 'react';
import { PlayerMark } from '../../models/game';
import styles from './Cell.module.scss';
import { useGame } from '../../hooks/useGame';


interface CellProps {
  value: PlayerMark;
  rowIndex: number;
  onClick: () => void;
  isWinningCell: boolean;
  isLastMove: boolean;
}

const Cell: React.FC<CellProps> = ({ 
  value,
  rowIndex,
  onClick,
  isWinningCell,
  isLastMove
 }) => {

  const { gameState:{ boardSize}} = useGame();
  const [animate, setAnimate] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setAnimate(true);
    }
  }, [value]);


  const cellClasses = [
    styles.cell,
    rowIndex + 1  === boardSize ? styles.lastRow : '',
    value === 'X' ? styles.x : '',
    value === 'O' ? styles.o : '',
    isWinningCell ? styles.winning : '',
    isLastMove ? styles.lastMove : '',
    animate && value ? styles.animate : ''
  ].filter(Boolean).join(' ');


  return (
    <div 
      ref={cellRef}
      className={cellClasses}
      onClick={onClick}
      aria-label={value ? `Cell marked with ${value}` : 'Empty cell'}
    >
      {value === 'X' && (
        <div className={styles.xMark}>
          <svg viewBox="0 0 100 100" className={styles.xSvg}>
            <path className={styles.xPath1} d="M20,20 L80,80" />
            <path className={styles.xPath2} d="M80,20 L20,80" />
          </svg>
        </div>
      )}
      
      {value === 'O' && (
        <div className={styles.oMark}>
          <svg viewBox="0 0 100 100" className={styles.oSvg}>
            <circle className={styles.oCircle} cx="50" cy="50" r="30" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Cell;