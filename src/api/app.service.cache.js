'use strict'

import Config from './app.config.js'
import request from 'axios'
import localforage from 'localforage'

request.defaults.baseURL = Config.wpDomain

const cacheService = {
  store: '',
  storeCacheTime: '',
  currentTime: '',
  isBrowser: false,
  networkFirstStrategy: (configOptions, cacheTime) => {
    return new Promise((resolve, reject) => {
      return request(configOptions)
      .then(response => {
        // Response returned, cache it and return it
        if (response.status === 200) {
          if (cacheService.isBrowser) {
            cacheService.storeCacheTime.setItem(configOptions.path, cacheService.currentTime + cacheTime)
            cacheService.store.setItem(configOptions.path, { data: response.data, headers: response.headers })
            .then((response) => resolve(response))
            .catch((err) => reject(err))
          } else {
            resolve(response)
          }
        } else {
          if (cacheService.isBrowser) {
            cacheService.store.getItem(configOptions.path)
            .then((response) => resolve(response))
            .catch((err) => reject(err))
          } else {
            reject('Cannot get ' + configOptions.path)
          }
        }
      }).catch(error => {
        console.log(error)
      })
    })
  },
  offlineFirstStrategy: (configOptions, cacheTime) => {
    return new Promise((resolve, reject) => {
      cacheService.storeCacheTime.getItem(configOptions.path).then(function (timeLastCached) {
        // Cache has expired
        if (timeLastCached < cacheService.currentTime) {
          cacheService.networkFirstStrategy(configOptions.path, cacheTime)
          .then((response) => { resolve(response) })
          .catch((err) => reject(err))
        } else {
          // Get item from cache
          cacheService.store.getItem(configOptions.path)
          .then((response) => {
            if (response) {
              // Is in cache perfect!
              resolve(response)
            } else {
              // Doesn't exist in cache try network
              cacheService.networkFirstStrategy(configOptions.path, cacheTime)
              .then((response) => resolve(response))
              .catch((err) => reject(err))
            }
          })
          .catch((error) => {
            console.log(error)
            // Doesn't exist in cache try network
            cacheService.networkFirstStrategy(configOptions.path, cacheTime)
            .then((response) => resolve(response))
            .catch((err) => reject(err))
          })
        }
      }).catch((error) => {
        console.log(error)
        // Doesn't exist in cache timeouts try network
        cacheService.networkFirstStrategy(configOptions.path, cacheTime)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
      })
    })
  },
  get: function (configOptions, cacheTime) {
    return new Promise((resolve, reject) => {
      cacheService.currentTime = Math.floor(Date.now() / 1000)
      cacheService.isBrowser = (typeof window !== 'undefined')
      if (cacheService.isBrowser) {
        cacheService.store = localforage.createInstance({
          name: Config.loadDbName
        })
        cacheService.storeCacheTime = localforage.createInstance({
          name: Config.loadDbName + '_cacheTime'
        })
      }
      if (!cacheTime || cacheTime === 0) {
        cacheService.networkFirstStrategy(configOptions, 0)
        .then(response => { if (!response) { resolve('') } else { resolve(response) } })
        .catch((err) => { reject(err) })
      } else {
        cacheService.offlineFirstStrategy(configOptions, cacheTime)
        .then(response => { if (!response) { resolve('') } else { resolve(response) } })
        .catch((err) => reject(err))
      }
    })
  }
}

export default cacheService
