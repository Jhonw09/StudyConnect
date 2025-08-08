import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../style.css'
import '../mobile-responsive.css'
import '../universal-responsive.css'
import '../device-specific.css'
import '../desktop-fix.css'
import '../quiz-styles-addon.css'
import '../typing-game.css'
import '../chatbot.css'
import '../faq-layout.css'
import '../course-fix.css'
import '../teacher-fix.css'
import '../scroll-progress.css'
import '../background-lines.css'
import '../avatar-fix.css'
import '../dropdown-center.css'
import '../profile-modals-styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
