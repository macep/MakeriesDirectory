import apiService from '../api/api.service'
import Config from '../api/app.config'
import {
  friendlyMonth,
  getRouteFromWpMenus,
  findOccurences,
  friendlyUrl,
  sortObjectProperties,
  getSubstringBetweenSubstrings
} from '../modules/utils'

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

      let getMainMenu = () => {
        return apiService.getMenu(Config.menusIDs.primary).then((response) => {
          prepareMenuUrl(response.items)
          commit('mutateMainMenu', response.items)
        })
      }

      let getSecondaryMenu = () => {
        return apiService.getMenu(Config.menusIDs.secondary).then((response) => {
          prepareMenuUrl(response.items)
          commit('mutateSecondaryMenu', response.items)
        })
      }

      let getCategories = () => {
        return apiService.getCategories().then((response) => {
          let categories = response.data.filter(item => item.id !== Config.postsIDs.sliderPosts && item.id !== Config.postsIDs.bannerPosts)
          commit('mutateCategories', categories)
        })
      }

      let getAllPages = () => {
        return apiService.getPages().then((response) => {
          commit('mutatePages', response.data)
        })
      }

      let getSliderPosts = () => {
        apiService.getPostsByCategory(Config.postsIDs.sliderPosts).then(response => {
          commit('mutateSliderPosts', response.posts)
        })
      }

      let getDirectoryBannersPosts = () => {
        apiService.getPostsByCategory(Config.postsIDs.directoryBanners).then(response => {
          commit('mutateDirectoryBannersPosts', response.posts)
        })
      }

      let getBannerPosts = () => {
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

      Promise.all([getMainMenu(), getSecondaryMenu(), getCategories(), getAllPages(), getSliderPosts(), getDirectoryBannersPosts(), getBannerPosts()])
        .then(() => {
          time.t1 = performance.now()
          console.debug('[actions] api data received in ' + ((time.t1 - time.t0) / 1e3).toFixed(3) + 's')
        })
    })
  },
  loadPosts: ({commit}) => {
    let posts = []
    let years = []
    return apiService.getPosts(null, null, 100, 'desc').then((response) => {
      let cleanPostsCollection = response.posts.filter(item => {
        // TODO: could be improved
        if (
          item.categories[0] !== Config.postsIDs.bannerPosts &&
          item.categories[0] !== Config.postsIDs.sliderPosts &&
          item.categories[0] !== Config.postsIDs.directoryBanners
        ) {
          return item
        }
      })
      // TODO: this might be useless in production; it does the trick on dev tho
      let fixImageUrl = (img) => {
        let target = `/website/wp-content/`
        let targetUpdated = `/wp-content/`
        return img.indexOf(target) !== -1 ? img.replace(target, targetUpdated) : img
      }

      cleanPostsCollection.forEach((post) => {
        let dateString = post.date.split('T')[0]
        let imagesArrayFromContentString = post.content.rendered.match(/<img[^>]*>/g) || []
        let imagesArrayFromContentStringProcessed = []
        imagesArrayFromContentString.forEach(img => {
          let urlResulted = getSubstringBetweenSubstrings(img, `" src="`, `" alt="`)
          imagesArrayFromContentStringProcessed.push(urlResulted !== null ? fixImageUrl(urlResulted[1]) : Config.missingImageUrl)
        })

        let frontCover = () => {
          if (post.better_featured_image) {
            return fixImageUrl(`<img src="${post.better_featured_image.source_url}"/>`)
          } else if (imagesArrayFromContentString.length > 0) {
            return fixImageUrl(imagesArrayFromContentString[0])
          } else {
            return `<img src="http://via.placeholder.com/600x600?text=Maker's Image"/>`
          }
        }

        let postItem = {
          id: post.id,
          title: post.title.rendered,
          excerpt: post.excerpt.rendered,
          content: post.content.rendered,
          categories: post.categories,
          images: imagesArrayFromContentStringProcessed,
          featured_image: post.better_featured_image,
          front_cover: frontCover(),
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
  },
  loadDirectory: ({commit}) => {
    let time = {}
    return new Promise((resolve, reject) => {
      commit('mutateActivityIndicator', true)
      time.t0 = performance.now()

      function getDotNetData () {
        apiService.callDotNetApi(Config.getAllMakers).then((data) => {
          let directory = data.data

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

          let directoryDisabled = directory.filter(maker => !maker.enabled)
          directoryDisabled.forEach(item => {
            if (item.images.length === 0) {
              item.images[0] = {
                description: '',
                fileName: '',
                imageName: '',
                url: `http://via.placeholder.com/500x300?text=Maker's Image`
              }
            }
          })
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
          commit('mutateDirectoryDisabled', directoryDisabled)
          commit('mutateDirectoryFilterData', filterData)
          commit('mutateDirectoryAZ', sortObjectProperties(azObject))
        })
      }

      Promise.all([getDotNetData()])
        .then(() => {
          time.t1 = performance.now()
          console.debug('[actions] directory data received in ' + ((time.t1 - time.t0) / 1e3).toFixed(3) + 's')
        })
    })
  },
  setIsMobile: ({commit}) => {
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
