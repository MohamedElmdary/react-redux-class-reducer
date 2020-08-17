import { Type } from './constants'
import { Dispatch } from 'react'

interface Action<T = any, R = any> {
  [Type]: string
  type: string
  args: R
  dispatch: Dispatch<any>
  reduce(state: T, dispatch: Dispatch<any>, args: R): T
}

export { Action }
