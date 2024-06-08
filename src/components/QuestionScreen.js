import React, { useState, useEffect } from 'react';

const QuestionScreen = ({ question, onTimeOver }) => {
    const [timeRemaining, setTimeRemaining] = useState(30); // Assuming 30 seconds per question

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    onTimeOver();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [onTimeOver]);

    return (
        <div id="question-screen">
            <div id="question">{question}</div>
            <div id="timer">Time remaining: {timeRemaining} seconds</div>
            <button id="award-points">Award Points</button>
            <button id="back-to-players">Back to Players Screen</button>
        </div>
    );
};

export default QuestionScreen;
