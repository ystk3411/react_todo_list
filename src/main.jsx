import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router basename="/react_todo_list">
      <App />
    </Router>
  </StrictMode>,
)
