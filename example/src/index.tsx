import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { COUNTER, initState } from './store/counterActions'

// lib
import {
  createReducer,
  createReactReduxClassReducerMiddleware
} from 'react-redux-class-reducer'

const reactReduxClassReducerMiddleware = createReactReduxClassReducerMiddleware(
  { deafultBy: 7 }
)
const store = createStore(
  combineReducers({
    counter: createReducer(COUNTER, initState)
  }),
  applyMiddleware(reactReduxClassReducerMiddleware)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
