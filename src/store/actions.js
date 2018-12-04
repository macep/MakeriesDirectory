import apiService from '../api/api.service'
import Config from '../api/app.config'
import {
  friendlyMonth,
  getRouteFromWpMenus,
  // findOccurences,
  friendlyUrl,
  sortObjectProperties,
  getSubstringBetweenSubstrings
} from '../modules/utils'

const actions = {
  loadProject: ({commit}) => {
    let time = {}
    return new Promise((resolve, reject) => {
      commit('mutateActivityIndicator', true)
      time.t0 = performance.now()

      const prepareMenuUrl = (menu) => {
        menu.forEach(item => {
          let relPath = getRouteFromWpMenus(item.url)
          item.url = relPath.url
          item.pathType = relPath.flag
        })
      }

      const getMainMenu = () => {
        return apiService.getMenu(Config.menusIDs.primary).then((response) => {
          prepareMenuUrl(response.items)
          commit('mutateMainMenu', response.items)
        })
      }

      const getSecondaryMenu = () => {
        return apiService.getMenu(Config.menusIDs.secondary).then((response) => {
          prepareMenuUrl(response.items)
          commit('mutateSecondaryMenu', response.items)
        })
      }

      const getCategories = () => {
        return apiService.getCategories().then((response) => {
          let categories = response.data.filter(item => item.id !== Config.postsIDs.sliderPosts && item.id !== Config.postsIDs.bannerPosts)
          commit('mutateCategories', categories)
        })
      }

      const getAllPages = () => {
        return apiService.getPages().then((response) => {
          commit('mutatePages', response.data)
        })
      }

      const getSliderPosts = () => {
        apiService.getPostsByCategory(Config.postsIDs.sliderPosts).then(response => {
          commit('mutateSliderPosts', response.posts)
        })
      }

      const getDirectoryBannersPosts = () => {
        apiService.getPostsByCategory(Config.postsIDs.directoryBanners).then(response => {
          commit('mutateDirectoryBannersPosts', response.posts)
        })
      }

      const getBannerPosts = () => {
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
          console.debug(`[actions] website data received in ${((time.t1 - time.t0) / 1e3).toFixed(3)}s`)
        })
    })
  },
  loadPosts: ({commit}) => {
    let posts = []
    let years = []
    let time = {}
    commit('mutateActivityIndicator', true)

    return apiService.getPosts(null, null, 100, 'desc').then((response) => {
      time.t0 = performance.now()
      const bannedPostCategories = [Config.postsIDs.bannerPosts, Config.postsIDs.sliderPosts, Config.postsIDs.directoryBanners]
      const cleanPostsCollection = response.posts.filter(item => {
        if (!bannedPostCategories.includes(item.categories[0])) {
          return item
        }
      })

      // TODO: fixing the images path is not needed in production
      const fixImageUrl = (img) => {
        const target = `/website/wp-content/`
        const targetUpdated = `/wp-content/`
        return img.indexOf(target) !== -1 ? img.replace(target, targetUpdated) : img
      }

      cleanPostsCollection.forEach(post => {
        const dateString = post.date.split('T')[0]
        const imagesArrayFromContentString = post.content.rendered.match(/<img[^>]*>/g) || []
        let imagesArrayFromContentStringProcessed = []
        imagesArrayFromContentString.forEach(img => {
          const urlResulted = getSubstringBetweenSubstrings(img, `" src="`, `" alt="`)
          imagesArrayFromContentStringProcessed.push(urlResulted !== null ? fixImageUrl(urlResulted[1]) : Config.missingImageUrl)
        })

        const frontCover = () => {
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
      time.t1 = performance.now()
      console.debug(`[actions] posts data received in ${((time.t1 - time.t0) / 1e3).toFixed(3)}s`)
    })
  },
  loadDirectory: ({commit}) => {
    let time = {}
    return new Promise((resolve, reject) => {
      commit('mutateActivityIndicator', true)
      time.t0 = performance.now()

      const getDotNetData = () => {
        apiService.callApi('maker', {per_page: 25}).then((data) => {
          console.log(data.data)
          let directory = data.data
          let letter = ''
          let azObject = {}
          let azValNameNonAlpha = []

          directory.forEach(item => {
            item.routeTo = `${Config.routerSettings.makerDetail}${item.id}/${item.name.split(' ').join('-')}`

            // sort the collection by initial char, case insensitive
            letter = item.name.charAt(0).toUpperCase()

            if (azObject[letter] === undefined) {
              azObject[letter] = []
            }

            azObject[letter].push(item)
          })

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

          commit('mutateDirectory', directory)
          commit('mutateDirectoryAZ', sortObjectProperties(azObject))
        })
      }

      const getStats = () => {
        apiService.callApi('/website/entities').then((data) => {
          console.log(data)
        })
      }

      Promise.all([getDotNetData(), getStats()])
        .then(() => {
          time.t1 = performance.now()
          console.debug(`[actions] directory data received in ${((time.t1 - time.t0) / 1e3).toFixed(3)}s`)
        })
    })
  },
  setIsMobile: ({commit}) => {
    const isMobile = window.matchMedia('only screen and (max-width: 767px)').matches
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
