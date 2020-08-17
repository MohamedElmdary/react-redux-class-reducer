# react-redux-class-reducer

> A redux middleware to replace the regular reduer with a class based one removing some of the boilerplate code.

[![NPM](https://img.shields.io/npm/v/react-redux-class-reducer.svg)](https://www.npmjs.com/package/react-redux-class-reducer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
$ npm install --save react-redux-class-reducer
```

## API

---

### createReactReduxClassReducerMiddleware

```ts
 createReactReduxClassReducerMiddleware(extraArgs?): Function
```

**Parameters:**
| NAME | TYPE | REQUIRED | DESCRIPTION |
|:---------:|:----:|:--------:|:-------------------------------------------:|
| extraArgs | any | false | Data will be passed to your reduce function |

### createReducer

```ts
 createReducer(prefix, initState): Function
```

**Parameters:**

|   NAME    |  TYPE  | REQUIRED |                                                 DESCRIPTION                                                 |
| :-------: | :----: | :------: | :---------------------------------------------------------------------------------------------------------: |
|  prefix   | string |   true   | String indicating the name of the reducer used to check whether this reduce should call the action of not\. |
| initState |  any   |   true   |                                        Initial state of that reducer                                        |

### Action

```ts
 Action(prefix, type?, async?): (() => ClassDecorator) | ClassDecorator
```

**Parameters:**
| NAME | TYPE | REQUIRED | DESCRIPTION |
|:------:|:-------------------------------------------------------------:|:--------:|:-------------------------------------------:|
| prefix | string \| \{prefix: string, type: string, async?: boolean\} | true | Data will be passed to your reduce function |
| type | string \| \{ type: string async?: boolean \} \| undefined | false | type of action |
| async | boolean \| undefined | false | if is async action \| deafult: false |

## Usage

```tsx
// actions.ts
import { Action } from 'react-redux-class-reducer'
import { Dispatch } from 'react'

// passing string only return (type) => class Decrator
export const counterPrefix = 'counter'
const Counter = Action('counter')

export interface CounterState {
  value: number
  loading: boolean
}

export const counterInitState: CounterState = {
  value: 0,
  loading: false
}

@Counter('Increment')
export class Increment {
  reduce(state: CounterState): CounterState {
    return { ...state, value: state.value + 1 }
  }
}

@Counter('Decrement')
export class Decrement {
  constructor(public by: number) {}

  reduce(state: CounterState): CounterState {
    return { ...state, value: state.value - this.by }
  }
}

@Counter('Set_Loading')
export class SetLoading {
  constructor(public value: boolean) {}

  reduce(state: CounterState): CounterState {
    return { ...state, loading: this.value }
  }
}

@Counter({
  type: 'Async_Increment',
  async: true // important for async actions
})
export class AsyncIncrement {
  constructor(public ms: number = 1000 /* 1s */) {}

  reduce(dispatch: Dispatch<any>) {
    dispatch(new SetLoading(true))

    setTimeout(() => {
      dispatch(new SetLoading(false))
      dispatch(new Increment())
    }, this.ms)
  }
}
```

```tsx
// index.tsx
import {
  createReducer,
  createReactReduxClassReducerMiddleware
} from 'react-redux-class-reducer'
import { counterInitState, counterPrefix } from './store/counter'
// ...

// create middleware
const reactReduxClassReducerMiddleware =
  /* pass what ever you want as extraArgs */
  createReactReduxClassReducerMiddleware({
    /* pass what ever you want */
  })

// create counter reducer
const counterReducer =
  // pass what ever prefix you would like e.g '@Counter'
  createReducer(counterPrefix, counterInitState)

// create redux store
const store = createStore(
  combineReducers({
    // passing the reducer
    counter: counterReducer
  }),
  // applying the middleware
  applyMiddleware(reactReduxClassReducerMiddleware)
)

// ...
```

```tsx
// app.tsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CounterState,
  IncrementCounter,
  DecrementCounter,
  AsyncIncrement
} from './store/counterActions'

const App = () => {
  const counter = useSelector((s: { counter: CounterState }) => s.counter.value)
  const counter = useSelector(
    (s: { counter: CounterState }) => s.counter.loading
  )
  const dispatch = useDispatch()

  /* dispatching actions */

  return (
    <div>
      <h1>counter example</h1>
      <div>
        <p>Counter: {counter}</p>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(new IncrementCounter())
          }}
        >
          increment by 1
        </button>
        <button onClick={() => dispatch(new DecrementCounter(5))}>
          decrement by 5
        </button>
        <button onClick={() => dispatch(new AsyncIncrement())}>
          increment by 1 after 1 sec
        </button>
      </div>
    </div>
  )
}

export default App
```

## License

MIT © [MohamedElmdary](https://github.com/MohamedElmdary)
