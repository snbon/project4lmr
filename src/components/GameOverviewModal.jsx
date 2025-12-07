import useQuizStore from '../store/quizStore'
import '../css/Modal.css'
import CloseIcon from '@mui/icons-material/Close'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { formatTimeDetailed } from '../utils/timeUtils'

const GameOverviewModal = () => {
  const { 
    totalTimeRemaining, 
    questions, 
    answerResults,
    closeGameOverview,
    restartGame
  } = useQuizStore()

    // Score uitrekenen en omzetten tot percentage
  const totalQuestions = questions.length || 0
  const correctAnswers = answerResults.filter(result => result === true).length
  const percentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0

  // Op basis van de percentage gaan we een bericht weergeven op de gameoverview modal.
  const getResultMessage = () => {
    if (percentage >= 90) {
      return "Proficiat!"
    } else if (percentage >= 50) {
      return "Proficiat! Maar er is nog ruimte voor verbetering!"
    } else {
      return "Oei... Je bent niet geslaagd. Maar je kunt opnieuw proberen!"
    }
  }

  return (
    <div className="game-overview-overlay" onClick={closeGameOverview}>
      <div className="game-overview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeGameOverview}>
          <CloseIcon />
        </button>
        <h1 className="modal-title">Het Speloverzicht</h1>

        <div className="result-message">
          {getResultMessage()}
        </div>

        {/* Resultaat */}
        <div className="summary-row">
          <div className="summary-item">
            <span className="summary-label">Resterende tijd:</span>
            <span className="summary-value">{formatTimeDetailed(totalTimeRemaining)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">resultaat:</span>
            <span className="summary-value">{correctAnswers}/{totalQuestions}</span>
          </div>
        </div>

        <div className="trophy-section">
          <EmojiEventsIcon className="trophy-large" />
        </div>

        <div className="info-section">
          <h2 className="section-title">Hoe kan je het spel winnen?</h2>
          <p className="section-text">
            Kansstad wil prijzen winnen en "future proof" worden. 
            De jury is streng en ongeduldig. Je hebt een beperkte tijd om alle vragen 
            correct te beantwoorden. Wees snel en accuraat!
          </p>
        </div>

        <div className="info-section">
          <h2 className="section-title">Spelvoortgang</h2>
          <p className="section-text">
            Je kunt je spelvoortgang bekijken door op het klokpictogram linksboven 
            op het scherm te klikken. Dit opent het Speloverzicht waar je de resterende 
            tijd, kansen en prestaties kunt zien.
          </p>
        </div>

        {/* "Probeer opnieuw" enkel weergeven wanneer user onder 50% scoort */}
        {percentage < 50 && (
          <div className="continue-button-container">
            <button 
              className="continue-button"
              onClick={restartGame}
            >
              Probeer opnieuw
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameOverviewModal
