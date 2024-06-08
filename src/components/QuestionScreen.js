import React, { useEffect, useState } from 'react';

const QuestionScreen = ({ question, onTimeUp, onAnswer }) => {
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onTimeUp]);

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmitAnswer = () => {
        onAnswer(answer);
    };

    return (
        <div className="question-screen">
            <h2>Question</h2>
            <p>{question.question}</p>
            <p>Time remaining: {timeRemaining} seconds</p>
            <input
                type="text"
                value={answer}
                onChange={handleAnswerChange}
                placeholder="Type your answer"
            />
            <button onClick={handleSubmitAnswer}>Submit Answer</button>
        </div>
    );
};

export default QuestionScreen;
