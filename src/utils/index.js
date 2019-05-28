export const stop = (callback, ...args) => {
  return (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (callback instanceof Function) callback(...args) // eslint-disable-line
  }
}
