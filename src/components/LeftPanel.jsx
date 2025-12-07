import useQuizStore from '../store/quizStore'
import avatarImage from '../assets/Leidinggevenden-illustraties.png'
import backgroundImage from '../assets/Rectangle 85.png'
import '../css/LeftPanel.css'
import TimerIcon from '@mui/icons-material/Timer'
import HelpIcon from '@mui/icons-material/Help'
import RefreshIcon from '@mui/icons-material/Refresh'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import MapIcon from '@mui/icons-material/Map'
import { formatTime } from '../utils/timeUtils'

const LeftPanel = () => {
  const { 
    currentQuestionIndex, 
    questions,
    totalTimeRemaining,
    restartGame
  } = useQuizStore()
  
  const totalQuestions = questions.length || 0
  
  // Function voor progressbar. Vermijden dat we delen door 0. 
  const progress = totalQuestions > 0 
    ? ((currentQuestionIndex + 1) / totalQuestions) * 100 
    : 0

  return (
    <div className="left-panel">
      {/* Balkje voor timer en progressbar */}
      <div className="left-panel-header">
        <div className="timer-container">
          <TimerIcon className="timer-icon" />
          <span className="timer-text">{formatTime(totalTimeRemaining)}</span>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            {/* Invullen van progressbar is dynamisch afhankelijk van % */}
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="level-text">
          Level {currentQuestionIndex + 1} / {totalQuestions || 8}
        </div>
      </div>

      {/* Informatie omtrent vak - voorlopig hardcoded */}
      <div className="info-card">
        <div 
          className="card-image-header" 
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="avatar-wrapper">
            <img 
              src={avatarImage} 
              alt="Avatar" 
              className="avatar-image" 
            />
          </div>
        </div>
        
        <div className="card-content">
          <h1 className="title">Drukkerij</h1>
          <p className="description">
            Je moet je goed bewust zijn van wat jij allemaal moet doen. 
            Als drukafwerker heb je een heel uiteenlopend takenpakket. 
            Sommige van onderstaande taken behoren echter niet tot het takenpakket, 
            stop er snel mee voor je baas het ziet!
          </p>
        </div>
      </div>

      {/* Icons disabled behalve RESET */}
      <div className="left-panel-footer">
        <button className="icon-button" disabled title="Help">
          <HelpIcon />
        </button>
        <button 
          className="icon-button" 
          onClick={restartGame}
          title="Reset"
        >
          <RefreshIcon />
        </button>
        <button className="icon-button" disabled title="Cut">
          <ContentCutIcon />
        </button>
        <button className="map-button" disabled>
          <MapIcon className="map-icon" />
          <span>Naar de kaart</span>
        </button>
      </div>
    </div>
  )
}

export default LeftPanel
