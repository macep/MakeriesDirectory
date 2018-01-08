import Vue from 'vue'
import Auth0 from 'auth0-js'
import AUTH_CONFIG from '../api/auth.variables'
import Config from '../api/app.config'
import router from '../router/index'
import store from '../store/index'
import request from 'axios'

const jgmAccessToken = 'jgm_access_token'
const jgmIdToken = 'jgm_id_token'
const jgmExpiresAt = 'jgm_expires_at'
const jgmCurrentUser = 'jgm_current_user'
const jgmOriginOfDesiredRoute = 'jgm_origin_of_desired_route'
const jgmDesiredRoute = 'jgm_desired_route'

export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new Vue()

  webAuth = new Auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.redirectUri,
    responseType: AUTH_CONFIG.responseType,
    scope: AUTH_CONFIG.scope
  })

  constructor () {
    this.signup = this.signup.bind(this)
    this.login = this.login.bind(this)
    this.socialLogin = this.socialLogin.bind(this)
    this.handleSocialAuthentication = this.handleSocialAuthentication.bind(this)
    this.verifyUserProfile = this.verifyUserProfile.bind(this)
    this.updateUserProfile = this.updateUserProfile.bind(this)
    this.setSession = this.setSession.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.logout = this.logout.bind(this)
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
        this.verifyUserProfile(authResult)
      }
    })
  }

  socialLogin (identifier) {
    this.webAuth.authorize({connection: identifier}, (err, result) => console.error(err || result))
  }

  handleSocialAuthentication () {
    this.webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.verifyUserProfile(authResult)
      } else if (err) {
        console.error(err)
        router.replace(Config.routerSettings.directory)
      }
    })
  }

  verifyUserProfile (authResult) {
    this.webAuth.client.userInfo(authResult.accessToken, (err, user) => {
      if (err) {
        console.error(err)
      }
      this.setSession(authResult)
      let userMetadata = user[Config.routerSettings.userMetadataRetrievalUrl]
      if (!userMetadata) {
        this.updateUserProfile(user.sub, {user_metadata: {
          userInformationCollected: 'false',
          askedForUserInformation: '0'
        }})
        router.replace('/user-information')
      } else if (userMetadata.userInformationCollected === 'false') {
        let asked = +userMetadata.askedForUserInformation
        asked++
        userMetadata.askedForUserInformation = asked.toString()
        this.updateUserProfile(user.sub, {user_metadata: userMetadata})
        router.replace('/user-information')
      } else {
        localStorage.setItem(jgmCurrentUser, JSON.stringify(user))
        router.replace(localStorage.getItem(jgmDesiredRoute) || localStorage.getItem(jgmOriginOfDesiredRoute))
      }
    })
  }

  updateUserProfile (userId, userProfile) {
    request.patch(`https://${AUTH_CONFIG.domain}/api/v2/users/${userId}`, userProfile, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(jgmIdToken)}`
      }
    }).then(response => localStorage.setItem(jgmCurrentUser, JSON.stringify(response.data)))
  }

  setSession (authResult) {
    let expiresAt = JSON.stringify(authResult.expiresIn * 1e3 + new Date().getTime())
    localStorage.setItem(jgmAccessToken, authResult.accessToken)
    localStorage.setItem(jgmIdToken, authResult.idToken)
    localStorage.setItem(jgmExpiresAt, expiresAt)
    this.authNotifier.$emit('authChange', { authenticated: true })
  }

  isAuthenticated () {
    let expiresAt = JSON.parse(localStorage.getItem(jgmExpiresAt))
    return new Date().getTime() < expiresAt
  }

  logout () {
    localStorage.removeItem(jgmAccessToken)
    localStorage.removeItem(jgmIdToken)
    localStorage.removeItem(jgmExpiresAt)
    localStorage.removeItem(jgmCurrentUser)
    localStorage.removeItem(jgmDesiredRoute)
    localStorage.removeItem(jgmOriginOfDesiredRoute)
    this.authNotifier.$emit('authChange', false)
    router.replace('/directory')
  }
}
