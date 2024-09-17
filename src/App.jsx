import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import { useState } from 'react';

export default function App() {
  const [gamesTurn, setGamesTurn] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    // setGamesTurn(prevTurn => {
    //   let currentPlayer = 'X'; // cannot use activeplayer because that is a state. 
    //   if (prevTurn.length > 0 && prevTurn[0].player === 'X') { // latest turn will be stored at first index.
    //     currentPlayer = 'O';
    //   }

    //   const updatedTurn = [
    //     { square: { row: rowIndex, col: colIndex }, player: currentPlayer }
    //     , ...prevTurn];

    //   return updatedTurn;

      setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
      setGamesTurn((prevTurns) => {
        let currentPlayer = 'X';
  
        if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
          currentPlayer = 'O';
        }
  
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
      <Log turns = {gamesTurn}/>
    </main>
  );
}