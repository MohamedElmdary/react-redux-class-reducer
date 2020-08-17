import { Action } from 'react-redux-class-reducer'

export interface CounterState {
  value: number
}
export const initState: CounterState = { value: 0 }

const Counter = Action('counter')

@Counter('INCREMENT')
export class Increment {
  constructor(public by: number = 1) {}

  reduce(state: CounterState): CounterState {
    return { ...state, value: state.value + this.by }
  }
}

@Counter('DECREMENT')
export class Decrement {
  reduce(
    state: CounterState,
    { deafultBy }: { deafultBy: number }
  ): CounterState {
    return { ...state, value: state.value - deafultBy }
  }
}
