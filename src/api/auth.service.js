import Vue from 'vue'
import auth0 from 'auth0-js'
import AUTH_CONFIG from '../api/auth.variables'
import router from '../router/index'
import Config from '../api/app.config'

let jgmAccessToken = 'jgm_access_token'
let jgmIdToken = 'jgm_id_token'
let jgmExpiresAt = 'jgm_expires_at'

export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new Vue()

  constructor () {
    this.login = this.login.bind(this)
    this.socialLogin = this.socialLogin.bind(this)
    this.setSession = this.setSession.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.logout = this.logout.bind(this)
  }

  webAuth = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.redirectUri,
    responseType: AUTH_CONFIG.responseType,
    scope: AUTH_CONFIG.scope
  })

  login (username, password) {
    this.webAuth.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      scope: AUTH_CONFIG.scope,
      username: username,
      password: password
    }, (err, authResult) => {
      console.error(err, authResult)
    })
  }

  socialLogin (identifier) {
    this.webAuth.authorize({connection: identifier}, (err, authResult) => {
      console.error(err, authResult)
    })
  }

  handleAuthentication () {
    this.webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace(localStorage.getItem('jgm_desired_route') || Config.routerSettings.directory)
      } else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`)
        console.log(err)
        router.replace(localStorage.getItem('jgm_origin_of_desired_route'))
      }
    })
  }

  setSession (authResult) {
    let expiresAt = JSON.stringify(authResult.expiresIn * 1e3 + new Date().getTime())
    localStorage.setItem(jgmAccessToken, authResult.accessToken)
    localStorage.setItem(jgmIdToken, authResult.idToken)
    localStorage.setItem(jgmExpiresAt, expiresAt)
    this.authNotifier.$emit('authChange', { authenticated: true })
  }

  logout () {
    localStorage.removeItem(jgmAccessToken)
    localStorage.removeItem(jgmIdToken)
    localStorage.removeItem(jgmExpiresAt)
    this.userProfile = null
    this.authNotifier.$emit('authChange', false)
    router.replace(router.history.current.matched[0].path === `${Config.routerSettings.makerDetail}:id/:page` ? '/directory' : '/')
  }

  isAuthenticated () {
    let expiresAt = JSON.parse(localStorage.getItem(jgmExpiresAt))
    return new Date().getTime() < expiresAt
  }
}
