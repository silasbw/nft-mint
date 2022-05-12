import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './firebase'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { darkModeTheme } from './theme'


ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkModeTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
