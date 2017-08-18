import apiService from '../api/app.service'
import Config from '../api/app.config'
import {friendlyMonth, getRouteFromWpMenus, findOccurences, friendlyUrl, sortObjectProperties} from '../modules/utils'

let actions = {
  loadProject: ({commit}) => {
    let time = {}
    return new Promise((resolve, reject) => {
      commit('mutateActivityIndicator', true)
      time.t0 = performance.now()

      let prepareMenuUrl = (menu) => {
        menu.forEach(item => {
          let relPath = getRouteFromWpMenus(item.url)
          item.url = relPath.url
          item.pathType = relPath.flag
        })
      }

      function getMainMenu () {
        return apiService.getMenu(Config.menusIDs.primary).then((response) => {
          prepareMenuUrl(response.items)
          commit('mutateMainMenu', response.items)
        })
      }

      function getSecondaryMenu () {
        return apiService.getMenu(Config.menusIDs.secondary).then((response) => {
          prepareMenuUrl(response.items)
          commit('mutateSecondaryMenu', response.items)
        })
      }

      function getAllPosts () {
        let posts = []
        let years = []
        return apiService.getPosts(null, null, 100, 'desc').then((response) => {
          let cleanPostsCollection = response.posts.filter(item => {
            // TODO: could be improved
            if (item.categories[0] !== Config.postsIDs.bannerPosts && item.categories[0] !== Config.postsIDs.sliderPosts) {
              return item
            }
          })
          cleanPostsCollection.forEach((post) => {
            let dateString = post.date.split('T')[0]
            let postItem = {
              id: post.id,
              title: post.title.rendered,
              excerpt: post.excerpt.rendered,
              content: post.content.rendered,
              categories: post.categories,
              images: post.content.rendered.match(/<img[^>]*>/g),
              featured_image: post.better_featured_image,
              original_date: dateString,
              date: dateString.split('-')[2] + ' ' + friendlyMonth(dateString.split('-')[1] - 1) + ' ' + dateString.split('-')[0],
              year: dateString.split('-')[0],
              time: post.date.split('T')[1],
              spa_route: `${Config.routerSettings.journalSingle}${post.slug}/${post.id}/`
            }
            if (postItem.images === null) {
              postItem.images = [`<img src="${Config.missingImageUrl}"/>`]
            }
            posts.push(postItem)
            years.push(postItem.year)
          })
          commit('mutatePosts', posts)
          commit('mutateArchivedYears', years)
        })
      }

      function getCategories () {
        return apiService.getCategories().then((response) => {
          let categories = response.data.filter(item => item.id !== Config.postsIDs.sliderPosts && item.id !== Config.postsIDs.bannerPosts)
          commit('mutateCategories', categories)
        })
      }

      function getAllPages () {
        return apiService.getPages().then((response) => {
          commit('mutatePages', response.data)
        })
      }

      function getDotNetData () {
        apiService.callDotNetApi('api/makers/GetByGroupId/3').then((data) => {
          commit('mutateDirectory', data.data)
        })
      }

      function getSliderPosts () {
        apiService.getPostsByCategory(Config.postsIDs.sliderPosts).then(response => {
          commit('mutateSliderPosts', response.posts)
        })
      }

      function getBannerPosts () {
        apiService.getPostsByCategory(Config.postsIDs.bannerPosts).then(response => {
          let bannerPosts = response.posts.reverse()
          bannerPosts.forEach((item, idx) => {
            switch (idx) {
              case 0:
                item.routeTo = Config.routerSettings.directory
                break
              case 1:
                item.routeTo = Config.routerSettings.signUp
                break
              case 2:
                item.linkTo = Config.routerSettings.newsletter
                break
            }
          })
          commit('mutateBannerPosts', bannerPosts)
        })
      }

      Promise.all([getMainMenu(), getSecondaryMenu(), getAllPosts(), getCategories(), getAllPages(), getDotNetData(), getSliderPosts(), getBannerPosts()])
        .then(() => {
          commit('mutateActivityIndicator', false)
          time.t1 = performance.now()
          console.debug('[actions] api data received in ' + ((time.t1 - time.t0) / 1e3).toFixed(3) + 's')
        })
    })
  },
  loadDirectory: ({commit}) => {
    let time = {}
    return new Promise((resolve, reject) => {
      commit('mutateActivityIndicator', true)
      time.t0 = performance.now()

      function getDotNetData () {
        apiService.callDotNetApi('api/makers/GetByGroupId/3').then((data) => {
          let directory = data.data
          let directoryDisabled = []

          let filterData = {
            regions: {name: Config.titles.directory.filterData.regions, data: []},
            businessTypes: {name: Config.titles.directory.filterData.businessTypes, data: []},
            products: {name: Config.titles.directory.filterData.products, data: []},
            serviceTypes: {name: Config.titles.directory.filterData.serviceTypes, data: []}
          }

          let letter = ''
          let azObject = {}
          let azValNameNonAlpha = []

          directory.forEach(item => {
            item.routeTo = `${Config.routerSettings.makerDetail}${item.id}/${item.name.split(' ').join('-')}`

            if (item.region !== null) {
              filterData.regions.data.push(item.region.name)
              item.region.pretty = friendlyUrl(item.region.name)
            }

            if (item.businessTypes !== null) {
              item.businessTypes.forEach((i) => {
                filterData.businessTypes.data.push(i.name)
                i.pretty = friendlyUrl(i.name)
              })
            }

            if (item.products !== null) {
              item.products.forEach((i) => {
                filterData.products.data.push(i.name)
                i.pretty = friendlyUrl(i.name)
              })
            }

            if (item.serviceTypes !== null) {
              item.serviceTypes.forEach((i) => {
                filterData.serviceTypes.data.push(i.name)
                i.pretty = friendlyUrl(i.name)
              })
            }

            // sort the collection by initial char, case insensitive
            letter = item.name.charAt(0).toUpperCase()

            if (azObject[letter] === undefined) {
              azObject[letter] = []
            }

            azObject[letter].push(item)
          })

          directoryDisabled = directory.filter(maker => !maker.enabled)
          directory = directory.filter(maker => maker.enabled)

          for (let prop in azObject) {
            if (prop.match(/^[A-Za-z]+$/) === null) {
              azValNameNonAlpha = azValNameNonAlpha.concat(azObject[prop])
              if (prop !== '0-9') {
                delete azObject[prop]
              }
            }
          }

          azObject['0-9'] = azValNameNonAlpha

          // prepare the route property
          for (let value in azObject) {
            azObject[value].forEach((item) => {
              item.routeTo = `${Config.routerSettings.makerDetail}${item.id}/${friendlyUrl(item.name)}`
            })
          }

          filterData.regions.data = findOccurences(filterData.regions.data, true, Config.routerSettings.filterBy.region)
          filterData.products.data = findOccurences(filterData.products.data, true, Config.routerSettings.filterBy.products)
          filterData.businessTypes.data = findOccurences(filterData.businessTypes.data, true, Config.routerSettings.filterBy.businessTypes)
          filterData.serviceTypes.data = findOccurences(filterData.serviceTypes.data, true, Config.routerSettings.filterBy.serviceTypes)

          commit('mutateDirectory', directory)
          commit('mutatedirectoryDisabled', directoryDisabled)
          commit('mutateDirectoryFilterData', filterData)
          commit('mutateDirectoryAZ', sortObjectProperties(azObject))
        })
      }

      Promise.all([getDotNetData()])
        .then(() => {
          commit('mutateActivityIndicator', false)
          time.t1 = performance.now()
          console.debug('[actions] directory data received in ' + ((time.t1 - time.t0) / 1e3).toFixed(3) + 's')
        })
    })
  },
  setIsMobile: ({commit}, payload) => {
    let isMobile = window.matchMedia('only screen and (max-width: 767px)').matches
    commit('mutateIsMobile', isMobile)
  },
  setPointerIsTouch: ({ commit }, payload) => {
    commit('mutatePointerIsTouch', payload)
  },
  setWindowSize: ({commit}, payload) => {
    commit('mutateWindowSize', payload)
  },
  setActivityIndicator ({commit}, payload) {
    commit('mutateActivityIndicator', payload)
  }
}

export default actions
