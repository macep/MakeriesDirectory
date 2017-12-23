import request from 'superagent'
import Members from './mailchimp.members'

export default class Mailchimp {
  constructor (username, apiKey) {
    if (!apiKey) {
      throw Error('API key is missing.')
    }
    if (!username) {
      throw Error('Username is missing.')
    }
    this.version = '3.0'
    this.apiKey = apiKey
    this.datacenter = apiKey.split('-')[1]
    this.endpoint = `https://${this.datacenter}.api.mailchimp.com/${this.version}`
    this.username = username
    this.members = new Members(this)
  }

  call (http, method, params) {
    // console.log(http, method)
    const req =
      request(http, `${this.endpoint}${method}`)
        .set('content-type', 'application/json')
        .auth(this.username, this.apiKey)

    if (http === 'POST' || http === 'PATCH') {
      req.send(params)
    } else if (http === 'GET') {
      req.query(params)
    }

    return req
  }
}
