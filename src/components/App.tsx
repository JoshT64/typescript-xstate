import {
  AnyEventObject,
  assign,
  createMachine,
  Event,
  interpret,
  SingleOrArray
} from 'xstate'
import { useMachine } from '@xstate/react'
import Home from './Home/Home'
import { useEffect, useRef } from 'react'
import Login from './Login/Login'

//ts-ignore-file
//ignore typescript for file
//ts-ignore-line

export const promiseMachine = createMachine({
  id: 'light',
  initial: 'pending',
  states: {
    pending: {
      on: {
        ENTER: { target: 'resolved' },
        EXIT: { target: 'rejected' }
      }
    },
    failure: {
      on: {
        EXIT: { target: 'rejected' }
      }
    },
    resolved: {
      type: 'compound'
    },
    rejected: {
      type: 'final'
    }
  }
})

function App() {
  const [state, send] = useMachine(promiseMachine)

  return (
    <>
      {state.matches('resolved') && <Home />}
      {state.matches('pending') && <Login />}
      {state.matches('rejected') && (
        <div className="flex h-screen items-center justify-center">
          <div
            className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
            onClick={() => send('EXIT')}
          >
            Login Failed! Retry?
          </div>
        </div>
      )}
    </>
  )
}

export default App
