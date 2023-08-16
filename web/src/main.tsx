import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './context/UserProfile.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider> {/* Envolve a aplicação com o UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>,
)
