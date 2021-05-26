import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {DrunkModeContextProvider} from "./context/DrunkModeContextProvider";

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <DrunkModeContextProvider>
              <App />
          </DrunkModeContextProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
