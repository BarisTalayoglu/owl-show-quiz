import React from 'react';

const PlayersScreen = () => {
    const players = JSON.parse(localStorage.getItem('players')) || [];

    return (
        <div id="players-screen">
            {players.map((player, index) => (
                <div key={index}>{player.name}: {player.points} points</div>
            ))}
        </div>
    );
};

export default PlayersScreen;
