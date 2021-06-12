export function addStyles(el, obj) {
  Object.entries(obj).forEach(([ key, value ])=> {
    el.style[key] = value
  })
}