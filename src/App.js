import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import ConfigurationScreen from './components/ConfigurationScreen';
import PlayersScreen from './components/PlayersScreen';
import QuestionScreen from './components/QuestionScreen';
import SelectionScreen from './components/SelectionScreen';
import WinnerScreen from './components/WinnerScreen';
import appSettings from './appsettings';
import './styles/styles.css';

const App = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [mode, setMode] = useState('configuration');
    const [numPlayers, setNumPlayers] = useState(0);
    const [players, setPlayers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [answerResult, setAnswerResult] = useState(null);
    const [pointsPerQuestion, setPointsPerQuestion] = useState(appSettings.pointsPerQuestion);
    const [timePerQuestion, setTimePerQuestion] = useState(30);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), appSettings.splashScreenDuration);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        setQuestions(storedQuestions);
    }, []);

    const handleConfigure = (numPlayers, playerNames, numQuestions, timePerQuestion, configuredQuestions) => {
        setNumPlayers(numPlayers);
        setPlayers(playerNames.map(name => ({ name, points: 0 })));
        setTimePerQuestion(timePerQuestion);
        setQuestions(configuredQuestions);
        setMode('show');
    };

    const handleNextPlayer = () => {
        if (mode === 'show') {
            setCurrentPlayer(0);
        } else {
            setCurrentPlayer((prev) => (prev + 1) % numPlayers);
        }
        setAnswerResult(null);
        setMode(questions.length > 0 ? 'selection' : 'winner');
    };

    const handleSelectQuestion = (question) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.question === question.question ? { ...q, revealed: true } : q
            )
        );
        setCurrentQuestion(question);
        setMode('question');
    };

    const handleTimeUp = () => {
        setMode('players');
    };

    const handleAnswer = (answer) => {
        let isCorrect = false;
        if (answer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase()) {
            isCorrect = true;
            setPlayers((prevPlayers) => {
                const newPlayers = [...prevPlayers];
                newPlayers[currentPlayer].points += pointsPerQuestion;
                return newPlayers;
            });
        }
        setAnswerResult(isCorrect ? 'Correct!' : 'Incorrect');
        setQuestions((prevQuestions) =>
            prevQuestions.filter((q) => q.question !== currentQuestion.question)
        );
        setMode('players');
    };

    const determineWinner = () => {
        const maxPoints = Math.max(...players.map(player => player.points));
        const winners = players.filter(player => player.points === maxPoints);
        return winners.length === 1 ? winners[0].name : 'It\'s a tie!';
    };

    const handlePlayAgain = () => {
        const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        setQuestions(storedQuestions.map(q => ({ ...q, revealed: false })));
        setPlayers(players.map(player => ({ ...player, points: 0 })));
        setMode('configuration');
    };

    return (
        <div className="app">
            {showSplash ? (
                <SplashScreen
                    title="OwlShow Quiz"
                    logo="https://static.vecteezy.com/system/resources/thumbnails/008/154/167/small_2x/cute-baby-owl-on-tree-branch-free-vector.jpg"
                    onSplashEnd={() => setShowSplash(false)}
                />
            ) : mode === 'configuration' ? (
                <ConfigurationScreen onConfigure={handleConfigure} />
            ) : mode === 'show' ? (
                <PlayersScreen players={players} onNextPlayer={handleNextPlayer} onGoBack={() => setMode('configuration')} />
            ) : mode === 'selection' ? (
                <SelectionScreen questions={questions} players={players} onSelectQuestion={handleSelectQuestion} />
            ) : mode === 'question' ? (
                <QuestionScreen question={currentQuestion} onTimeUp={handleTimeUp} onAnswer={handleAnswer} />
            ) : mode === 'players' && answerResult ? (
                <div>
                    <h2>{answerResult}</h2>
                    <button onClick={handleNextPlayer}>Next Player</button>
                </div>
            ) : mode === 'winner' ? (
                <WinnerScreen winner={determineWinner()} players={players} onPlayAgain={handlePlayAgain} />
            ) : null}
        </div>
    );
};

export default App;
