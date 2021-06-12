import { controllerImg } from './image'

document.body.innerHTML = controllerImg

export function updateGamepadImage(event) {
  event.buttons.forEach(data => {
    const buttonEl = document.querySelector(`#${data.type}`)
    if (data.button.value) {
      buttonEl.style.fill = `rgba(255,0,0,${data.button.value}`
    } else {
      buttonEl.style.fill = 'white'
    }
  })

  if (event.joysticks) {
    const leftX = 97
    const leftY = 180
    const rightX = 252 
    const rightY = 245

    const l3 = document.querySelector(`#l3`)
    const r3 = document.querySelector(`#r3`)

    l3.style.cx = leftX + (event.joysticks.left[0] * 10)
    l3.style.cy = leftY + (event.joysticks.left[1] * 10)
    r3.style.cx = rightX + (event.joysticks.right[0] * 10)
    r3.style.cy = rightY + (event.joysticks.right[1] * 10)
  }
}
