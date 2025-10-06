import { useState, useEffect } from 'react'
import './App.css'
import { getRandomEmailAdvanced } from './data/emails'
import EmailDisplay from './components/EmailDisplay'
import GameStats from './components/GameStats'
import FeedbackModal from './components/FeedbackModal'

function App() {
  const [currentEmail, setCurrentEmail] = useState(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameState, setGameState] = useState('menu') // menu, playing, feedback
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackData, setFeedbackData] = useState(null)
  const [streak, setStreak] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  useEffect(() => {
    if (gameState === 'playing') {
      loadNewEmail()
    }
  }, [gameState, level])

  const loadNewEmail = () => {
    setCurrentEmail(getRandomEmailAdvanced())
  }

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setLevel(1)
    setStreak(0)
    setTotalQuestions(0)
    setCorrectAnswers(0)
  }

  const handleEmailDecision = (isPhishingGuess) => {
    if (!currentEmail) return

    const isCorrect = currentEmail.isPhishing === isPhishingGuess
    const pointsEarned = isCorrect ? (currentEmail.difficulty === 'easy' ? 10 : currentEmail.difficulty === 'medium' ? 20 : 30) : 0

    setScore(prev => prev + pointsEarned)
    setTotalQuestions(prev => prev + 1)

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1)
      setStreak(prev => prev + 1)

      // Level up every 5 correct answers
      if (correctAnswers + 1 >= level * 5) {
        setLevel(prev => prev + 1)
      }
    } else {
      setStreak(0)
    }

    setFeedbackData({
      isCorrect,
      pointsEarned,
      currentEmail,
      userGuess: isPhishingGuess ? 'Phishing' : 'Legitimate'
    })
    setShowFeedback(true)
  }

  const nextEmail = () => {
    setShowFeedback(false)
    loadNewEmail()
  }

  const resetGame = () => {
    setGameState('menu')
    setShowFeedback(false)
  }

  if (gameState === 'menu') {
    return (
      <div className="app">
        <div className="menu-container">
          <div className="menu-card">
            <h1>🔍 Phishing Email Detective</h1>
            <p className="menu-description">
              Test your cybersecurity skills! Can you spot the difference between legitimate emails and phishing attempts?
            </p>

            <div className="menu-stats">
              <div className="stat-item">
                <span className="stat-icon">📧</span>
                <span>Identify phishing emails</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🛡️</span>
                <span>Learn security best practices</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🏆</span>
                <span>Earn points and level up</span>
              </div>
            </div>

            <button className="start-button" onClick={startGame}>
              Start Training
            </button>

            <div className="menu-tips">
              <h3>💡 Tips for Success:</h3>
              <ul>
                <li>Check the sender's email address carefully</li>
                <li>Look for urgent language or threats</li>
                <li>Hover over links before clicking</li>
                <li>Legitimate companies won't ask for sensitive info via email</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <GameStats
        score={score}
        level={level}
        streak={streak}
        totalQuestions={totalQuestions}
        correctAnswers={correctAnswers}
        onReset={resetGame}
      />

      <div className="game-container">
        {currentEmail && (
          <EmailDisplay
            email={currentEmail}
            onDecision={handleEmailDecision}
          />
        )}
      </div>

      {showFeedback && feedbackData && (
        <FeedbackModal
          feedbackData={feedbackData}
          onNext={nextEmail}
          streak={streak}
        />
      )}
    </div>
  )
}

export default App
