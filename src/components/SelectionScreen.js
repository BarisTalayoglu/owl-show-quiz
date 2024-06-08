import React from 'react';

const SelectionScreen = ({ onSelectQuestion }) => {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];

    return (
        <div id="selection-screen">
            {questions.map((question, index) => (
                <button key={index} onClick={() => onSelectQuestion(index)}>Question {index + 1}</button>
            ))}
        </div>
    );
};

export default SelectionScreen;
