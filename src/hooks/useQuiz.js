import { useState, useEffect, useCallback } from "react";
import questionsData from "../data/questions.json";
import axios from "axios";

const useQuiz = (useAPI = false, questionCount = 10) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  // Get settings from sessionStorage
  const settings = JSON.parse(sessionStorage.getItem("quizSettings") || "{}");
  const difficulty = settings.difficulty || "any";

  // Function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Function to format questions consistently
  const formatQuestion = (question, index) => {
    // Combine correct answer with incorrect answers and shuffle
    const allAnswers = [question.correct_answer, ...question.incorrect_answers];
    const shuffledAnswers = shuffleArray(allAnswers);

    return {
      id: index + 1,
      question: question.question,
      options: shuffledAnswers,
      correctAnswer: question.correct_answer,
      category: question.category,
      difficulty: question.difficulty,
      type: question.type,
    };
  };

  // Load questions
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let rawQuestions = [];

        if (useAPI) {
          let apiUrl = `https://opentdb.com/api.php?amount=${questionCount}&type=multiple`;
          if (difficulty !== "any") {
            apiUrl += `&difficulty=${difficulty}`;
          }

          const response = await axios.get(apiUrl);
          rawQuestions = response.data.results;
        } else {
          // Filter by difficulty if specified
          let availableQuestions = questionsData;
          if (difficulty !== "any") {
            availableQuestions = questionsData.filter(
              (q) => q.difficulty === difficulty
            );
          }

          // Randomly select questions from local data
          const shuffledQuestions = shuffleArray(availableQuestions);
          rawQuestions = shuffledQuestions.slice(
            0,
            Math.min(questionCount, shuffledQuestions.length)
          );
        }

        const formattedQuestions = rawQuestions.map((q, index) =>
          formatQuestion(q, index)
        );
        setQuestions(formattedQuestions);
      } catch (err) {
        setError("Failed to load questions. Using local questions instead.");
        // Fallback to local data
        const shuffledQuestions = shuffleArray(questionsData);
        const fallbackQuestions = shuffledQuestions.slice(
          0,
          Math.min(questionCount, shuffledQuestions.length)
        );
        const formattedQuestions = fallbackQuestions.map((q, index) =>
          formatQuestion(q, index)
        );
        setQuestions(formattedQuestions);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [useAPI, questionCount, difficulty]);

  // Timer effect
  useEffect(() => {
    let interval;

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleNextQuestion();
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startTimer = useCallback(() => {
    setTimeLeft(30);
    setTimerActive(true);
  }, []);

  const stopTimer = useCallback(() => {
    setTimerActive(false);
  }, []);

  const selectAnswer = useCallback(
    (answer) => {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: answer,
      }));
    },
    [currentQuestionIndex]
  );

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      calculateScore();
      setQuizCompleted(true);
      stopTimer();
    }
  }, [currentQuestionIndex, questions.length, stopTimer]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setTimeLeft(30);
    }
  }, [currentQuestionIndex]);

  const calculateScore = useCallback(() => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  }, [questions, selectedAnswers]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(30);
    setTimerActive(false);
    // Reload questions to get a new random set
    window.location.reload();
  }, []);

  return {
    questions,
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    selectedAnswers,
    score,
    isLoading,
    error,
    quizCompleted,
    timeLeft,
    timerActive,
    selectAnswer,
    handleNextQuestion,
    handlePreviousQuestion,
    resetQuiz,
    startTimer,
    stopTimer,
    totalQuestions: questions.length,
  };
};

export default useQuiz;
