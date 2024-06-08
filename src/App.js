import React, { useState } from 'react';
import ConfigurationScreen from './components/ConfigurationScreen';
import SplashScreen from './components/SplashScreen';
import PlayersScreen from './components/PlayersScreen';
import SelectionScreen from './components/SelectionScreen';
import QuestionScreen from './components/QuestionScreen';
import './main';

const App = () => {
    const [mode, setMode] = useState('splash'); // splash, config, players, selection, question
    const [currentQuestion, setCurrentQuestion] = useState(null);

    const handleSelectQuestion = (index) => {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        setCurrentQuestion(questions[index].question);
        setMode('question');
    };

    const handleTimeOver = () => {
        alert('Time is over!');
        setMode('players');
    };

    return (
        <div>
            {mode === 'splash' && <SplashScreen />}
            {mode === 'config' && <ConfigurationScreen />}
            {mode === 'players' && <PlayersScreen />}
            {mode === 'selection' && <SelectionScreen onSelectQuestion={handleSelectQuestion} />}
            {mode === 'question' && currentQuestion && (
                <QuestionScreen question={currentQuestion} onTimeOver={handleTimeOver} />
            )}
        </div>
    );
};

export default App;
