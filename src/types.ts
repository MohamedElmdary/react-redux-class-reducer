import { Type } from './constants'

interface Action<T = any, R = any> {
  [Type]: string
  type: string
  args: R
  reduce(state: T, args: R): T
}

export { Action }
