// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/sass/jgm.sass'
import Vue from 'vue'
import VueTouch from 'vue-touch'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store/index'
import Meta from 'vue-meta'

Vue.use(Meta)
Vue.use(VueTouch)

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue(Vue.util.extend({
  el: '#app',
  router,
  store
}, App))
