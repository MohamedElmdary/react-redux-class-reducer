import { Type } from '../constants'

function updateConstructor(prefix: string, type: string, async: boolean) {
  return <T extends { new (...args: any[]): {} }>(Constructor: T) => {
    return class extends Constructor {
      [Type]: string = prefix
      type: string = type
      async: boolean = async
    }
  }
}

export { updateConstructor }
