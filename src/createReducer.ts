import { Action } from './types'
import { Type } from './constants'

function createReducer<T>(prefix: string, initState: T) {
  return (state = initState, action: Action<T>) => {
    if (action[Type] === prefix) {
      return action.reduce(state)
    }

    return state
  }
}

export { createReducer }
