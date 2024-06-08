import React, { useState } from 'react';

const ConfigurationScreen = () => {
    const [numPlayers, setNumPlayers] = useState(1);
    const [numQuestions, setNumQuestions] = useState(1);
    const [timePerQuestion, setTimePerQuestion] = useState(10);

    return (
        <div id="config">
            <h1>Quiz Configuration</h1>
            <form id="config-form">
                <label htmlFor="num-players">Number of Players (max 8):</label>
                <input type="number" id="num-players" name="num-players" min="1" max="8" value={numPlayers} onChange={(e) => setNumPlayers(e.target.value)} required />
                <br />
                <label htmlFor="num-questions">Number of Questions (max 64):</label>
                <input type="number" id="num-questions" name="num-questions" min="1" max="64" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} required />
                <br />
                <label htmlFor="time-per-question">Time per Question (seconds):</label>
                <input type="number" id="time-per-question" name="time-per-question" min="10" value={timePerQuestion} onChange={(e) => setTimePerQuestion(e.target.value)} required />
                <br />
                <button type="button" id="add-question">Add Question & Answer</button>
                <br />
                <textarea id="bulk-import" placeholder="Bulk import questions in JSON format"></textarea>
                <br />
                <button type="button" id="import-questions">Import Questions</button>
                <button type="button" id="export-questions">Export Questions</button>
                <button type="button" id="reset">Reset</button>
                <br />
            </form>
        </div>
    );
};

export default ConfigurationScreen;
