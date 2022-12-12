import React from 'react'
import { useHome } from './useHome'
import { useMachine } from '@xstate/react'
import { promiseMachine } from 'components/App'

export default function Home() {
  //const {} = useHome()
  const [state, send] = useMachine(promiseMachine)
  return (
    <div className="m-10 flex  flex-row justify-between ">
      <h1>Home</h1>
      <div
        onClick={() => {
          console.log(send('EXIT'))
          send('EXIT')
          console.log('exit')
        }}
      >
        Exit
      </div>
    </div>
  )
}
