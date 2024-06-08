import React from 'react';

const SelectionScreen = ({ questions, players, onSelectQuestion }) => {
    return (
        <div className="selection-screen">
            <h2>Selection Screen</h2>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>
                        <button onClick={() => onSelectQuestion(question)}>
                            {question.revealed ? question.question : 'Mystery Question!'}
                        </button>
                    </li>
                ))}
            </ul>
            <h3>Player Stats</h3>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>
                        {player.name}: {player.points} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectionScreen;
