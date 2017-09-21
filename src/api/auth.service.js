import Vue from 'vue'
import Auth0 from 'auth0-js'
import AUTH_CONFIG from '../api/auth.variables'
import Config from '../api/app.config'
import router from '../router/index'
import store from '../store/index'
import request from 'axios'

let jgmAccessToken = 'jgm_access_token'
let jgmIdToken = 'jgm_id_token'
let jgmExpiresAt = 'jgm_expires_at'
let jgmCurrentUser = 'jgm_current_user'
let jgmOriginOfDesiredRoute = 'jgm_origin_of_desired_route'
let jgmDesiredRoute = 'jgm_desired_route'

export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new Vue()

  constructor () {
    this.login = this.login.bind(this)
    this.socialLogin = this.socialLogin.bind(this)
    this.signup = this.signup.bind(this)
    this.handleUserProfile = this.handleUserProfile.bind(this)
    this.patchUserMetadata = this.patchUserMetadata.bind(this)
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
        this.handleUserProfile(authResult)
        this.setSession(authResult)
      }
    })
  }

  socialLogin (identifier) {
    this.webAuth.authorize({connection: identifier})
    this.handleUserProfile('social login', localStorage.getItem(jgmAccessToken))
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

  handleUserProfile (token) {
    this.webAuth.client.userInfo(token.accessToken, (err, user) => {
      if (err) {
        console.error(err)
      }
      localStorage.setItem(jgmCurrentUser, JSON.stringify(user))
      store.commit('mutateUserProfile', user)
      let userMetadata = user['https://jgm:eu:auth0:com/user_metadata']
      if (userMetadata.userInformationCollected === 'false') {
        let asked = +userMetadata.askedForUserInformation
        asked++
        userMetadata.askedForUserInformation = asked.toString()
        this.patchUserMetadata(user.sub, userMetadata)
        router.replace('/user-information')
      }
    })
  }

  patchUserMetadata (userId, userMetadata) {
    let auth0UserUrl = 'https://' + AUTH_CONFIG.domain + '/api/v2/users/' + userId
    request.patch(auth0UserUrl, { user_metadata: userMetadata }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(jgmIdToken)
      }
    }).then(response => console.log(response))
  }

  handleAuthentication () {
    this.webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.handleUserProfile(authResult)
        this.setSession(authResult)
      } else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`)
        console.error(err)
        router.replace(localStorage.getItem(jgmOriginOfDesiredRoute))
      }
    })
  }

  setSession (authResult) {
    let expiresAt = JSON.stringify(authResult.expiresIn * 1e3 + new Date().getTime())
    localStorage.setItem(jgmAccessToken, authResult.accessToken)
    localStorage.setItem(jgmIdToken, authResult.idToken)
    localStorage.setItem(jgmExpiresAt, expiresAt)
    this.authNotifier.$emit('authChange', { authenticated: true })
    router.replace(localStorage.getItem(jgmDesiredRoute) || Config.routerSettings.directory)
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
