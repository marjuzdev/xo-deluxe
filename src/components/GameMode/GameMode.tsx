import { useState } from 'react';
import { useGame } from '../../hooks/useGame';
import { AIDifficulty, GameMode, PlayerMark } from '../../models/game';
import styles from './GameMode.module.scss';

const GameModeSelector: React.FC = () => {
  const { configureGame, gameState } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<GameMode>(gameState.gameMode);
  const [selectedDifficulty, setSelectedDifficulty] = useState<AIDifficulty>(gameState.aiDifficulty);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerMark>('X');

  const handleModeChange = (mode: GameMode) => {
    setSelectedMode(mode);
  };

  const handleDifficultyChange = (difficulty: AIDifficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handlePlayerChange = (player: PlayerMark) => {
    if (player) {
      setSelectedPlayer(player);
    }
  };

  const handleSubmit = () => {
    configureGame({
      gameMode: selectedMode,
      aiDifficulty: selectedDifficulty,
      initialPlayer: selectedPlayer
    });
    setIsOpen(false);
  };

  return (
    <div className={styles.gameModeContainer}>
      <button
        className={styles.settingsButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        Game Settings
      </button>

      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Game Settings</h3>


            <div className={styles.optionGroup}>
              <h4>Starting Player</h4>
              <div className={styles.options}>
                <div className={`${styles.optionContainer} ${styles.optionPlayerOne}`}>
                  <button
                    className={`${styles.option} ${selectedPlayer === 'X' ? styles.selected : ''}`}
                    onClick={() => handlePlayerChange('X')}
                  >
                    X (First)
                  </button>
                </div>
                <div className={`${styles.optionContainer} ${styles.optionPlayerTwo}`}>
                  <button
                    className={`${styles.option} ${selectedPlayer === 'O' ? styles.selected : ''}`}
                    onClick={() => handlePlayerChange('O')}
                  >
                    O (Second)
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.optionGroup}>
              <h4>Game Mode</h4>
              <div className={styles.options}>
                <div className={`${styles.optionContainer} ${styles.optionModePlayer}`}>
                  <button
                    className={`${styles.option} ${selectedMode === 'PVP' ? styles.selected : ''}`}
                    onClick={() => handleModeChange('PVP')}
                  >
                    Player vs Player
                  </button>
                </div>
                <div className={`${styles.optionContainer} ${styles.optionModeAI}`}>
                  <button
                    className={`${styles.option} ${selectedMode === 'PVE' ? styles.selected : ''}`}
                    onClick={() => handleModeChange('PVE')}
                  >
                    Player vs AI
                  </button>
                </div>
              </div>
            </div>

            {selectedMode === 'PVE' && (
              <div className={styles.optionGroup}>
                <h4>Difficulty</h4>
                <div className={styles.options}>
                  <button
                    className={`${styles.option} ${selectedDifficulty === AIDifficulty.EASY ? styles.selected : ''}`}
                    onClick={() => handleDifficultyChange(AIDifficulty.EASY)}
                  >
                    Easy
                  </button>
                  <button
                    className={`${styles.option} ${selectedDifficulty === AIDifficulty.MEDIUM ? styles.selected : ''}`}
                    onClick={() => handleDifficultyChange(AIDifficulty.MEDIUM)}
                  >
                    Medium
                  </button>
                  <button
                    className={`${styles.option} ${selectedDifficulty === AIDifficulty.HARD ? styles.selected : ''}`}
                    onClick={() => handleDifficultyChange(AIDifficulty.HARD)}
                  >
                    Hard
                  </button>
                  <button
                    className={`${styles.option} ${selectedDifficulty === AIDifficulty.SUPER_HARD ? styles.selected : ''}`}
                    onClick={() => handleDifficultyChange(AIDifficulty.SUPER_HARD)}
                  >
                    Super Hard
                  </button>
                </div>
              </div>
            )}



            <div className={styles.modalFooter}>
              <div className={`${styles.actionsContainer}`}>
                <div className={`${styles.actionContainer}`}>
                  <button
                    className={styles.cancelButton}
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
                <div className={`${styles.actionContainer}`}>
                  <button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                  >
                    Start Game
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameModeSelector;