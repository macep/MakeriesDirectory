import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/static-pages/home'
import About from '@/components/static-pages/about'
import Directory from '@/components/directory/directory'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/directory',
    name: 'Directory',
    component: Directory
  }
]

export default new Router({
  routes,
  mode: 'history',
  linkActiveClass: 'is-active',
  base: __dirname,
  scrollBehavior: () => ({y: 0})
})
