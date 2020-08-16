import { Middleware } from 'redux'
import { Type, Obj } from './constants'

function createReactReduxClassReducerMiddleware<T>(args: T = Obj): Middleware {
  return (_) => (dispatch) => (action) => {
    if (typeof action[Type] === 'string') {
      if (typeof action.type === 'string') {
        if (typeof action.reduce === 'function') {
          return dispatch({
            ...action,
            reduce: action.reduce,
            args
          })
        } else {
          throw new Error(
            `Action with type ${action.type} missing \`reduce\` Fuction.`
          )
        }
      } else {
        throw new Error(
          `Action with Symbol ${action[Type]} missing \`type\` property.`
        )
      }
    }

    return dispatch(action)
  }
}

export { createReactReduxClassReducerMiddleware }
