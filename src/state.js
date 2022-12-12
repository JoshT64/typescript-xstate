// export {}
//exit -> transition -> entry (actions order always the same)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Machine, interpret, actions, send } = require('xstate')

const lightBulbMachine = Machine(
  {
    id: 'lightBulb',
    initial: 'unlit',
    states: {
      lit: {
        on: {
          BREAK: {
            target: 'broken',
            actions: send({
              type: 'BROKEN'
            })
          },
          TOGGLE: 'unlit'
        },
        exit: ['turnOff']
      },

      unlit: {
        on: {
          BREAK: 'broken',
          TOGGLE: 'lit'
        }
      },

      broken: {
        entry: ['logBroken']
      }
    }
  },
  {
    actions: {
      logBroken: (context, event) => {
        console.log(`yo i am broke in the ${event.type} event`)
      },
      turnOff: () => {
        console.log('turning off the lightbulb')
      }
    }
  }
)

const service = interpret(lightBulbMachine).start()
service.send('TOGGLE')
service.send('TOGGLE')
service.send('TOGGLE')

console.log(service.state.value)
service.send('BREAK')
