import useQuizStore from '../store/quizStore'
import '../css/StartPage.css'

const StartPage = () => {
  // sla op in store dat quiz gestart is
  const startQuiz = useQuizStore((state) => state.startQuiz)

  return (
    <div className="start-page-container">
      <div className="start-page-content">
        <h1 className="start-page-title">Hoi! Welkom bij de quiz!</h1>
        <button 
          className="start-quiz-button"
          onClick={startQuiz}
        >
          Start Quiz
        </button>
        <div className="link-buttons-container">
          <a 
            href="https://github.com/snbon/project4lmr" 
            target="_blank"
            rel="noopener noreferrer"
            className="link-button"
          >
            Codebase
          </a>
          <a 
            href="/assets/plan-van-aanpak.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-button"
          >
            Plan van Aanpak
          </a>
        </div>
      </div>
    </div>
  )
}

export default StartPage
