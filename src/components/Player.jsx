import { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onChangeName }) {

    const [name, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleChange(value) {
        setPlayerName(event.target.value);
    }

    function handleClick() {
        setIsEditing(editing => !editing);
        if (isEditing) {
            onChangeName(symbol, name);
        }
    }

    let playerName = <span className="player-name">{name}</span>;
    if (isEditing) {
        playerName = <input type="text" required value={name} onChange={handleChange} />;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}