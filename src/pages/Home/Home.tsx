// pages/Home/Home.tsx
import { Link } from 'react-router-dom';
import './Home.scss';

function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenido a Tic Tac Toe</h1>
      <p>Selecciona el modo de juego para comenzar.</p>
      <Link to="/game">
        <button>Comenzar Juego</button>
      </Link>
    </div>
  );
}

export default Home;