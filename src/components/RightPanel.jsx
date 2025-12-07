import { useMemo, useCallback } from 'react'
import useQuizStore from '../store/quizStore'
import '../css/RightPanel.css'
import TimerIcon from '@mui/icons-material/Timer'
import GameOverviewModal from './GameOverviewModal'
import { formatTime } from '../utils/timeUtils'

const RightPanel = ({ question }) => {
  const {
    selectedAnswers,
    isAnswered,
    timeRemaining,
    timerExpired,
    toggleAnswer,
    submitAnswer,
    nextQuestion,
    questions,
    currentQuestionIndex,
    showGameOverview
  } = useQuizStore()

  // Nakijken of we aan laatste vraag zitten 
  const hasMoreQuestions = useMemo(
    () => currentQuestionIndex < questions.length - 1,
    [currentQuestionIndex, questions.length]
  )

  // Continuebutton is dynamisch voor laatste-vraag geval. 
  const continueButtonText = useMemo(
    () => hasMoreQuestions ? 'Doorgaan' : 'Voltooien',
    [hasMoreQuestions]
  )

  // Hier bepalen we de kleur van antwoordbuttons 
  // Voor alle cases zoals selected correct of select incorrect etc. 
  const getAnswerClassName = useCallback((index, answer) => {
    const classes = ['answer-button']
    const wasSelected = selectedAnswers.includes(index)
    
    if (isAnswered) {
      // als user antwoord , tonen we correcte antwoorden met volgende cases
      if (answer.correct) {
        classes.push('correct')
        if (wasSelected) {
          classes.push('correct-selected')
        } else {
          // Correct answer that was not selected gets red border
          classes.push('correct-not-selected')
        }
      } else if (wasSelected) {
        classes.push('incorrect')
      }
    } else if (wasSelected) {
      classes.push('selected')
    }
    
    return classes.join(' ')
  }, [selectedAnswers, isAnswered])

  return (
    <>
      <div className="right-panel">
        <div className="right-panel-header">
        {/* Als de tijd op is van een vraag, krijgt de timer red borders. */}
          <div className={`question-timer ${timerExpired ? 'expired' : ''}`}>
            <TimerIcon className="timer-icon" />
            <span className="timer-text">{formatTime(timeRemaining)}</span>
          </div>
        </div>

        <div className="right-panel-content">
          <h2 className="question-text">{question.question}</h2>
          
          {/* Loopen van alle antwoorden in buttons dynamisch */}
          <div className="answers-grid">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                className={getAnswerClassName(index, answer)}
                onClick={() => !isAnswered && toggleAnswer(index)}
                disabled={isAnswered}
                aria-pressed={selectedAnswers.includes(index)}
              >
                {answer.answer}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons om naar volgende te gaan, tip is disbaled */}
        <div className="right-panel-footer">
          {!isAnswered ? (
            <button
              className="submit-button"
              onClick={submitAnswer}
              disabled={selectedAnswers.length === 0}
            >
              Klaar!
            </button>
          ) : (
            <button
              className="continue-button"
              onClick={nextQuestion}
            >
              {continueButtonText}
            </button>
          )}
          
          <button className="tip-button" disabled>
            Geef me een tip...
          </button>
        </div>
      </div>

      {showGameOverview && <GameOverviewModal />}
    </>
  )
}

export default RightPanel
