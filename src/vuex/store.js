import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import categoryModule from './modules/category/index'
import pageModule from './modules/page/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    category: categoryModule,
    page: pageModule
  },
  getters
})
