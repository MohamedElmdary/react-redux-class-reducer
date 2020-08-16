# react-redux-class-reducer

> A redux middleware to replace the regular reduer with a class based one removing some of the boilerplate code.

[![NPM](https://img.shields.io/npm/v/react-redux-class-reducer.svg)](https://www.npmjs.com/package/react-redux-class-reducer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-redux-class-reducer
```

## Usage

```tsx
// index.tsx
import React from 'react'
import { createStore } from 'redux'
import { COUNTER, initState } from './store'
// COUNTER = '[COUNTER]';
// initState = {value: 0};

// lib
import {
  createReducer,
  createReactReduxClassReducerMiddleware
} from 'react-redux-class-reducer'

const reactReduxClassReducerMiddleware =
  /* pass what ever you want as extraArgs */
  createReactReduxClassReducerMiddleware({ min: 0 })

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
```

```tsx
// actions.ts
import { Type } from 'react-redux-class-reducer'

export const COUNTER = '[COUNTER]'
export interface CounterState {
  value: number
}
export const initState: CounterState = { value: 0 }

export class IncrementCounter {
  [Type] = COUNTER
  type = 'INCREMENT_COUNTER'

  constructor(public by: number = 1) {}

  reduce(state: CounterState): CounterState {
    return { ...state, value: state.value + this.by }
  }
}

export class DecrementCounter {
  [Type] = COUNTER
  type = 'DECREMENT_COUNTER'

  reduce(
    state: CounterState,
    { deafultBy }: { deafultBy: number }
  ): CounterState {
    return { ...state, value: state.value - deafultBy }
  }
}
```

```tsx
// app.tsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CounterState,
  IncrementCounter,
  DecrementCounter
} from './store/counterActions'

const App = () => {
  const counter = useSelector((s: { counter: CounterState }) => s.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>counter example</h1>
      <div>
        <p>Counter: {counter}</p>
      </div>
      <div>
        <button onClick={() => dispatch(new IncrementCounter(5))}>
          increment by 5
        </button>
        <button onClick={() => dispatch(new DecrementCounter())}>
          decrement by 1
        </button>
      </div>
    </div>
  )
}

export default App
```

## License

MIT © [MohamedElmdary](https://github.com/MohamedElmdary)
