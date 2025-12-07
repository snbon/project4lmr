import { create } from 'zustand'
import { fetchQuizQuestions } from '../services/quizApi'
import {
  createQuestionTimer,
  createTotalTimer,
  toggleAnswerSelection,
  submitCurrentAnswer,
  moveToNextQuestion,
  cleanupTimers
} from '../services/quizLogic'

const useQuizStore = create((set, get) => ({
  // State om alle data van quiz bij te houden
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: [],
  isAnswered: false,
  isLoading: true,
  quizStarted: false,
  error: null,
  answerResults: [], // Hier houden of elke vraag juist of fout is beantwoord -> boolean array
  
  // State van huidige vraag timer
  timeRemaining: 0,
  timerInterval: null,
  timerExpired: false,
  
  // State van total quiz timer
  totalTimeRemaining: 0,
  totalTimerInterval: null,
  
  // Modal state (pop ups)
  showGameOverview: false,
  isGameOver: false,

  // Functie om state te wijzigen
  fetchQuestions: async () => {
    try {
      set({ isLoading: true, error: null })
      
      const data = await fetchQuizQuestions()
      
      // Tijd instellen van eerste vraag - de tijd_limit_s is een property van API
      const firstQuestionTime = data[0]?.time_limit_s || 0

      // We tellen alle tijden bij elkaar op + 30 seconden extra buffer
      let calculatedTotalTime = 30
      
      for (const question of data) {
        calculatedTotalTime += (question.time_limit_s || 0)
      }

      // Alles opsnaan in de store
      set({ 
        questions: data,
        isLoading: false,
        timeRemaining: firstQuestionTime,
        totalTimeRemaining: calculatedTotalTime,
        timerExpired: false,
        answerResults: []
      })

      // Timers laten lopen
      get().startTimer()
      get().startTotalTimer()
    } catch (error) {
      console.error('Oeps, foutje:', error)
      set({ 
        isLoading: false,
        error: 'Er is een fout opgetreden bij het laden van de vragen. Probeer het opnieuw.'
      })
    }
  },

  // start timer van huidige vraag
  startTimer: () => {
    const interval = createQuestionTimer(get, set)
    set({ timerInterval: interval })
  },

  // Start timer van totalquiztimer
  startTotalTimer: () => {
    const interval = createTotalTimer(get, set)
    set({ totalTimerInterval: interval })
  },

  // User klikt op antwoordknop
  toggleAnswer: (answerIndex) => {
    toggleAnswerSelection(answerIndex, get, set)
  },

  // User gaat naar volgende vraag
  submitAnswer: () => {
    submitCurrentAnswer(get, set)
  },

  // functie voor volgende vraag
  nextQuestion: () => {
    const { currentQuestionIndex, questions, isAnswered } = get()

    // nakijken of het laatste vraag was
    const isLastQuestion = currentQuestionIndex === questions.length - 1
    
    if (isLastQuestion && isAnswered) {
      // Zo ja, dan tonen we popup van GameOverview en stop de timers
      set({ showGameOverview: true })
      cleanupTimers(get, set)
    } else {
      // Zo niet, ga naar volgende vraag en timer van de vraag herstarten
      moveToNextQuestion(get, set, () => get().startTimer())
    }
  },
  
  closeGameOverview: () => {
    set({ showGameOverview: false })
  },
  
  // Voor StartPage
  startQuiz: () => {
    set({ quizStarted: true })
    get().fetchQuestions()
  },

  // Alles terug naar het begin voor opnieuw te starten
  restartGame: () => {
    cleanupTimers(get, set)
    set({ 
      showGameOverview: false, 
      isGameOver: false,
      currentQuestionIndex: 0,
      selectedAnswers: [],
      isAnswered: false,
      answerResults: [],
      quizStarted: false,
      error: null
    })
  }
}))

export default useQuizStore
