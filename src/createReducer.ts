import { Action } from './types'
import { Type } from './constants'

function createReducer<T>(prefix: string, initState: T) {
  return (state = initState, action: Action<T>) => {
    if (action[Type] === prefix) {
      const result = action.reduce(state, action.dispatch, action.args)

      if (result) {
        return result
      }
    }

    return state
  }
}

export { createReducer }
