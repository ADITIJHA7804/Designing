import { useEffect } from 'react'
import './FeedbackModal.css'

const FeedbackModal = ({ feedbackData, onNext, streak }) => {
  const { isCorrect, pointsEarned, currentEmail, userGuess } = feedbackData

  useEffect(() => {
    // Auto-advance after showing feedback for a few seconds
    const timer = setTimeout(() => {
      // Don't auto-advance if user got it wrong and needs to read explanation
      if (isCorrect) {
        onNext()
      }
    }, isCorrect ? 3000 : 8000)

    return () => clearTimeout(timer)
  }, [isCorrect, onNext])

  return (
    <div className="modal-overlay">
      <div className={`feedback-modal ${isCorrect ? 'correct' : 'incorrect'}`}>
        <div className="modal-header">
          <h2>{isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h2>
          {isCorrect && <div className="celebration">🎉</div>}
        </div>

        <div className="feedback-content">
          <div className="result-summary">
            <p>
              You guessed: <strong>{userGuess}</strong>
            </p>
            <p>
              Correct answer: <strong>{currentEmail.isPhishing ? 'Phishing' : 'Legitimate'}</strong>
            </p>
            <p className="points-earned">
              Points earned: <strong>+{pointsEarned}</strong>
            </p>
          </div>

          <div className="explanation-section">
            <h3>📚 Explanation:</h3>
            <p>{currentEmail.explanation}</p>
          </div>

          {isCorrect && streak > 1 && (
            <div className="streak-bonus">
              🔥 Streak bonus! You're on fire with {streak} correct answers in a row!
            </div>
          )}

          {!isCorrect && (
            <div className="learning-tip">
              <h3>💡 Learning Tip:</h3>
              <p>Remember to check the sender's domain and look for suspicious language patterns!</p>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="next-btn" onClick={onNext}>
            {isCorrect ? 'Next Email' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal