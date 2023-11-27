import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/useAuthContext.tsx'
import { PaymentContextProvider } from './context/usePaymentContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PaymentContextProvider>
          <App />
        </PaymentContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
