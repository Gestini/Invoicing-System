import App from './App'
import React from 'react'
import store from './store'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import './styles/main.scss'
import './styles/theme.scss'
import './styles/webkit.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </NextUIProvider>
  </React.StrictMode>,
)
