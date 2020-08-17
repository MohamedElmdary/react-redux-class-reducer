import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CounterState,
  Increment,
  Decrement,
  AsyncIncrement
} from './store/counter'

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
        <button onClick={() => dispatch(new AsyncIncrement())}>
          async increment
        </button>
        <button onClick={() => dispatch(new Increment(5))}>
          increment by 5
        </button>
        <button onClick={() => dispatch(new Decrement())}>
          decrement by 1
        </button>
      </div>
    </div>
  )
}

export default App
