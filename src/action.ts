import { Type } from './constants'
import { isStr, isTuple, isUndefined, isObj, ObjPayload } from './guards'

function updateConstructor(prefix: string, type: string) {
  return <T extends { new (...args: any[]): {} }>(Constructor: T) => {
    return class extends Constructor {
      [Type]: string = prefix
      type: string = type
    }
  }
}

type Return = ReturnType<typeof updateConstructor>

function Action(payload: string, type: string): Return
function Action(payload: [string, string], type?: undefined): Return
function Action(payload: ObjPayload, type?: undefined): Return
function Action(payload: string, type?: undefined): (type: string) => Return
function Action(payload: any, type: any) {
  if (isStr(payload) && isStr(type)) {
    return updateConstructor(payload, type)
  }

  if (isTuple(payload) && isUndefined(type)) {
    return updateConstructor(payload[0], payload[1])
  }

  if (
    isObj(payload) &&
    isStr(payload.prefix) &&
    isStr(payload.type) &&
    isUndefined(type)
  ) {
    return updateConstructor(payload.prefix, payload.type)
  }

  if (isStr(payload) && isUndefined(type)) {
    return (type: string) => {
      if (isStr(type)) {
        return updateConstructor(payload, type)
      }

      throw new Error(`parameter type is not assignable to value '${type}'`)
    }
  }

  throw new Error(`unknown parameters payload: '${payload}' | type: '${type}'`)
}

export { Action }
