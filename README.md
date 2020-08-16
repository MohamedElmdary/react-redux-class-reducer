# react-redux-class-reducer

> A redux middleware to replace the regular reduer with a class based one removing some of the boilerplate code.

[![NPM](https://img.shields.io/npm/v/react-redux-class-reducer.svg)](https://www.npmjs.com/package/react-redux-class-reducer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
$ npm install --save react-redux-class-reducer
```

## Usage

```tsx
import {
  createReducer,
  createReactReduxClassReducerMiddleware
} from 'react-redux-class-reducer'
// ...

// create middleware
const reactReduxClassReducerMiddleware =
  /* pass what ever you want as extraArgs */
  createReactReduxClassReducerMiddleware({ defaultBy: 0 })

// create counter reducer
const counterReducer =
  // pass what ever prefix you would like e.g '@Counter'
  createReducer('[COUNTER]', { value: 0 })

// create redux store
const store = createStore(
  combineReducers({
    // passing the reducer
    counter: counterReducer
  }),
  // applying the middleware
  applyMiddleware(reactReduxClassReducerMiddleware)
)

ReactDOM.render(
  // passing the redux store as normal
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

```tsx
// actions.ts
import { Type } from 'react-redux-class-reducer'

export class IncrementCounter {
  // very important [Type] = Prefix
  [Type] = '[COUNTER]'
  type = 'INCREMENT_COUNTER'

  // you can pass any require data in constructor (ts features)
  constructor(public by: number = 1) {}

  // reduce fn take state, extraArgs => state
  reduce(state: CounterState): CounterState {
    // use this to access the action values
    return { ...state, value: state.value + this.by }
  }
}

export class DecrementCounter {
  [Type] = COUNTER
  type = 'DECREMENT_COUNTER'

  reduce(
    state: CounterState,
    // access deafultArgs
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

  /* dispatching actions */

  return (
    <div>
      <h1>counter example</h1>
      <div>
        <p>Counter: {counter}</p>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(new IncrementCounter(5))
          }}
        >
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
