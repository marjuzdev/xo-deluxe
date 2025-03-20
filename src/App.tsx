import { GameProvider } from './context/GameContext';
import Board from './components/Board/Board';
import GameInfo from './components/GameInfo/GameInfo';
import GameControls from './components/GameControls/GameControls';
import GameModeSelector from './components/GameMode/GameMode';

function App() {
  return (
    <GameProvider>
      <div className="app-container">
        <div className="game-wrapper">
          <h1 className="game-title">X/O Deluxe</h1>
          <GameModeSelector />
          <GameInfo />
          <Board />
          <GameControls />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;