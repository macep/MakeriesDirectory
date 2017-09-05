import Vue from 'vue'
import Router from 'vue-router'
import Config from '../api/app.config'

import Home from '@/components/static-pages/home'
import About from '@/components/static-pages/about'
import Directory from '@/components/directory/directory'
import DirectoryDisabled from '@/components/directory/directory-disabled'
import FilterBy from '@/components/directory/filter-by'
import FilterAZ from '@/components/directory/filter-az'
import Maker from '@/components/directory/maker-details'
import Journal from '@/components/journal/journal'
import JournalByCat from '@/components/journal/journal-by-cat'
import JournalByYear from '@/components/journal/journal-by-year'
import JournalSingle from '@/components/journal/journal-single'
import SignUp from '@/components/static-pages/sign-up'
import Weekender from '@/components/static-pages/weekender'
import PrivacyPolicy from '@/components/static-pages/privacy-policy'
import Disclaimer from '@/components/static-pages/disclaimer'
import Contact from '@/components/static-pages/contact'
import Register from '@/components/registration/register'
// import PageNotFound from '@/components/static-pages/page-not-found'

Vue.use(Router)

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: `${Config.routerSettings.about}`, name: 'About', component: About},
  {path: `${Config.routerSettings.directoryDisabled}`, name: 'DirectoryDisabled', component: DirectoryDisabled},
  {path: `${Config.routerSettings.directory}`, name: 'Directory', component: Directory},
  {path: `${Config.routerSettings.filterBy.region}:filter`, name: 'Regions', component: FilterBy},
  {path: `${Config.routerSettings.filterBy.products}:filter`, name: 'Products', component: FilterBy},
  {path: `${Config.routerSettings.filterBy.businessTypes}:filter`, name: 'BusinessTypes', component: FilterBy},
  {path: `${Config.routerSettings.filterBy.serviceTypes}:filter`, name: 'ServiceTypes', component: FilterBy},
  {path: `${Config.routerSettings.filterAZ}`, name: 'FilterAZ', component: FilterAZ},
  {path: `${Config.routerSettings.makerDetail}:id/:page`, name: 'Maker', component: Maker},
  {path: `${Config.routerSettings.journal}`, name: 'Journal', component: Journal},
  {path: `${Config.routerSettings.category}:id/:slug`, name: 'JournalByCat', component: JournalByCat},
  {path: `${Config.routerSettings.archive}:year`, name: 'JournalByYear', component: JournalByYear},
  {path: `${Config.routerSettings.journalSingle}:id/:post`, name: 'JournalSingle', component: JournalSingle},
  {path: `${Config.routerSettings.signUp}`, name: 'SignUp', component: SignUp},
  {path: `${Config.routerSettings.weekender}`, name: 'Weekender', component: Weekender},
  {path: `${Config.routerSettings.privacy}`, name: 'PrivacyPolicy', component: PrivacyPolicy},
  {path: `${Config.routerSettings.disclaimer}`, name: 'Disclaimer', component: Disclaimer},
  {path: `${Config.routerSettings.contact}`, name: 'Contact', component: Contact},
  {path: '/register', name: 'Register', component: Register}
  // {path: '*', name: 'PageNotFound', component: PageNotFound}
]

export default new Router({
  routes,
  mode: 'history',
  linkActiveClass: 'is-active',
  base: __dirname,
  scrollBehavior: () => ({y: 0})
})
