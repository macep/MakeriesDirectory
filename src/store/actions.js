import apiService from '../api/app.service'
import translations from '../modules/translations'

let actions = {
  loadProject: ({commit}) => {
    let time = {}
    return new Promise((resolve, reject) => {
      commit('mutateActivityIndicator', true)
      time.t0 = performance.now()
      commit('mutateTranslations', translations)

      function getMainMenu () {
        return apiService.getMenu(2).then((response) => {
          commit('mutateMainMenu', response.items)
        })
      }

      function getSecondaryMenu () {
        return apiService.getMenu(3).then((response) => {
          commit('mutateSecondaryMenu', response.items)
        })
      }

      function getAllPosts () {
        return apiService.getPosts(null, null, 100, 'desc').then((response) => {
          commit('mutatePosts', response.posts)
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

      Promise.all([getMainMenu(), getSecondaryMenu(), getAllPosts(), getAllPages(), getDotNetData()])
        .then(() => {
          commit('mutateActivityIndicator', false)
          time.t1 = performance.now()
          console.debug('[actions] api data received in ' + ((time.t1 - time.t0) / 1e3).toFixed(3) + 's')
        })
    })
  },
  setIsMobile: ({commit}, payload) => {
    let isMobile = window.matchMedia('only screen and (max-width: 767px)').matches
    commit('mutateIsMobile', isMobile)
  },
  setWindowSize: ({commit}, payload) => {
    commit('mutateWindowSize', payload)
  },
  setActivityIndicator ({commit}, payload) {
    commit('mutateActivityIndicator', payload)
  }
}

export default actions
