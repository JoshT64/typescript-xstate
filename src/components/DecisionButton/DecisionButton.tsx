export {}

type StepType = {
  stepNum: number
  send: (event: string, payload: unknown) => void
  text: string
}

export const DecisionButton = ({ stepNum, send, text }: StepType) => {
  return (
    <div
      onClick={() => {
        send('NEXT', { step: { stepNum } })
      }}
      className="m-10 border-spacing-2 cursor-pointer rounded-lg border border-b-4 p-1.5 text-center transition ease-in-out hover:bg-gray-300"
    >
      {text}
    </div>
  )
}
