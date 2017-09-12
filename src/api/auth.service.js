import auth0 from 'auth0-js'
import {AUTH_CONFIG} from './auth0.variables'
import EventEmitter from 'EventEmitter'
import router from '../router/index'

export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.redirectUri,
    audience: AUTH_CONFIG.audience,
    responseType: AUTH_CONFIG.responseType,
    scope: AUTH_CONFIG.scope
  })

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('')
        console.log('Success', authResult)
      } else if (err) {
        router.replace('')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1e3 + new Date().getTime()
    )
    localStorage.setItem('jgm_access_token', authResult.accessToken)
    localStorage.setItem('jgm_id_token', authResult.idToken)
    localStorage.setItem('jgm_expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('jgm_access_token')
    localStorage.removeItem('jgm_id_token')
    localStorage.removeItem('jgm_expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace('')
    console.log(`Logged out`)
  }

  isAuthenticated () {
    // Check whether the current time is past the access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('jgm_expires_at'))
    return new Date().getTime() < expiresAt
  }
}
