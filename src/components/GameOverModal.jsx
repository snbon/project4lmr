import useQuizStore from '../store/quizStore'
import '../css/Modal.css'

const GameOverModal = () => {
  const { restartGame } = useQuizStore()

  return (
    <div className="game-overview-overlay">
      <div className="game-overview-modal" onClick={(e) => e.stopPropagation()}>
        <h1 className="modal-title">Game Over</h1>
        
        <div className="result-message">
          Je hebt de quiz niet binnen de gegeven tijd afgewerkt.
        </div>

        <div className="continue-button-container">
          <button 
            className="continue-button"
            onClick={restartGame}
          >
            Probeer opnieuw
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOverModal
