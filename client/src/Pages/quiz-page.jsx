import { useState } from "react"
import { useParams } from "react-router-dom";

import { IoSendSharp } from "react-icons/io5";

import QuizAnswerComponent from "../components/quizComponents/quizAnswerComponent";
import CircularProgress from "../components/SharedComponents/CircularProgress";

import { useGetQuizByIdQuery } from "../features/quiz/quizApiSlice";

import "../styles/quiz-page.css"

export default function QuizPage() {

  const {id} = useParams()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState({})
  const [skippedQuestions, setSkippedQuestions] = useState(new Set())

  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const { data: quizData/*, isLoading, isError */} = useGetQuizByIdQuery(id, {
    skip: !id, // Skip the query if no ID is provided
  });

  const quizQuestions = quizData?.questions||[{question:'',options:[],correctAnswer:0,explanation:''}];
  
  const handleAnswerSelect = (answerIndex) => {
    if (answerIndex !== null && selectedAnswer !== answerIndex) {

      const newAnswers = { ...answers }
      newAnswers[currentQuestion] = answerIndex
      setAnswers(newAnswers)

      // if answer is selected and answer is in skippedQuestions, remove it from skippedQuestions
      const newSkipped = new Set(skippedQuestions)
      newSkipped.delete(currentQuestion)
      setSkippedQuestions(newSkipped)

      setSelectedAnswer(answerIndex) 
    
    }else {
      // If the same answer is selected again, deselect it
      const newAnswers = { ...answers }
      delete newAnswers[currentQuestion]
      setAnswers(newAnswers)
      // If the same answer is selected again, deselect it
      setSelectedAnswer(null)
    }
  }
  
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(answers[currentQuestion + 1] ?? null)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {

      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] ?? null)
    }
  }

  const handleSkipQuestion = () => {
    const newSkipped = new Set(skippedQuestions)
    newSkipped.add(currentQuestion)
    setSkippedQuestions(newSkipped)

    // remove the skipped question from answers if it exists
    const newAnswers = { ...answers }
    delete newAnswers[currentQuestion]
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(answers[currentQuestion + 1] ?? null)
    }
  }

  const handleQuestionClick = (questionIndex) => {
    // Skip unanswered questions in between
    if (currentQuestion < questionIndex) {
      const newSkipped = new Set(skippedQuestions);
  
      for (let i = currentQuestion; i < questionIndex; i++) {
        const isAnswered = answers.hasOwnProperty(i);
        const isAlreadySkipped = skippedQuestions.has(i);
  
        if (!isAnswered && !isAlreadySkipped) {
          newSkipped.add(i);
        }
      }
  
      setSkippedQuestions(newSkipped);
    }
  
    // Save the selected answer for current question
    if (selectedAnswer !== null) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: selectedAnswer
      }));
    }
  
    // Update current question and restore answer if already given
    setCurrentQuestion(questionIndex);
    setSelectedAnswer(answers[questionIndex] ?? null);
  };
  

  const handleSubmitTest = () => {
    // Save current answer if any
    if (selectedAnswer !== null) {
      const newAnswers = { ...answers }
      newAnswers[currentQuestion] = selectedAnswer
      setAnswers(newAnswers)
    }

    setQuizCompleted(true)
  }

  const calculateScore = () => {
    return Object.keys(answers).reduce((score, questionIndex) => {
      const answer = answers[questionIndex]
      return score + (answer === quizQuestions[questionIndex].correctAnswer ? 1 : 0)
    }, 0)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers({})
    setSkippedQuestions(new Set())
    setShowResult(false)
    setQuizCompleted(false)
  }

  const getQuestionStatus = (index) => {
    if (index === currentQuestion) return "current"
    if (answers.hasOwnProperty(index)) return "answered"
    if (skippedQuestions.has(index)) return "skipped"
    return "unanswered"
  }

  const answeredCount = Object.keys(answers).length
  const skippedCount = skippedQuestions.size
  const progress = ((answeredCount+skippedCount) / quizQuestions.length) * 100

  if (quizCompleted && !showResult) {
    return (
      <div className="quiz-container">
        <div className="quiz-main">
          <div className="quiz-card">
            <div className="card-header text-center">
              <h1 className="card-title card-title-large">Quiz Completed!</h1>
              <p className="card-description">
                You've completed the quiz with {answeredCount} answered and {skippedCount} skipped quizQuestions. Ready to
                see your results?
              </p>
            </div>
            <div className="card-content text-center">
              <button className="btn btn-primary btn-large" onClick={() => setShowResult(true)}>
                View Results
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showResult) {

    return(
      <QuizAnswerComponent 
        id={id}
        userAnswers={answers} 
        skippedquizQuestions={skippedQuestions}
        skippedCount={skippedCount} 
        answeredCount={answeredCount}
        progress={progress}
        resetQuiz={resetQuiz} 
      />
    )

  }

  const question = quizQuestions[currentQuestion]

  return (
    <div className="quiz-container">
      
      <div className="quiz-sidebar">
        
        <h2 className="sidebar-title">Question Navigator</h2>

        <div className="question-grid">
          {quizQuestions.map((_, index) => (
            <button
              key={index}
              className={`question-number ${getQuestionStatus(index)}`}
              onClick={() => handleQuestionClick(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="status-legend">
          <div className="legend-item">
            <div className="legend-dot legend-current"></div>
            <span>Current</span>
          </div>
          <div className="legend-item">
            <CircularProgress 
                progress={
                  (answeredCount / quizQuestions.length) * 100
                }
                size={50}
                strokeWidth={5}
                totalCompleteColor='#059669'
            />
            <span style={{background:'transparent'}}>Answered ({answeredCount})</span>
          </div>

          <div className="legend-item">
            <CircularProgress 
                progress={
                  (skippedCount / quizQuestions.length) * 100
                }
                size={50}
                strokeWidth={5}
                totalCompleteColor='#d97706'
            />
            <span style={{background:'transparent'}}>Skipped ({skippedCount})</span>
          </div>

          <div className="legend-item">
            <CircularProgress 
                progress={
                  ((quizQuestions.length - answeredCount - skippedCount) / quizQuestions.length) * 100
                }
                size={50}
                strokeWidth={5}
                totalCompleteColor='#dc2626'
                unCompleteColor="#e5e7eb"
            />
            <span style={{background:'transparent'}}>Unanswered ({quizQuestions.length - answeredCount - skippedCount})</span>
          </div>
        </div>

        <div className="submit-section">
          <button className="btn btn-success btn-large btn-full" onClick={handleSubmitTest}>
            <IoSendSharp className="icon-small" />
            Submit Test
          </button>
        </div>

      </div>

      <div className="quiz-main">

        <div className="quiz-card">

          <div className="card-header">

            <div className="question-header">
              <div>
                <h1 className="card-title">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </h1>
                <h1 className="card-chapter">
                  {quizData?.title}
                </h1>
              </div>
              <div>
                <CircularProgress 
                  progress={progress}
                  size={50}
                  strokeWidth={5}
                />
              </div>
            </div>

          </div>

          <div className="card-content">

            <p className="question-text">{question.questionText}</p>

            <div className="options-container">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`option-item ${selectedAnswer === index ? "selected" : ""}`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <input
                    type="radio"
                    name="quiz-option"
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="radio-input"
                  />
                  <label className="option-text">{option}</label>
                </div>
              ))}
            </div>

            <div className="navigation-buttons">
              <button className="btn btn-outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                Previous
              </button>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {currentQuestion !== quizQuestions.length - 1 && <button className="btn btn-warning" onClick={handleSkipQuestion}>
                  Skip
                </button>}
                {currentQuestion === quizQuestions.length - 1 ? <button className="btn btn-success btn-large btn-full" onClick={handleSubmitTest}>
                    <IoSendSharp className="icon-small" />
                    Submit Test
                  </button> :
                  <button className="btn btn-primary" onClick={handleNextQuestion}>
                    Next Question
                  </button>
                }
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}