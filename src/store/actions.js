import Config from '../api/app.config'
import {getSS, setSS} from '../api/browserstorage'
import apiService from '../api/api.service'
import {
  getRouteFromWpMenus,
  sortObjectProperties,
  azDirectory
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

      Promise.all([getMainMenu(), getSecondaryMenu()])
    })
  },
  async loadDirectory ({commit, state}) {
    commit('mutateActivityIndicator', true)
    try {
      const ssLabel = 'resultsPageNumberLoaded'
      setSS(ssLabel, (state.directory.length / state.resultsPerPage) + 1)
      const data = await apiService.callApi('maker', {page: +getSS(ssLabel), per_page: state.resultsPerPage}, 8.64e+7)
      commit('mutateDirectory', state.directory.concat(data.data))
      commit('mutateDirectoryAZ', sortObjectProperties(azDirectory(state.directory)))
      commit('mutateActivityIndicator', false)
    } catch (err) {
      console.error(err)
      commit('mutateActivityIndicator', false)
    }
  },
  async loadAllDirectory ({commit}) {
    commit('mutateActivityIndicator', true)
    try {
      const data = await apiService.callApi('maker', {per_page: 1000}, 8.64e+7)
      commit('mutateDirectory', data.data)
      commit('mutateDirectoryAZ', sortObjectProperties(azDirectory(data.data)))
      commit('mutateActivityIndicator', false)
    } catch (err) {
      console.error(err)
      commit('mutateActivityIndicator', false)
    }
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
