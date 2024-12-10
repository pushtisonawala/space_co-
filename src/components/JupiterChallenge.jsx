import React, { useState } from 'react';

const JupiterChallenge = ({ resources, onComplete }) => {
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);

  const questions = [
    {
      question: "What is the name of the giant storm on Jupiter?",
      correctAnswer: "Great Red Spot",
    },
    {
      question: "What is Jupiter's largest moon called?",
      correctAnswer: "Ganymede",
    },
    {
      question: "How many rings does Jupiter have?",
      correctAnswer: "4",
    },
  ];

  const handleAnswer = () => {
    const currentQuestion = questions[questionIndex];
    const updatedResources = { ...resources };

    if (answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
      updatedResources.fuel += 10;
      updatedResources.food += 5;
      updatedResources.water += 5;
      setMessage('Correct! Resources have been increased.');
    } else {
      updatedResources.fuel -= 10;
      updatedResources.food -= 5;
      updatedResources.water -= 5;
      setMessage('Incorrect! Resources have been decreased.');
    }

    // Call the onComplete function to update resources in the parent
    onComplete(updatedResources);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setAnswer('');
    } else {
      setMessage('Quiz completed!');
    }
  };

  return (
    <div>
      <h2>Jupiter Challenge: Quiz</h2>
      {questionIndex < questions.length ? (
        <>
          <p>{questions[questionIndex].question}</p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
          />
          <button onClick={handleAnswer}>Submit Answer</button>
          <p>{message}</p>
        </>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default JupiterChallenge;