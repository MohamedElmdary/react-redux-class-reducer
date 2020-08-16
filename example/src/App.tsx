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
