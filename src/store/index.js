import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    translations: {},
    isMobile: false,
    windowSize: {},
    showActivityIndicator: false,
    pages: [],
    posts: [],
    makeries: []
  },
  getters,
  mutations,
  actions
})
