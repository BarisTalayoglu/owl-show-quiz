import React from 'react';

const PlayersScreen = ({ players, onNextPlayer, onGoBack }) => {
    return (
        <div className="players-screen">
            <h2>Current Players</h2>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>
                        {player.name}: {player.points} points
                    </li>
                ))}
            </ul>
            <button onClick={onNextPlayer}>Click to start!</button>
            <button onClick={onGoBack}>Go Back to Configuration</button>
        </div>
    );
};

export default PlayersScreen;
