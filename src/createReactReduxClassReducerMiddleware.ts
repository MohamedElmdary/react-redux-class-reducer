import { Middleware } from 'redux'

import { Type, Obj } from './constants'
import { isString } from './guards'

function createReactReduxClassReducerMiddleware<T>(args: T = Obj): Middleware {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (isString(action[Type])) {
      if (isString(action.type)) {
        if (typeof action.reduce === 'function') {
          if (action.async === true) {
            return action.reduce(dispatch, getState(), args)
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
