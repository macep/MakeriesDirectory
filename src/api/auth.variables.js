let AUTH_CONFIG

if (process.env.NODE_ENV === 'development') {
  AUTH_CONFIG = {
    domain: 'jgm.eu.auth0.com',
    clientId: 'fxNdIR8JCFuI6mwYTNRE1hiDpunef9Rn',
    redirectUri: `http://localhost:8080/callback/`,
    audience: 'https://jgm.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  }
} else {
  AUTH_CONFIG = {
    domain: 'jgm.eu.auth0.com',
    clientID: 'dGM6YqpS8kCIHb2B7pDjWXj6Jx4dC7Oe',
    redirectUri: 'http://uix.ro/callback',
    audience: 'https://jgm.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  }
}

export default AUTH_CONFIG
