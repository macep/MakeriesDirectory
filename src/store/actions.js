import Config from '../api/app.config'
import {getSS, setSS} from '../api/browserstorage'
import apiService from '../api/api.service'
import {
  friendlyMonth,
  getRouteFromWpMenus,
  sortObjectProperties,
  azDirectory,
  getSubstringBetweenSubstrings
} from '../modules/utils'

const actions = {
  loadProject: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit('mutateActivityIndicator', true)

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
    })
  },
  loadPosts: ({commit}) => {
    let posts = []
    let years = []
    commit('mutateActivityIndicator', true)

    return apiService.getPosts(null, null, 100, 'desc').then((response) => {
      const bannedPostCategories = [Config.postsIDs.bannerPosts, Config.postsIDs.sliderPosts, Config.postsIDs.directoryBanners]
      const cleanPostsCollection = response.posts.filter(item => {
        if (!bannedPostCategories.includes(item.categories[0])) {
          return item
        }
      })

      // TODO: not needed in production?
      const fixImageUrl = (img) => {
        const target = `/website/wp-content/`
        const targetUpdated = `/wp-content/`
        return img.indexOf(target) !== -1 && process.env.NODE_ENV === 'development' ? img.replace(target, targetUpdated) : img
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
    })
  },
  async loadDirectory ({commit, state}) {
    let time = { t0: performance.now() }
    commit('mutateActivityIndicator', true)
    try {
      const ssLabel = 'resultsPageNumberLoaded'

      setSS(ssLabel, (state.directory.length / state.resultsPerPage) + 1)
      const data = await apiService.callApi('maker', {page: +getSS(ssLabel), per_page: state.resultsPerPage}, 8.64e+7)

      commit('mutateDirectory', state.directory.concat(data.data))
      commit('mutateDirectoryAZ', sortObjectProperties(azDirectory(state.directory)))

      commit('mutateActivityIndicator', false)
      time.t1 = performance.now()
    } catch (err) {
      console.error(err)
      commit('mutateActivityIndicator', false)
    }
    console.debug(time.t1 - time.t0, state.directory.length)
  },
  async loadDirectoryFeaturedList ({commit}) {
    commit('mutateActivityIndicator', true)

    try {
      const data = await apiService.callApi('maker', {featured: 'yes', per_page: 100})
      commit('mutateDirectoryFeaturedList', data.data)
      commit('mutateActivityIndicator', false)
    } catch (err) {
      console.error(err)
      commit('mutateActivityIndicator', false)
    }
  },
  async loadDirectoryStats ({commit}) {
    commit('mutateActivityIndicator', true)

    try {
      const data = await apiService.callApi('website/entities', null, 0)
      commit('mutateDirectoryStats', data.data)
    } catch (err) {
      console.error(err)
    }
  },
  setPointerIsTouch: ({commit}, payload) => {
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
