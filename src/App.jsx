import useQuizStore from './store/quizStore'
import QuizPage from './components/QuizPage'
import StartPage from './components/StartPage'

function App() {
  // State in store van start quiz 
  const quizStarted = useQuizStore((state) => state.quizStarted)

  return (
    <div className="app">
    {/* Indien de quiz niet begonnen is, toon startpagina */}
      {!quizStarted ? <StartPage /> : <QuizPage />}
    </div>
  )
}

export default App

