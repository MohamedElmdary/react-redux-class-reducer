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
