import React, { useState, useEffect } from 'react';

const ConfigurationScreen = ({ onConfigure }) => {
    const [numPlayers, setNumPlayers] = useState(2);
    const [playerNames, setPlayerNames] = useState(['', '']);
    const [numQuestions, setNumQuestions] = useState(10);
    const [timePerQuestion, setTimePerQuestion] = useState(30);
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [bulkImportData, setBulkImportData] = useState('');

    useEffect(() => {
        // Load questions from local storage
        const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        setQuestions(storedQuestions);
    }, []);

    const handleNumPlayersChange = (e) => {
        const newNumPlayers = e.target.value;
        setNumPlayers(newNumPlayers);
        setPlayerNames(Array.from({ length: newNumPlayers }, (_, i) => playerNames[i] || ''));
    };

    const handlePlayerNameChange = (index, value) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[index] = value;
        setPlayerNames(newPlayerNames);
    };

    const handleAddQuestion = () => {
        const newQuestionObj = { question: newQuestion, answer: newAnswer, revealed: false };
        const updatedQuestions = [...questions, newQuestionObj];
        setQuestions(updatedQuestions);
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
        setNewQuestion('');
        setNewAnswer('');
    };

    const handleBulkImport = () => {
        try {
            const importedQuestions = JSON.parse(bulkImportData);
            const updatedQuestions = [...questions, ...importedQuestions];
            setQuestions(updatedQuestions);
            localStorage.setItem('questions', JSON.stringify(updatedQuestions));
            setBulkImportData('');
        } catch (error) {
            alert('Invalid JSON format.');
        }
    };

    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "questions.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleReset = () => {
        localStorage.clear();
        setQuestions([]);
    };

    const isStartButtonDisabled = () => {
        return playerNames.some(name => name.trim().length < 1) || questions.length === 0;
    };

    const handleStartQuiz = () => {
        onConfigure(numPlayers, playerNames, numQuestions, timePerQuestion, questions);
    };

    return (
        <div className="configuration-screen">
            <h2>Configuration Screen</h2>
            <div>
                <label>
                    Number of Players:
                    <input
                        type="number"
                        value={numPlayers}
                        onChange={handleNumPlayersChange}
                        min="1"
                        max="8"
                    />
                </label>
            </div>
            {Array.from({ length: numPlayers }).map((_, index) => (
                <div key={index}>
                    <label>
                        Player {index + 1} Name:
                        <input
                            type="text"
                            value={playerNames[index]}
                            onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                        />
                    </label>
                    {playerNames[index].trim().length < 1 && (
                        <span style={{ color: 'red' }}>Name must be at least 1 character long.</span>
                    )}
                </div>
            ))}
            <div>
                <label>
                    Number of Questions:
                    <input
                        type="number"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(e.target.value)}
                        min="1"
                        max="64"
                    />
                </label>
            </div>
            <div>
                <label>
                    Time per Question (seconds):
                    <input
                        type="number"
                        value={timePerQuestion}
                        onChange={(e) => setTimePerQuestion(e.target.value)}
                        min="10"
                        max="60"
                    />
                </label>
            </div>
            <div>
                <h3>Add Question & Answer</h3>
                <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Question"
                />
                <input
                    type="text"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Answer"
                />
                <button onClick={handleAddQuestion}>Add Question</button>
            </div>
            <div>
                <h3>Bulk Import Questions</h3>
                <textarea
                    value={bulkImportData}
                    onChange={(e) => setBulkImportData(e.target.value)}
                    placeholder='[{"question": "Q1", "answer": "A1"}, {"question": "Q2", "answer": "A2"}]'
                />
                <button onClick={handleBulkImport}>Import Questions</button>
            </div>
            <div>
                <button onClick={handleExport}>Export Questions</button>
                <button onClick={handleReset}>Reset All Data</button>
            </div>
            <button onClick={handleStartQuiz} disabled={isStartButtonDisabled()}>Start Quiz</button>
        </div>
    );
};

export default ConfigurationScreen;
