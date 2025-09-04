import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizContext } from '../context/QuizContext';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Timer from './Timer';

const Quiz = () => {
  const navigate = useNavigate();
  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswers,
    isLoading,
    error,
    quizCompleted,
    timeLeft,
    timerActive,
    selectAnswer,
    handleNextQuestion,
    handlePreviousQuestion,
    startTimer,
    loadQuestions,
    quizStarted,
    totalQuestions
  } = useQuizContext();

  useEffect(() => {
    if (!quizStarted) {
      loadQuestions();
    }
  }, [quizStarted, loadQuestions]);

  useEffect(() => {
    if (currentQuestion && !timerActive) {
      startTimer();
    }
  }, [currentQuestion, startTimer, timerActive]);

  useEffect(() => {
    if (quizCompleted) {
      navigate('/results');
    }
  }, [quizCompleted, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-[#eef2ff] to-[#faf5ff]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#4f46e5] mx-auto mb-4"></div>
          <p className="text-[#4b5563]">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-[#eef2ff] to-[#faf5ff]">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-[#dc2626] mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const currentAnswer = selectedAnswers[currentQuestionIndex];
  const canProceed = currentAnswer !== undefined;

  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-[#eef2ff] to-[#faf5ff] py-8 px-4">
      <div className="max-w-[48rem] mx-auto">
        <div className="bg-white rounded-[1rem] shadow-xl p-8 animate-slide-up">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-[2rem] font-bold text-[#111827]">Quiz Time!</h1>
              <Timer timeLeft={timeLeft} isActive={timerActive} />
            </div>
            <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
          </div>

          <Question
            question={currentQuestion}
            selectedAnswer={currentAnswer}
            onSelectAnswer={selectAnswer}
            questionNumber={currentQuestionIndex + 1}
          />

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`btn-secondary ${
                currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={!canProceed}
              className={`btn-primary ${
                !canProceed ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;