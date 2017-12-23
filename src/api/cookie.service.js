import config from './app.config'

export default {
  setCookie (cname, cvalue) {
    let d = new Date()
    d.setTime(d.getTime() + (config.verificationURLLifetime * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  },

  getCookie (cname) {
    let name = cname + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  },

  decodeCookieValue (val) {
    return JSON.parse(val)
  }
}
