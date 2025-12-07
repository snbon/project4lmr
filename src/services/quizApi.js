// Meegegeven API URL om dynamisch te vragen en antwoorden in te laden
const QUIZ_API_URL = 'https://lab.lfwd.be/dev-test/quiz_data.json'

export const fetchQuizQuestions = async () => {
  try {
    const response = await fetch(QUIZ_API_URL)

    // Nakijken of link werkt -> status 200
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Zo ja, de JSON van API-link ophalen
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching questions:', error)
    throw error
  }
}

