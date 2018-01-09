import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverRegistrationErrorMessage: {
      message: '',
      visible: false
    },
    serverRegistrationSuccessMessage: {
      message: '',
      visible: false
    },
    serverLoginErrorMessage: {
      message: '',
      visible: false
    },
    hostName: window.location,
    isMobile: false,
    pointerIsTouch: false,
    mobileMenuVisibile: false,
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
    directory: [],
    showAllSuppliers: false,
    directoryDisabled: [],
    directoryFilterData: [],
    directoryAZ: [],
    viewType: 'grid',
    searchCriteria: ''
  },
  getters,
  mutations,
  actions
})
