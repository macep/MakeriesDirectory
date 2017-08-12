import apiService from '../api/app.service'
import translations from '../modules/translations'
import {friendlyMonth, getRouteFromWpMenus} from '../modules/utils'
import Config from '../api/app.config'

let actions = {
  loadProject: ({commit}) => {
    let time = {}
    return new Promise((resolve, reject) => {
      commit('mutateActivityIndicator', true)
      time.t0 = performance.now()
      commit('mutateTranslations', translations)
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
              postItem.images = ['<img src="/static/no-img.png"/>']
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
          commit('mutateMakeries', data.data)
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
          directory.forEach(maker => {
            maker.routeTo = `${Config.routerSettings.makerDetail}${maker.id}/${maker.name.split(' ').join('-')}`
          })
          commit('mutateMakeries', directory)
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
