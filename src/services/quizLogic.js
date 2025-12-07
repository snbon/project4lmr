// Logic voor de timer 
export const createQuestionTimer = (getState, setState) => {
  // Indien van toepassing -> Oude timer opruimen
  const { timerInterval } = getState()
  if (timerInterval) {
    clearInterval(timerInterval)
    setState({ timerInterval: null })
  }

  // Elke seconde - 1 
  const interval = setInterval(() => {
    const { timeRemaining, isAnswered, questions, currentQuestionIndex, answerResults } = getState()
    
    if (timeRemaining > 0) {
      setState({ timeRemaining: timeRemaining - 1 })
    } else {
      // Tijd is op
      clearInterval(interval)
      setState({ timerInterval: null })

      // Als gebruiker niets invult -> vraag fout
      if (!isAnswered) {
        const newResults = [...answerResults]
        newResults[currentQuestionIndex] = false
        setState({ 
          isAnswered: true, 
          timerExpired: true,
          answerResults: newResults
        })
      }
    }
  }, 1000)

  return interval
}

// Logic voor totalQuiz timer
export const createTotalTimer = (getState, setState) => {
  // Indien van toepassing -> Oude timer opruimen
  const { totalTimerInterval } = getState()
  if (totalTimerInterval) {
    clearInterval(totalTimerInterval)
    setState({ totalTimerInterval: null })
  }

  const interval = setInterval(() => {
    const { totalTimeRemaining } = getState()
    
    if (totalTimeRemaining > 0) {
      setState({ totalTimeRemaining: totalTimeRemaining - 1 })
    } else {
      // tijd is op -> game over, en stop ook de vraag timer
      clearInterval(interval)
      const { timerInterval } = getState()
      if (timerInterval) clearInterval(timerInterval)

      setState({ 
        totalTimerInterval: null,
        timerInterval: null,
        isGameOver: true 
      })
    }
  }, 1000)

  return interval
}

// Multiple choice selection 
export const toggleAnswerSelection = (answerIndex, getState, setState) => {
  const { selectedAnswers, isAnswered } = getState()
  
  if (isAnswered) return

  // geselecteerd of niet geselecteerd
  const index = selectedAnswers.indexOf(answerIndex)
  if (index > -1) {
    setState({ selectedAnswers: selectedAnswers.filter(i => i !== answerIndex) })
  } else {
    setState({ selectedAnswers: [...selectedAnswers, answerIndex] })
  }
}

// De selectie antwoorden valideren wanneer "klaar"
export const submitCurrentAnswer = (getState, setState) => {
  const { selectedAnswers, questions, currentQuestionIndex, answerResults } = getState()
  const currentQuestion = questions[currentQuestionIndex]
  
  // Kijken welke correcte antwoorden zijn
  const correctAnswerIndices = currentQuestion.answers
    .map((answer, index) => answer.correct ? index : -1)
    .filter(index => index !== -1)
  
  // Antwoord is juist wanneer AL jouw gekozen antwoorden ook in lijst matchen met correcte antwoorden.
  const isCorrect = 
    selectedAnswers.length === correctAnswerIndices.length &&
    selectedAnswers.every(index => correctAnswerIndices.includes(index))
  
  // Opslaan in store
  const newResults = [...answerResults]
  newResults[currentQuestionIndex] = isCorrect
  setState({ 
    isAnswered: true, 
    timerExpired: false,
    answerResults: newResults
  })
  
  // Timer stoppen
  const { timerInterval } = getState()
  if (timerInterval) {
    clearInterval(timerInterval)
    setState({ timerInterval: null })
  }
}

// Naar de volgende vraag
export const moveToNextQuestion = (getState, setState, startTimer) => {
  const { currentQuestionIndex, questions, timerInterval } = getState()
  
  // Stop huidige vraag timer
  if (timerInterval) {
    clearInterval(timerInterval)
  }

  const nextIndex = currentQuestionIndex + 1
  
  // als er nog vragen zijn, resetten we alles voor volgende level
  if (nextIndex < questions.length) {
    const nextQuestion = questions[nextIndex]
    
    setState({
      currentQuestionIndex: nextIndex,
      selectedAnswers: [],
      isAnswered: false,
      timerExpired: false,
      timeRemaining: nextQuestion?.time_limit_s || 0,
      timerInterval: null
    })
    
    // Start voor nieuwe vraag
    startTimer()
  } else {
    // Zo niet, quiz is klaar
    setState({ timerInterval: null })
  }
}

// Alle timers stoppen, zeker voor resetgame. 
export const cleanupTimers = (getState, setState) => {
  const { timerInterval, totalTimerInterval } = getState()
  
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  if (totalTimerInterval) {
    clearInterval(totalTimerInterval)
  }
  
  setState({ timerInterval: null, totalTimerInterval: null })
}
