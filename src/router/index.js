import Vue from 'vue'
import Router from 'vue-router'
import Config from '../api/app.config'

import Directory from '@/components/directory/directory'
import FilterBy from '@/components/directory/filter-by'
import FilterAZ from '@/components/directory/filter-az'
import Maker from '@/components/directory/maker-details'
import Register from '@/components/registration/register'
import UserInformation from '@/components/registration/user-information'
import Login from '@/components/login/login'
import ResetPassword from '@/components/login/reset-password'
import ChangePassword from '@/components/login/change-password'
import Callback from '@/components/login/callback'
import PageNotFound from '@/components/static-pages/page-not-found'

Vue.use(Router)

const jgmExpiresAt = 'jgm_expires_at'
const jgmOriginOfDesiredRoute = 'jgm_origin_of_desired_route'
const jgmDesiredRoute = 'jgm_desired_route'

const routes = [
  {path: `${Config.routerSettings.directory}`, name: 'Directory', component: Directory},
  {path: `${Config.routerSettings.filterBy.region}:filter`, name: 'Regions', component: FilterBy},
  {path: `${Config.routerSettings.filterBy.products}:filter`, name: 'Products', component: FilterBy},
  {path: `${Config.routerSettings.filterBy.businessTypes}:filter`, name: 'BusinessTypes', component: FilterBy},
  {path: `${Config.routerSettings.filterBy.serviceTypes}:filter`, name: 'ServiceTypes', component: FilterBy},
  {path: `${Config.routerSettings.filterAZ}`, name: 'FilterAZ', component: FilterAZ},
  {
    path: `${Config.routerSettings.makerDetail}:id/:page`,
    name: 'Maker',
    component: Maker,
    beforeEnter: (to, from, next) => {
      const tokenExpired = new Date().getTime() >= JSON.parse(localStorage.getItem(jgmExpiresAt))
      if (tokenExpired) {
        localStorage.setItem(jgmDesiredRoute, to.fullPath)
        if (from.fullPath.split('/')[1] !== 'callback') {
          localStorage.setItem(jgmOriginOfDesiredRoute, from.fullPath)
        }
        next({ path: '/login' })
      } else {
        localStorage.setItem(jgmDesiredRoute, '')
        next()
      }
    }
  },
  {path: '/register', name: 'Register', component: Register},
  {
    path: '/user-information',
    name: 'UserInformation',
    component: UserInformation,
    beforeEnter: (to, from, next) => {
      const tokenExpired = new Date().getTime() >= JSON.parse(localStorage.getItem(jgmExpiresAt))
      if (tokenExpired) {
        next({ path: '/login' })
      } else {
        next()
      }
    }
  },
  {path: '/login', name: 'Login', component: Login},
  {path: '/reset-password', name: 'ResetPassword', component: ResetPassword},
  {path: '/change-password', name: 'ChangePassword', component: ChangePassword},
  {path: '/callback', name: 'Callback', component: Callback},
  {path: '*', name: 'PageNotFound', component: PageNotFound}
]

export default new Router({
  routes,
  mode: 'history',
  linkActiveClass: 'is-active',
  base: __dirname,
  scrollBehavior: () => ({y: 0})
})
