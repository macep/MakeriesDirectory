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
    this.resetPassword = this.resetPassword.bind(this)
    this.logout = this.logout.bind(this)
  }

  signup (email, password, userMetadata) {
    this.webAuth.signup({
      connection: AUTH_CONFIG.connection,
      email,
      password,
      user_metadata: userMetadata
    }, (err, resp) => {
      if (err) {
        store.commit('mutateServerRegistrationErrorMessage', {
          message: `${err.original.response.body.message || err.original.response.body.description}`,
          visible: true
        })
      } else {
        store.commit('mutateServerRegistrationSuccessMessage', {
          message: Config.titles.registerAndAuthentication.userCreatedMessage,
          visible: true
        })
      }
    })
  }

  login (username, password) {
    this.webAuth.client.login({
      connection: AUTH_CONFIG.connection,
      realm: AUTH_CONFIG.connection,
      username,
      password
    }, (err, authResult) => {
      if (err) {
        store.commit('mutateServerLoginErrorMessage', {
          message: `${err.description}`,
          visible: true
        })
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
    const expiresAt = JSON.stringify(authResult.expiresIn * 1e3 + new Date().getTime())
    localStorage.setItem(jgmAccessToken, authResult.accessToken)
    localStorage.setItem(jgmIdToken, authResult.idToken)
    localStorage.setItem(jgmExpiresAt, expiresAt)
    this.authNotifier.$emit('authChange', { authenticated: true })
  }

  isAuthenticated () {
    const expiresAt = JSON.parse(localStorage.getItem(jgmExpiresAt))
    return new Date().getTime() < expiresAt
  }

  resetPassword (email) {
    this.webAuth.changePassword({
      connection: AUTH_CONFIG.connection,
      client_id: AUTH_CONFIG.clientID,
      email
    }, (err, authResult) => {
      if (err) {
        store.commit('mutateServerResetPassErrorMessage', {
          message: `${err.data}`,
          visible: true
        })
      } else {
        store.commit('mutateServerResetPassSuccessMessage', {
          message: `${authResult} ${Config.titles.registerAndAuthentication.ifIsntYou}`,
          visible: true
        })
      }
    })
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
