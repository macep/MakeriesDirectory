import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import posts from './modules/posts/index'
import pages from './modules/pages/index'
import makeries from './modules/makeries/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    translations: {}
  },
  getters,
  mutations,
  actions,
  modules: {
    pages,
    posts,
    makeries
  }
})
