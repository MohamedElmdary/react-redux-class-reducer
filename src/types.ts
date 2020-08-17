import { Dispatch } from 'react'

import { Type } from './constants'
import { updateConstructor } from './utils'

interface Action<T = any, R = any> {
  [Type]: string
  type: string
  args: R
  dispatch: Dispatch<any>
  reduce(state: T, args: R): T
  reduce(state: T, dispatch: Dispatch<any>, args: R): T
}

type ConstructorReturn = ReturnType<typeof updateConstructor>

interface Options {
  type: string
  async?: boolean
}

export { Action, ConstructorReturn, Options }
