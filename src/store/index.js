import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

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
