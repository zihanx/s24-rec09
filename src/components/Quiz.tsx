import React, { useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';

const Quiz: React.FC = () => {
  // Initialize QuizCore
  const [quizCore] = useState(new QuizCore());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionSelect = (option: string): void => {
    if (!quizCompleted) { // Only allow selecting options if quiz isn't completed
      quizCore.answerQuestion(option);
      setSelectedAnswer(option);
    }
  };

  const handleNextQuestion = (): void => {
    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setSelectedAnswer(null); // Reset selected answer for the next question
    } else {
      setQuizCompleted(true); // No more questions, mark quiz as completed
    }
  };

  const currentQuestion = quizCore.getCurrentQuestion();
  const score = quizCore.getScore();
  const totalQuestions = quizCore.getTotalQuestions();


  if (quizCompleted) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {totalQuestions}</p>
      </div>
    );
  }

  return (
    <div>
      {currentQuestion ? (
        <>
          <h2>Quiz Question:</h2>
          <p>{currentQuestion.question}</p>

          <h3>Answer Options:</h3>
          <ul>
            {currentQuestion.options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionSelect(option)}
                className={selectedAnswer === option ? 'selected' : ''}
              >
                {option}
              </li>
            ))}
          </ul>

          <button onClick={handleNextQuestion}>{quizCore.hasNextQuestion() ? 'Next Question' : 'Submit Quiz'}</button>
        </>
      ) : (
        // In case there's no current question
        <div>
          <h2>Quiz Completed</h2>
        </div>
      )}
    </div>
  );
};

export default Quiz;