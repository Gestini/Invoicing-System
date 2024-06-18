import './assets/main.css'
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </NextUIProvider>
  </React.StrictMode>
)
