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
  },

  checkIfEmailIsVerified () {
    let result = []
    let cookies = document.cookie.split('; ')
    cookies.forEach(cookie => {
      let cookieNameSplitByDashes = cookie.split('=')[0].split('-')
      if (cookieNameSplitByDashes[cookieNameSplitByDashes.length - 1] === 'verified') {
        result = cookie.split('=')[1].replace(/%2520/g, ' ').replace(/%3D/g, '=').replace(/%26/g, ';').split(';')
        result.push(
          cookie.split('=')[0]
        )
      }
    })
    return result
  },

  deleteCookie (cname) {
    document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }
}
