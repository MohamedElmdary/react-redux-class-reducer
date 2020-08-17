import { Type } from '../constants'

function updateConstructor(prefix: string, type: string, async: boolean) {
  return <T extends { new (...args: any[]): {} }>(Constructor: T) => {
    Constructor.prototype[Type] = prefix
    Constructor.prototype.$$type = type
    Constructor.prototype.$$async = async
  }
}

export { updateConstructor }
