import { filteredKeys } from "./filtered-keys"

const textInput = document.createElement('input')
const keyMap = {
  Tab: '\t'
}

textInput.type = 'text'
textInput.style.fontSize = '3rem'
textInput.placeholder = 'try typing on your sender...'
document.body.append(textInput)

export function typeKeyToInput(key) {
  if (filteredKeys.includes(key)) return
  
  const cursorPosition = textInput.selectionStart;
  const text = textInput.value
  const newText = keyMap[key] || key

  textInput.value = text.substring(0, cursorPosition) + newText + text.substring(cursorPosition)
  
  textInput.selectionStart = cursorPosition + newText.length
  textInput.selectionEnd = cursorPosition + newText.length
  textInput.scrollLeft = textInput.scrollWidth / textInput.value.length * cursorPosition + newText.length
}

export function deleteKey() {
  const textBefore = textInput.value.substring(0, textInput.selectionStart-1)
  const textAfter = textInput.value.substring(textInput.selectionEnd, textInput.value.length)
  
  textInput.value = textBefore + textAfter
  textInput.selectionStart = textBefore.length
  textInput.selectionEnd = textBefore.length
}