import { Type } from './constants'
// import { isStr, isObj } from './guards'

function updateConstructor(prefix: string, type: string, async: boolean) {
  return <T extends { new (...args: any[]): {} }>(Constructor: T) => {
    return class extends Constructor {
      [Type]: string = prefix
      type: string = type
      async: boolean = async
    }
  }
}

type ConstructorReturn = ReturnType<typeof updateConstructor>
// type Return = (options: { type: string; async?: boolean }) => ConstructorReturn

function Action(options: {
  prefix: string
  type: string
  async?: boolean
}): ConstructorReturn {
  return updateConstructor(options.prefix, options.type, options.async || false)
}

// function Action(payload: string, type: string, async?: boolean): Return
// function Action(
//   payload: [string, string, boolean],
//   type?: undefined,
//   async?: undefined
// ): Return
// function Action(payload: ObjPayload, type?: undefined, async?: boolean): Return
// function Action(
//   payload: string,
//   type?: undefined,
//   async?: undefined
// ): (type: string, async?: undefined) => (async: boolean) => Return

// function Action(payload: any, type: any, async: any) {
//   if (isStr(payload) && isStr(type) && isBoolean(async)) {
//     return updateConstructor(payload, type, async)
//   }

//   if (isTuple(payload) && isUndefined(type)) {
//     return updateConstructor(payload[0], payload[1], payload[2])
//   }

//   if (
//     isObj(payload) &&
//     isStr(payload.prefix) &&
//     isStr(payload.type) &&
//     isBoolean(payload.async) &&
//     isUndefined(type)
//   ) {
//     return updateConstructor(payload.prefix, payload.type, payload.async)
//   }

//   if (isStr(payload) && isUndefined(type)) {
//     return (type: string, async?: boolean) => {
//       if (!isStr(type)) {
//         throw new Error(`parameter type is not assignable to value '${type}'`)
//       }

//       if (isBoolean(async)) {
//         return updateConstructor(payload, type, async)
//       }
//       return (async: boolean = false) => {
//         return updateConstructor(payload, type, !!async)
//       }
//     }
//   }

//   throw new Error(`unknown parameters payload: '${payload}' | type: '${type}'`)
// }

export { Action }
