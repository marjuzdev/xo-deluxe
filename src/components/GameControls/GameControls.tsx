import React from 'react';
import { useGame } from '../../hooks/useGame';
import styles from './GameControls.module.scss';

const GameControls: React.FC = () => {
  const { resetGame, undoMove, gameState } = useGame();
  const { isGameOver, gameMode } = gameState;

  const handleReset = () => {
    resetGame();
  };

  const handleUndo = () => {
    undoMove();
  };

  return (
    <div className={styles.controls}>
      <button 
        className={styles.button} 
        onClick={handleReset}
      >
        New Game
      </button>
      
      {gameMode === 'PVP' && !isGameOver && (
        <button 
          className={styles.button} 
          onClick={handleUndo}
        >
          Undo Move
        </button>
      )}
    </div>
  );
};

export default GameControls;