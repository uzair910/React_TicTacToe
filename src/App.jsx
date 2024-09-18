import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import { useState } from 'react';

function deriveActivePlayer(gamesTurn) {
  let currentPlayer = 'X';
  if (gamesTurn.length > 0 && gamesTurn[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer; ß
}
export default function App() {
  const [gamesTurn, setGamesTurn] = useState([]);

  const activePlayer = deriveActivePlayer(gamesTurn); // using current state

  function handleSelectSquare(rowIndex, colIndex) {
    
    setGamesTurn((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns); // one older state
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'} />
          <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare}
          turns={gamesTurn}
        />
      </div>
      <Log turns={gamesTurn} />
    </main>
  );
}