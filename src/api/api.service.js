import Config from './app.config.js'
import appCache from './api.service.cache.js'
import nJwt from 'njwt'
import request from 'axios'

const wpRESTApiRoot = Config.wpDomain + (process.env.NODE_ENV === 'development' ? 'wp-json/wp/v2/' : 'index.php/')

const token = nJwt.create({
  userId: 1,
  userRole: 'superAdmin',
  iss: Config.apiV2Root,
  scope: 'self'
}, 'JWT_SECRET', 'HS256').compact()

const apiService = {
  async cacheRequest (requestOptions, cacheTime) {
    return await appCache.get(requestOptions, cacheTime)
  },
  async getMenu (id) {
    const response = await this.cacheRequest(`${wpRESTApiRoot}nav-menu/${id}`, Config.genericCachingTime)
    return response.data
  },
  async callApi (url, options, cache) {
    if (options) {
      url += '?'
      for (let prop in options) {
        url += `${prop}=${options[prop]}&`
      }
      url = url.substring(0, url.length - 1)
    }
    const requestOptions = {
      baseURL: Config.apiV2Root,
      url,
      headers: { token }
    }
    return await this.cacheRequest(requestOptions, cache || Config.genericCachingTime)
  },
  async search (term) {
    return await request.get(`${Config.apiV2Root}maker?combined_search_name=${term}`, { headers: { token } })
  }
}

export default apiService
