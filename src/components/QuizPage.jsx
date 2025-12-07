import useQuizStore from '../store/quizStore'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import GameOverModal from './GameOverModal'
import '../css/QuizPage.css'

const QuizPage = () => {
  // Nodige info ophalen van onze store
  const { isLoading, questions, currentQuestionIndex, isGameOver, error } = useQuizStore()

  // Loading spinner tot ale vragen binnen zijn.
  if (isLoading) {
    return (
      <div className="quiz-container loading">
        <div className="loading-message">Vragen laden...</div>
      </div>
    )
  }

  // Indien we api issue (ophalen van vragen) tegen komen. 
  if (error) {
    return (
      <div className="quiz-container loading">
        <div className="loading-message" style={{ color: '#f44336' }}>
          {error}
        </div>
      </div>
    )
  }

  // Voor het geval dat API een lege lijst weergeeft. 
  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-container loading">
        <div className="loading-message">Geen vragen beschikbaar</div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="quiz-container">
      <LeftPanel />
      <RightPanel question={currentQuestion} />
      {/* Wanneer timer op 0 staat -> gameover modal */}
      {isGameOver && <GameOverModal />}
    </div>
  )
}

export default QuizPage
