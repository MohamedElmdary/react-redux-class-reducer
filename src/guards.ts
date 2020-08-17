export interface ObjPayload {
  prefix: string
  type: string
}

export function isStr(str: any): str is string {
  return typeof str === 'string'
}

export function isUndefined(undef: any): undef is undefined {
  return typeof undef === 'undefined'
}

export function isObj(obj: any): obj is ObjPayload {
  return typeof obj === 'object' && !Array.isArray(obj)
}

export function isTuple(arr: any): arr is [string, string] {
  if (Array.isArray(arr)) {
    return isStr(arr[0]) && isStr(arr[1])
  }
  return false
}
