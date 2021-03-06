// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/sass/jgm.sass'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import App from './App'
import router from './router'
import store from './store/index'

import Meta from 'vue-meta'
import VueTouch from 'vue-touch'
import VueFuse from 'vue-fuse'
import VueAnalytics from 'vue-analytics'

Vue.use(Meta)
Vue.use(VueTouch)
Vue.use(VueFuse)
Vue.use(VueAnalytics, {
  id: 'UA-49362824-1',
  router,
  autoTracking: {
    pageviewTemplate (route) {
      return {
        page: route.path,
        title: route.matched !== undefined ? route.matched[0].name : '',
        location: window.location.href
      }
    }
  }
})

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
const root = new Vue(Vue.util.extend({ router, store }, App))

document.addEventListener('DOMContentLoaded', () => {
  root.$mount('#app')
})
