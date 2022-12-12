import { useMachine } from '@xstate/react'
import { DecisionButton } from 'components/DecisionButton/DecisionButton'
import { Keypad } from 'components/Keypad/Keypad'
import React, { useState } from 'react'
import { useLogin } from './useLogin'

export default function Login() {
  const { loginService, loginMachine } = useLogin()
  const [password, setPassword] = useState('')
  const [state, send] = useMachine(loginMachine)

  const Text = () => {
    switch (state.context.step) {
      // case 1:
      //   return (
      //     <div
      //       onClick={() => {
      //         send('NEXT', { step: 2 })
      //       }}
      //       className="flex cursor-pointer flex-col items-center"
      //     >
      //       <div className="text-3xl">Welcome to my humble abode</div>
      //       <div className="text-red-500">(click me to go to next step!)</div>
      //     </div>
      //   )
      case 2:
        return (
          <div
            onClick={() => {
              send('NEXT', { step: 3 })
            }}
            className="flex cursor-pointer flex-col items-center"
          >
            <div className="text-3xl">
              My wife has just left to the store...
            </div>
            <div className="text-3xl">for some.. materials.</div>
            <div className="text-gray-400">
              (the man leads you to his dining hall)
            </div>
          </div>
        )
      case 1:
        return (
          <div className="flex cursor-crosshair flex-col items-center">
            <div className="text-3xl">
              Please find yourself at home and take a seat!
            </div>
            <div className="text-red-500">(make a decision below)</div>
            <div className="m-10 flex gap-2">
              <DecisionButton
                send={() => send('NEXT', { step: 4 })}
                text={
                  <>
                    agree to take <br></br> a seat
                  </>
                }
              />
              <DecisionButton
                send={() => send('NEXT', { step: 5 })}
                text={
                  <>
                    question his<br></br> ominous demeanor
                  </>
                }
              />
            </div>
            <div className="italic text-gray-400">
              there's a pungent stench coming from the dining hall
            </div>
          </div>
        )
      case 4:
        return (
          <div className="flex cursor-pointer flex-col items-center">
            <div className="text-3xl">
              You politely comply to Mr. Smith's offer & take a seat
            </div>
            <div className=" mt-12 text-center text-2xl">
              Mr Smith makes a quick approach towards his <br></br> kitchen
              leaving me stranded in his massive dining hall.
            </div>
            <div className=" mt-12 text-center text-2xl">
              You begin to look around and take in the
              <br></br>
              dusty curtains and furniture that looked like it
              <br></br>hadn't been updated since the 1970's.
            </div>
            <div className=" mt-12 text-center text-2xl">
              You suddenly hear a loud crash and yell from the kitchen
            </div>
            <div className="text-gray-400">(Make a decision)</div>
            <div className="m-10 flex gap-2">
              <DecisionButton
                text={<>investigate the noise</>}
                send={() => send('NEXT', { step: 8 })}
              />
              <DecisionButton
                text={<>explore rest of the house</>}
                send={() => send('NEXT', { step: 9 })}
              />
            </div>
          </div>
        )
      case 5:
        return (
          <div className="flex cursor-pointer flex-col items-center">
            <div className="text-center text-3xl">
              You begin to question <br></br>Mr. Smith's strange behavior
            </div>
            <div className=" mt-12 text-center text-2xl">
              Smith, visibly annoyed, <br></br> asks you to take a seat
            </div>
            <div className=" mt-12 text-center  text-2xl">
              You take a seat with held breath<br></br>thinking something is{' '}
              <span className="italic text-red-500">wrong</span>
            </div>
            <div className="m-10 flex gap-2">
              <DecisionButton
                text={<>finally, take a seat</>}
                send={() => send('NEXT', { step: 4 })}
              />
              <DecisionButton
                text={<>ask mr. smith to use the restroom</>}
                send={() => send('NEXT', { step: 10 })}
              />
            </div>
          </div>
        )
      case 8:
        return (
          <div className="flex cursor-pointer flex-col items-center">
            <div className="text-center text-3xl">
              You begin to investigate the noise
            </div>
          </div>
        )
      case 9:
        return (
          <div className="flex cursor-pointer flex-col items-center">
            <div className="text-center text-3xl">
              You begin to explore the rest of the house
            </div>
          </div>
        )
      case 10:
        return (
          <div className="flex cursor-default flex-col items-center">
            <div className="text-center text-3xl">
              You ask Mr. Smith to use the restroom
            </div>
            <div className="mt-12 text-center text-3xl">
              Mr. Smith looks at you with a blank stare
            </div>
            <div className="mt-12 text-center text-3xl">
              Mr. Smith instructs you there is a keypad lock <br></br> on the
              door, and you must use the code <br></br> he gives you to access
              the restroom.
            </div>
            <div className="mt-2 text-center text-2xl text-red-500">(5743)</div>
            <DecisionButton
              text={<>goto restroom</>}
              send={() => send('NEXT', { step: 11 })}
            />
          </div>
        )
      case 11:
        return (
          <div className="flex cursor-pointer flex-col items-center">
            <div className="text-center text-3xl">
              You arrive at the restroom door
            </div>
            <div className="mt-12 mb-5 text-center text-3xl">
              You look around and see a <br></br> keypad with digits 0-9 on it
            </div>
            {console.log(state.context)}
            <Keypad
              send={(_step, payload) => {
                const currentKeyPress = payload.step
                send('KEYPRESS', { currentKeyPress })
              }}
              currentKeyPress={state.context.currentKeyPress}
            />
            {/* <div className="flex flex-col">
              <div id="row1">
                <button
                  className="rounded-lg border border-b-4 p-1.5 text-center transition ease-in-out hover:bg-gray-300"
                  onClick={() => send('KEYPRESS', { step: 12 })}
                >
                  1
                </button>
                <button
                  className="rounded-lg border border-b-4 p-1.5 text-center transition ease-in-out hover:bg-gray-300"
                  onClick={() => send('KEYPRESS', { step: 13 })}
                >
                  2
                </button>
                <button
                  className="rounded-lg border border-b-4 p-1.5 px-3 text-center transition ease-in-out hover:bg-gray-300"
                  onClick={() => send('KEYPRESS', { step: 14 })}
                >
                  3
                </button>
              </div>
              <div id="row2">
                <button
                  className="rounded-lg border border-b-4 p-1.5 text-center transition ease-in-out hover:bg-gray-300"
                  onClick={() => send('KEYPRESS', { step: 15 })}
                >
                  4
                </button>
                <button
                  className="rounded-lg border border-b-4 p-1.5 text-center transition ease-in-out hover:bg-gray-300"
                  onClick={() => send('KEYPRESS', { step: 16 })}
                >
                  5
                </button>
                <button
                  className="rounded-lg border border-b-4 p-1.5 px-3 text-center transition ease-in-out hover:bg-gray-300"
                  onClick={() => send('KEYPRESS', { step: 17 })}
                >
                  6
                </button>
              </div>
              <div id="row3">
                <button
                  className="rounded-lg border border-b-4 p-1.5 text-center transition ease-in-out hover:bg-gray-300"
                  onClick={() => send('KEYPRESS', { step: 15 })}
                >
                  7
                </button>
                <button
                  className="rounded-lg border border-b-4 p-1.5 text-center transition ease-in-out hover:bg-gray-300"
                  onClick={() => send('KEYPRESS', { step: 16 })}
                >
                  8
                </button>
                <button
                  className="rounded-lg border border-b-4 p-1.5 px-3 text-center transition ease-in-out hover:bg-gray-300"
                  onClick={() => send('KEYPRESS', { step: 17 })}
                >
                  9
                </button>
              </div>
            </div> */}
            <DecisionButton
              text={<>explore rest of house</>}
              send={() => send('NEXT', { step: 9 })}
            />
          </div>
        )

      default:
        return (
          <div>
            You're lost, I'm lost, we're all lost?
            <button
              className="rounded-lg border border-b-4 p-1.5 text-center transition ease-in-out hover:bg-gray-300"
              onClick={() => send('NEXT', { step: 1 })}
            >
              Go back?
            </button>
          </div>
        )
    }
  }

  return (
    <>
      <div className="relative top-20">
        <Text />
      </div>

      <div className="relative top-32 flex flex-col gap-4">
        {state.context.step === 20 && (
          <>
            <input
              className=" m-auto w-1/3 rounded border"
              type="text"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => {
                loginService.send('SUBMIT', { password })
              }}
            >
              Login
            </button>
          </>
        )}
      </div>
    </>
  )
}
