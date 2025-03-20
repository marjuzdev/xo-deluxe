import React, { useEffect } from 'react';
import { useGame } from '../../hooks/useGame';
import styles from './GameInfo.module.scss';
import { nameMappingDifficulty } from "../../models/game"

const GameInfo: React.FC = () => {
  const { gameState } = useGame();
  const { currentPlayer, winner, isDraw, isGameOver, gameMode, aiDifficulty } = gameState;

  let statusMessage = '';

  if (winner) {
    statusMessage = `Player ${winner} wins!`;
  } else if (isDraw) {
    statusMessage = "It's a draw!";
  } else {
    statusMessage = `Player ${currentPlayer}'s turn`;
  }

  return (
    <div className={styles.gameInfo}>
      <div className={styles.status}>
        <h2 className={styles.statusText}>{statusMessage}</h2>
      </div>
      
      <div className={styles.modeInfo}>
        <span className={styles.mode}>
          Mode: {gameMode === 'PVP' ? 'Player vs Player' : 'Player vs AI'}
        </span>
        
        {gameMode === 'PVE' && (
          <span className={styles.difficulty}>
            Difficulty: { nameMappingDifficulty[aiDifficulty] }
          </span>
        )}
      </div>
    </div>
  );
};

export default GameInfo;