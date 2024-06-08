import React from 'react';

const WinnerScreen = ({ winner, players, onPlayAgain }) => {
    return (
        <div className="winner-screen">
            <h1>{winner} WON!</h1>
            <h2>Final Stats:</h2>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>
                        {player.name}: {player.points} points
                    </li>
                ))}
            </ul>
            <button onClick={onPlayAgain}>Play Again</button>
        </div>
    );
};

export default WinnerScreen;
