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
  cacheRequest (path, cacheTime) {
    return new Promise((resolve, reject) => {
      appCache.get(path, cacheTime)
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  },
  getMenu (id) {
    return new Promise((resolve, reject) => {
      this.cacheRequest(`${wpRESTApiRoot}wp-json/wp-api-menus/v2/menus/${id}`, Config.genericCachingTime)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    })
  },
  getPosts (categoryId, page, perPage, order) {
    return new Promise((resolve, reject) => {
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
      this.cacheRequest(path, Config.genericCachingTime)
        .then(response => {
          let totalPages = (response.headers.hasOwnProperty('X-WP-TotalPages')) ? response.headers['X-WP-TotalPages'][0] : 0
          if (totalPages === 0) {
            totalPages = (response.headers.hasOwnProperty('x-wp-totalpages')) ? response.headers['x-wp-totalpages'][0] : 0
          }
          let responseData = {posts: response.data, totalPages: totalPages}
          resolve(responseData)
        })
        .catch(error => reject(error))
    })
  },
  getPostsByCategory (categoryId) {
    return new Promise((resolve, reject) => {
      const path = `${wpRESTApiRoot}wp-json/wp/v2/posts?categories=${categoryId}`
      this.cacheRequest(path, Config.genericCachingTime)
        .then(response => {
          let totalPages = (response.headers.hasOwnProperty('X-WP-TotalPages')) ? response.headers['X-WP-TotalPages'][0] : 0
          if (totalPages === 0) {
            totalPages = (response.headers.hasOwnProperty('x-wp-totalpages')) ? response.headers['x-wp-totalpages'][0] : 0
          }
          let responseData = {posts: response.data, totalPages: totalPages}
          resolve(responseData)
        })
        .catch(error => reject(error))
    })
  },
  getPost (postId) {
    return new Promise((resolve, reject) => {
      const path = `${wpRESTApiRoot}wp-json/wp/v2/posts/${postId}?fields=id,title,slug,tags,date,better_featured_image,content,rest_api_enabler,pure_taxonomies`
      this.cacheRequest(path, Config.genericCachingTime)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    })
  },
  getPages () {
    return new Promise((resolve, reject) => {
      const path = `${wpRESTApiRoot}wp-json/wp/v2/pages/?per_page=100&fields=id,title,slug,tags,date,better_featured_image,content,rest_api_enabler,pure_taxonomies`
      this.cacheRequest(path, Config.genericCachingTime)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getPage (pageId) {
    return new Promise((resolve, reject) => {
      const path = `${wpRESTApiRoot}wp-json/wp/v2/pages/${pageId}`
      this.cacheRequest(path, Config.genericCachingTime)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getCategories () {
    return new Promise((resolve, reject) => {
      const path = `${wpRESTApiRoot}wp-json/wp/v2/categories`
      this.cacheRequest(path, Config.genericCachingTime)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  async callApi (url, options, cache) {
    if (options) {
      url += '?'
      for (let prop in options) {
        url += `${prop}=${options[prop]}&`
      }
      url = url.substring(0, url.length - 1)
    }
    const requestParams = {
      baseURL: Config.apiV2Root,
      url,
      headers: { token }
    }
    return await this.cacheRequest(requestParams, cache || Config.genericCachingTime)
  },
  async search (term) {
    return await request({
      method: 'get',
      baseURL: Config.apiV2Root,
      url: `maker/?combined_search_name=${term}`,
      headers: {token}
    })
  }
}

export default apiService
