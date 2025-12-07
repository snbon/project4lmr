import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// startpunt applicatie quiz
createRoot(document.getElementById('root')).render(
  // tijdens dev is strictmode handig -> bugs
  <StrictMode>
    <App />
  </StrictMode>,
)

