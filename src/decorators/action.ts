import { ConstructorReturn, Options } from '../types'; 
import { isBoolean, isObject, isString, isUndefined } from '../guards'
import { updateConstructor } from '../utils';

function Action(prefix: string, type: string, async?: boolean): ConstructorReturn;
function Action(prefix: {prefix: string, type: string, async?: boolean}, type?: undefined, async?: undefined): ConstructorReturn;
function Action(prefix: string, type: Options, async?: undefined): ConstructorReturn;
function Action(prefix: string, type?: undefined, async?: undefined): ((type: Options | string, async?: boolean | undefined) => ConstructorReturn);
// function Action(prefix: string, type?: undefined, async?: undefined): ((type: Options, async?: undefined) => ConstructorReturn);
function Action(prefix: any, type: any, async: any): any {
  
    if (
      isObject(prefix) &&
      isString(prefix.prefix) &&
      isString(prefix.type)
    ) {
      const { type, async } = prefix;
      return updateConstructor(prefix.prefix, type, isBoolean(async) ? async : false);
    }

    if (!isString(prefix)) {
      throw new Error('value `' + prefix + '` is not assignable to type `String` prefix.');
    }

    if (isString(type)) {
      return updateConstructor(prefix, type, isBoolean(async) ? async : false);
    }

    if (
      isObject(type) &&
      isString(type.type) &&
      isUndefined(async)
    ) {
      const { async } = type;
      return updateConstructor(prefix, type.type, isBoolean(async) ? async : false);
    }

    if (
      isUndefined(type) &&
      isUndefined(async)
    ) {
      return (type: Options | string, async?: boolean | undefined) => {
        if (isString(type)) {
          return updateConstructor(prefix, type, isBoolean(async) ? async : false);
        }

        if (
          isObject(type) &&
          isString(type.type)
        ) {
          const { async } = type;
          return updateConstructor(prefix, type.type, isBoolean(async) ? async : false);
        }

        throw new Error('value `' + type + '` is not assignable to type `String` type.');
      }
    }

    throw new Error('Invalid overload for Action Decorator');
}

export { Action }
