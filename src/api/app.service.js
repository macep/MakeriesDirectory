import Config from './app.config.js'
import appCache from './app.service.cache.js'

let apiService = {
  cacheRequest (path, cacheTime) {
    return new Promise((resolve, reject) => {
      appCache.get(path, cacheTime)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getMenu (id) {
    return new Promise((resolve, reject) => {
      this.cacheRequest(`${Config.wpDomain}wp-json/wp-api-menus/v2/menus/${id}`, Config.genericCachingTime)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  },
  getPosts (categoryId, page, perPage, order) {
    return new Promise((resolve, reject) => {
      let path = `${Config.wpDomain}wp-json/wp/v2/posts`
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
  getPost (postId) {
    return new Promise((resolve, reject) => {
      let path = `${Config.wpDomain}wp-json/wp/v2/posts/${postId}?fields=id,title,slug,tags,date,better_featured_image,content,rest_api_enabler,pure_taxonomies`
      this.cacheRequest(path, Config.genericCachingTime)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    })
  },
  getPages () {
    return new Promise((resolve, reject) => {
      let path = `${Config.wpDomain}wp-json/wp/v2/pages/?per_page=100`
      this.cacheRequest(path, Config.genericCachingTime)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getPage (pageId) {
    return new Promise((resolve, reject) => {
      let path = `${Config.wpDomain}wp-json/wp/v2/pages/${pageId}`
      this.cacheRequest(path, Config.genericCachingTime)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  callDotNetApi (url) {
    let requestParams = {
      baseURL: Config.dotNetDomain,
      url: url,
      method: 'get',
      headers: {
        'useXDomain': true,
        'X-Requested-With': '',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + Config.dotNetToken
      },
      timeout: 3e4
    }
    return new Promise((resolve, reject) => {
      this.cacheRequest(requestParams, Config.genericCachingTime)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }
}

export default apiService
