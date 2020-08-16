import { Type } from './constants'

interface Action<T = any> {
  [Type]: string
  type: string
  reduce(state: T): T
}

export { Action }
