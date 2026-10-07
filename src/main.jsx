import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
// import { supabase } from './lib/supabase'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,

//   supabase.auth.getSession().then(({ data, error }) => {
//   console.log('Connected. Session:', data)
//   console.log('Error:', error)
// })
)
