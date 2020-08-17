import { Action } from 'react-redux-class-reducer'
import { Dispatch } from 'react'

export interface CounterState {
  value: number
  loading: boolean
}
export const initState: CounterState = { value: 0, loading: false }

const Counter = Action('counter')

// @Action({
//   prefix: 'counter',
//   type: 'Increment'
// })
@Counter('Increment')
export class Increment {
  constructor(public by: number = 1) {}

  reduce(state: CounterState): CounterState {
    return { ...state, value: state.value + this.by }
  }
}

// @Action({
//   prefix: 'counter',
//   type: 'Decrement'
// })
@Counter('Decrement')
export class Decrement {
  reduce(
    state: CounterState,
    { deafultBy }: { deafultBy: number }
  ): CounterState {
    return { ...state, value: state.value - deafultBy }
  }
}

// @Action({
//   prefix: 'counter',
//   type: 'ASYNC_INCREMENT',
//   async: true
// })
@Counter({
  type: 'ASYNC_INCREMENT',
  async: true
})
export class AsyncIncrement {
  constructor(public ms: number = 1000, public by: number = 1) {}

  reduce(dispatch: Dispatch<any>) {
    // console.log(dispatch(new Increment()))

    dispatch(new SetLoading(true))
    setTimeout(() => {
      dispatch(new SetLoading(false))
      dispatch(new Increment(this.by))
    }, this.ms)
  }
}

@Action({
  prefix: 'counter',
  type: 'SET_LOADING'
})
export class SetLoading {
  constructor(public value: boolean) {}

  reduce(state: CounterState): CounterState {
    return { ...state, loading: this.value }
  }
}
