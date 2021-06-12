
import { InputCast } from 'inputcast/receiver'
import { updateGamepadImage } from './gamepad'
import { deleteKey, typeKeyToInput } from './keyboard'
import { setupToast, showToast } from './toast'
import { addStyles } from './util'

addStyles(document.body, {
  height: '100%',
  margin: 'auto',
  display: 'flex',
  background: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
})

setupToast()

const inputCast = new InputCast()

inputCast.onGamepad(InputCast.INPUT.ALL, updateGamepadImage)
inputCast.onGamepad(InputCast.INPUT.CONNECTED, (event) => {
  showToast(`Connected: ${event.id}`)
})
inputCast.onGamepad(InputCast.INPUT.DISCONNECTED, (event) => {
  showToast(`Disconnected: ${event.id}`)
})

inputCast.onKeyboard(InputCast.INPUT.ALL, event => typeKeyToInput(event.key))
inputCast.onKeyboard('Backspace', deleteKey)

resolve()
