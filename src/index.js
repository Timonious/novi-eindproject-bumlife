import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {DrunkModeContextProvider} from "./context/DrunkModeContextProvider"
import {InlogContextProvider} from "./context/InlogContextProvider";

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <DrunkModeContextProvider>
              <InlogContextProvider>
                  <App />
              </InlogContextProvider>
          </DrunkModeContextProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
