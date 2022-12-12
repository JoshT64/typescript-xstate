import { createMachine, interpret } from 'xstate'

export const useLogin = () => {
  const loginMachine = createMachine(
    {
      id: 'login',
      initial: 'idle',
      context: {
        username: '',
        password: '',
        keys: [],
        health: 100,
        step: 1,
        currentKeyPress: []
      },
      states: {
        idle: {
          on: {
            SUBMIT: { target: 'loading', actions: 'setCredentials' },
            NEXT: { target: 'idle', actions: 'setStep' },
            KEYPRESS: { target: 'idle', actions: 'setKeypad' }
          }
        },
        loading: {
          invoke: {
            src: 'login',
            onDone: { target: 'success', actions: 'redirect' },
            onError: 'error'
          }
        },
        success: {
          type: 'final'
        },
        error: {
          on: {
            SUBMIT: 'loading'
          }
        }
      }
    },
    {
      actions: {
        setCredentials: (context, event) => {
          console.log(event)
          context.username = event.username
          context.password = event.password
        },
        setStep: (context, event) => {
          console.log(event)
          context.step = event.step
        },
        setKeypad: (context, event) => {
          const array = []
          array.push(event.currentKeyPress)
          console.log(array)
          context.currentKeyPress = event.currentKeyPress
        }
      },
      //setup guards for success state
      //online escape room
      guards: {
        isUsernameValid: (context, event) => {
          return context.username === 'admin'
        }
      }
    }
  )

  const loginService = interpret(loginMachine)
    .onTransition((state) => {
      console.log(state)
      if (state.changed) {
        console.log(state)
        if (
          state.context.username === 'admin' &&
          state.context.password === 'admin'
        ) {
          //goto success state
          loginService.send('SUCCESS')
        } else {
          //goto error state
        }
      }
    })
    .start()

  return { loginService, loginMachine }
}
