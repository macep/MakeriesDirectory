const getLS = name => localStorage.getItem(name)
const setLS = (name, payload) => localStorage.setItem(name, payload)
const removeLS = name => localStorage.removeItem(name)
const resetLS = name => localStorage.clear()

const getSS = name => sessionStorage.getItem(name)
const setSS = (name, payload) => sessionStorage.setItem(name, payload)
const removeSS = name => sessionStorage.removeItem(name)
const resetSS = name => sessionStorage.clear()

export {
  getLS,
  setLS,
  removeLS,
  resetLS,
  getSS,
  setSS,
  removeSS,
  resetSS
}
