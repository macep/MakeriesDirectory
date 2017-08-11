import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hostName: window.location,
    translations: {},
    isMobile: false,
    pointerIsTouch: false,
    windowSize: {},
    showActivityIndicator: false,
    mainMenu: '',
    secondaryMenu: '',
    categories: [],
    pages: [],
    posts: [],
    archivedYears: [],
    sliderPosts: [],
    bannerPosts: [],
    makeries: []
  },
  getters,
  mutations,
  actions
})
