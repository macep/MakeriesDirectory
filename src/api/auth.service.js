import Vue from 'vue'
import Auth0 from 'auth0-js'
import AUTH_CONFIG from '../api/auth.variables'
import Config from '../api/app.config'
import router from '../router/index'
import store from '../store/index'

let jgmAccessToken = 'jgm_access_token'
let jgmIdToken = 'jgm_id_token'
let jgmExpiresAt = 'jgm_expires_at'
let jgmCurrentUser = 'jgm_current_user'

export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new Vue()

  constructor () {
    this.login = this.login.bind(this)
    this.socialLogin = this.socialLogin.bind(this)
    this.signup = this.signup.bind(this)
    this.getUserProfile = this.getUserProfile.bind(this)
    this.patchUserProfile = this.patchUserProfile.bind(this)
    this.setSession = this.setSession.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.logout = this.logout.bind(this)
  }

  webAuth = new Auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.redirectUri,
    responseType: AUTH_CONFIG.responseType,
    scope: AUTH_CONFIG.scope
  })

  auth0Manage = {}

  login (username, password) {
    this.webAuth.client.login({
      connection: AUTH_CONFIG.connection,
      realm: AUTH_CONFIG.connection,
      username: username,
      password: password
    }, (err, authResult) => {
      if (err) {
        store.commit('mutateServerErrorMessage', `${err.statusCode} ${err.code}: ${err.description}`)
      } else {
        this.setSession(authResult)
      }
    })
  }

  socialLogin (identifier) {
    this.webAuth.authorize({connection: identifier}, (err, authResult) => {
      console.error(err, authResult)
    })
  }

  signup (username, email, password, userMetadata) {
    this.webAuth.signup({
      connection: AUTH_CONFIG.connection,
      username,
      email,
      password,
      user_metadata: userMetadata
    }, (err) => {
      if (err) {
        store.commit('mutateServerErrorMessage', `${err.original.response.body.statusCode}: ${err.original.response.body.message || err.original.response.body.description}`)
      } else {
        store.commit('mutateServerSuccessMessage', Config.titles.registerAndAuthentication.userCreatedMessage)
      }
    })
  }

  getUserProfile (userId) {
    this.auth0Manage.getUser(userId, (err, authResult) => {
      console.error(err, authResult)
    })
  }

  patchUserProfile (userId, userMetadata) {
    this.auth0Manage.patchUserMetadata(userId, userMetadata, (err, authResult) => {
      console.error(err, authResult)
    })
  }

  handleAuthentication () {
    this.webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.webAuth.client.userInfo(authResult.accessToken, (err, user) => {
          console.log(err, user)
          localStorage.setItem(jgmCurrentUser, JSON.stringify(user))
          store.commit('mutateUserProfile', user)
          this.auth0Manage = new Auth0.Management({
            domain: AUTH_CONFIG.domain,
            token: authResult.idToken
          })
        })
        this.setSession(authResult)
      } else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`)
        console.error(err)
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
    router.replace(localStorage.getItem('jgm_desired_route') || Config.routerSettings.directory)
  }

  logout () {
    localStorage.removeItem(jgmAccessToken)
    localStorage.removeItem(jgmIdToken)
    localStorage.removeItem(jgmExpiresAt)
    localStorage.removeItem(jgmCurrentUser)
    this.userProfile = null
    this.authNotifier.$emit('authChange', false)
    router.replace(router.history.current.matched[0].path === `${Config.routerSettings.makerDetail}:id/:page` ? '/directory' : '/')
  }

  isAuthenticated () {
    let expiresAt = JSON.parse(localStorage.getItem(jgmExpiresAt))
    return new Date().getTime() < expiresAt
  }
}
