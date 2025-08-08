
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { AppProvider } from './context/ContextApp.jsx'
createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
  <AppProvider>
   <App />
   </AppProvider>
   </BrowserRouter>

)
