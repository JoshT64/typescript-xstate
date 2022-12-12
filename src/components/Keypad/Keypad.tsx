import React from 'react'

interface KeypadProps {
  send: (event: string, payload: unknown) => void
  currentKeyPress: number
}

const buttons = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['C', 0, '⌫']
]

export const Keypad = ({ send, currentKeyPress }: KeypadProps) => {
  //wait for numbers to be sent and add them to an array
  const currentKeyPressArray: number[] = []

  console.log(currentKeyPressArray)
  return buttons.map((button, idx) => {
    return (
      <div key={idx}>
        {/* <button
          className="rounded-lg border border-b-4 p-1.5 text-center transition ease-in-out hover:bg-gray-300"
          onClick={() => send('KEYPRESS', { step: 12 })}
        > */}
        {button.map((splitButton, idx) => {
          return (
            <button
              key={idx}
              className="m-0.5 rounded-lg border border-b-4 p-1.5 px-3 text-center transition ease-in-out hover:bg-gray-300"
              onClick={() => send('KEYPRESS', { step: splitButton })}
            >
              {splitButton}
            </button>
          )
        })}
        <div>{currentKeyPressArray}</div>
      </div>
    )
  })
}
