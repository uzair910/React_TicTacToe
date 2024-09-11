import { useState } from 'react';

export default function Player({initialName , symbol}){

    const [name, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleChange(value){
        setPlayerName(event.target.value);
    }

    function handleClick(){
        setIsEditing(editing => !editing);
    }

    let playerName = <span className="player-name">{name}</span>;
    if(isEditing){
        playerName = <input type="text" required value={name} onChange={handleChange}/>;
    }

    return (
        <li>
        <span className="player">
          {playerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    );
}