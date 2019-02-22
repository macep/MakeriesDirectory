import Config from './app.config.js'
import appCache from './api.service.cache.js'
import nJwt from 'njwt'
import request from 'axios'

const wpRESTApiRoot = Config.wpDomain + (process.env.NODE_ENV === 'development' ? '' : 'index.php/')

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
    const response = await this.cacheRequest(`${wpRESTApiRoot}wp-json/wp-api-menus/v2/menus/${id}`, Config.genericCachingTime)
    return response.data
  },
  async getPosts (categoryId, page, perPage, order) {
    let path = `${wpRESTApiRoot}wp-json/wp/v2/posts`
    let postsQuery = '?'
    if (categoryId !== null) {
      postsQuery += `categories=${categoryId}&`
    }
    if (page !== null) {
      postsQuery += `page=${page}&`
    }
    if (perPage !== null) {
      postsQuery += `per_page=${perPage}&`
    }
    if (order !== null) {
      postsQuery += `order=${order}&`
    }
    if (postsQuery.length > 1) {
      path += postsQuery.substr(0, postsQuery.length - 1)
    }

    const response = await this.cacheRequest(path, Config.genericCachingTime)

    let totalPages = (response.headers.hasOwnProperty('X-WP-TotalPages')) ? response.headers['X-WP-TotalPages'][0] : 0
    if (totalPages === 0) totalPages = (response.headers.hasOwnProperty('x-wp-totalpages')) ? response.headers['x-wp-totalpages'][0] : 0

    return {
      posts: response.data,
      totalPages: totalPages
    }
  },
  async getPostsByCategory (categoryId) {
    const path = `${wpRESTApiRoot}wp-json/wp/v2/posts?categories=${categoryId}`
    const response = await this.cacheRequest(path, Config.genericCachingTime)

    let totalPages = (response.headers.hasOwnProperty('X-WP-TotalPages')) ? response.headers['X-WP-TotalPages'][0] : 0
    if (totalPages === 0) totalPages = (response.headers.hasOwnProperty('x-wp-totalpages')) ? response.headers['x-wp-totalpages'][0] : 0

    return {
      posts: response.data,
      totalPages: totalPages
    }
  },
  async getPages () {
    const path = `${wpRESTApiRoot}wp-json/wp/v2/pages/?per_page=100&fields=id,title,slug,tags,date,better_featured_image,content,rest_api_enabler,pure_taxonomies`
    return await this.cacheRequest(path, Config.genericCachingTime)
  },
  async getCategories () {
    const path = `${wpRESTApiRoot}wp-json/wp/v2/categories`
    return await this.cacheRequest(path, Config.genericCachingTime)
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
