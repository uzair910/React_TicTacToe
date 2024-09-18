import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './WINNING_COMBINATIONS.js';
import GameOver from './components/GameOver.jsx';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gamesTurn) {
  let currentPlayer = 'X';
  if (gamesTurn.length > 0 && gamesTurn[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

export default function App() {
  const [gamesTurn, setGamesTurn] = useState([]);
  const activePlayer = deriveActivePlayer(gamesTurn); // using current state

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gamesTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of  WINNING_COMBINATIONS) { 
    const squareOne = gameBoard[combination[0].row][combination[0].column];
    const squareTwo = gameBoard[combination[1].row][combination[1].column];
    const squareThree = gameBoard[combination[2].row][combination[2].column];

    if(squareOne && //check to see if it is defined
      squareOne === squareTwo && squareOne === squareThree){
        winner = squareOne
      }
  }

  const isDraw = gamesTurn.length === 9 && !winner;

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

  function handleRematch(){
    setGamesTurn([]);
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'} />
          <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} onRematch = {handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gamesTurn} />
    </main>
  );
}