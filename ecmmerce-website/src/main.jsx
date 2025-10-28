import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import ContextCart from './components/ContextCart.jsx'


createRoot(document.getElementById('root')).render(
  <ContextCart>
    <App />
  </ContextCart>,
)
