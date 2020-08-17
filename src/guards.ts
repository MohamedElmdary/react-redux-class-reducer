export function isBoolean(bool: any): bool is boolean {
  return typeof bool === 'boolean'
}

export function isObject(obj: any): obj is Object {
  return !Array.isArray(obj) && typeof obj === 'object'
}

export function isString(str: any): str is string {
  return typeof str === 'string'
}

export function isUndefined(undef: any): undef is undefined {
  return typeof undef === 'undefined'
}
