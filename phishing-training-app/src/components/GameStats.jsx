import './GameStats.css'

const GameStats = ({ score, level, streak, totalQuestions, correctAnswers, onReset }) => {
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0

  return (
    <div className="game-stats">
      <div className="stats-header">
        <h2>🔍 Phishing Detective Training</h2>
        <button className="reset-btn" onClick={onReset}>
          🏠 Home
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card score-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">{score}</div>
            <div className="stat-label">Score</div>
          </div>
        </div>

        <div className="stat-card level-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-value">{level}</div>
            <div className="stat-label">Level</div>
          </div>
        </div>

        <div className="stat-card streak-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-value">{streak}</div>
            <div className="stat-label">Streak</div>
          </div>
        </div>

        <div className="stat-card accuracy-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{accuracy}%</div>
            <div className="stat-label">Accuracy</div>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-info">
          <span>Questions: {totalQuestions}</span>
          <span>Correct: {correctAnswers}</span>
        </div>

        {streak > 0 && (
          <div className="streak-celebration">
            🔥 {streak} in a row! Keep it up!
          </div>
        )}

        {streak >= 5 && (
          <div className="achievement-badge">
            🌟 Achievement Unlocked: Streak Master!
          </div>
        )}

        {accuracy >= 80 && totalQuestions >= 5 && (
          <div className="achievement-badge">
            🛡️ Achievement Unlocked: Security Expert!
          </div>
        )}
      </div>
    </div>
  )
}

export default GameStats