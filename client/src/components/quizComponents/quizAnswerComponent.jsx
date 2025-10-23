import { FaSyncAlt } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GoSkip } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";

import { useGetQuizAnswersQuery } from "../../features/quiz/quizApiSlice";

import '../../styles/quiz-page.css';


const QuizAnswerComponent = ({ id,userAnswers,skippedquizQuestions,skippedCount,answeredCount,resetQuiz }) => {

    
    const {data} = useGetQuizAnswersQuery(id, {
        skip: !id,
    });

    const quizQuestions = data?.questions || [];

    const calculateScore = () => {
        return Object.keys(userAnswers).reduce((score, questionIndex) => {
          const answer = userAnswers[questionIndex]
          return score + (answer === quizQuestions[questionIndex]?.correctAnswerIndex ? 1 : 0)
        }, 0)
      }

      const score = calculateScore()
      const percentage = Math.round((score / quizQuestions.length) * 100)

    return (
        <div className="quiz-container">
          <div className="quiz-main">
            <div className="quiz-card quiz-card-wide">
              <div className="card-header text-center">
                <h1 className="card-title card-title-large">Quiz Results</h1>
                <p className="card-description card-description-large">
                  You scored {score} out of {quizQuestions.length} ({percentage}%)
                </p>
                <p className="card-description">
                  Answered: {answeredCount??0} | Skipped: {skippedCount ? skippedCount : 0} | Unanswered:{" "}
                  {(quizQuestions.length - answeredCount??0 - skippedCount??0)}
                </p>
              </div>
              <div className="card-content">
                <div className="text-center">
                  <div
                    className={`score-display ${
                      percentage >= 70 ? "score-excellent" : percentage >= 50 ? "score-good" : "score-needs-work"
                    }`}
                  >
                    {percentage}%
                  </div>
                  <p className="score-message">
                    {percentage >= 70 ? "Excellent work!" : percentage >= 50 ? "Good effort!" : "Keep practicing!"}
                  </p>
                </div>
  
                <div className="review-section">
  
                  <h3 className="review-title">Review Your Answers:</h3>
  
                  {quizQuestions.map((question, index) => {
  
                    const userAnswer = userAnswers[index]
                    const isSkipped = skippedquizQuestions.has(index)
                    const isCorrect = userAnswer === question.correctAnswerIndex
  
                    return (
                      <div key={question.id} className="review-item">
                        <div className="review-content">
                          <div className="review-icon">
                            {isSkipped ? (
                              <GoSkip className="icon answer-skipped" style={{ color: "#d97706" }} />
                            ) : question.options[userAnswer] ? 
                              isCorrect ? (
                                <IoMdCheckmarkCircleOutline className="icon answer-correct" />
                              ) : (
                                <RxCrossCircled className="icon answer-incorrect" />
                              ):
                              <CgUnblock className="icon answer-unanswered" style={{ color: "#d97706" }} />
                            }
                          </div>
                          <div className="review-text">
                            <p className="review-question">{question.questionText}</p>
                            {isSkipped ? (
                              <p className="review-answer">
                                <span style={{ color: "#d97706" }}>Question was skipped</span>
                              </p>
                            ) : (
                              <>
                                {question.options[userAnswer] ? <p className="review-answer">
                                  Your answer:{" "}
                                  <span className={isCorrect ? "answer-correct" : "answer-incorrect"}>
                                    {question.options[userAnswer]}
                                  </span>
                                </p>:
                                  <p
                                    className="review-answer answer-unanswered"
                                    style={{ color: "#d97706" }}
                                  >
                                    Question was Unanswered 
                                  </p>
                                }
                              </>
                            )}
                            {!isCorrect && (
                              <p className="review-answer">
                                Correct answer:{" "}
                                <span className="answer-correct">{question.options[question.correctAnswerIndex]}</span>
                              </p>
                            )}
                            <p className="review-explanation"> {question.correctAnswerDescription}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
  
                <div className="text-center">
                  <button className="btn btn-primary btn-large" onClick={resetQuiz}>
                    <FaSyncAlt className="icon-small" />
                    Take Quiz Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}

export default QuizAnswerComponent;