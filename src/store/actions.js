// import { config } from '../api/config'
// import translations from '../modules/translations'

export default {
  loadProject: ({ commit, state, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit('mutateActivityIndicatorVisibility', true)
      // commit('mutateTranslations', translations)
    })
  },
  setActivityIndicatorVisibility ({ commit }, payload) {
    commit('mutateActivityIndicatorVisibility', payload)
  },
  setWindowSize: ({ commit }, payload) => {
    commit('mutateWindowSize', payload)
  },
  setViewPort: ({ commit }, payload) => {
    commit('mutateViewPort', payload)
  },
  setPointerIsTouch: ({ commit }, payload) => {
    commit('mutatePointerIsTouch', payload)
  },
  setIsMobile: ({ commit }, payload) => {
    var isMobile = window.matchMedia('only screen and (max-width: 767px)').matches
    commit('mutateIsMobile', isMobile)
  }
}

