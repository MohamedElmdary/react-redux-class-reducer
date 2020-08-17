import { Middleware } from 'redux'
import { Type, Obj } from './constants'

function createReactReduxClassReducerMiddleware<T>(args: T = Obj): Middleware {
  return ({ dispatch, getState }) => (next) => (action) => {
    console.log('action', action)

    if (typeof action[Type] === 'string') {
      if (typeof action.type === 'string') {
        if (typeof action.reduce === 'function') {
          if (action.async === true) {
            return action.reduce(dispatch, getState())
          }
          return next({
            ...action,
            reduce: action.reduce,
            args,
            dispatch
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

    return next(action)
  }
}

export { createReactReduxClassReducerMiddleware }
