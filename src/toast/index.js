import { addStyles } from "../util"

let toast

export function setupToast() {
  toast = document.createElement('div')
  toast.classList.add('toast')

  addStyles(toast, {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    fontSize: '2rem',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    padding: '0.5rem',
    background: '#202020',
    color: '#ddd',
    transition: 'transform 0.5s',
    transform: 'translateY(-100%)'
  })

  document.body.append(toast)
}

export function showToast(text) {
  toast.innerText = text
  toast.style.transform = 'translateY(0)'
  setTimeout(() => {
    toast.style.transform = 'translateY(-100%)'
  }, 2000)
}