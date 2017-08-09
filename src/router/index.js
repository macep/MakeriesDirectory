import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/static-pages/home'
import About from '@/components/static-pages/about'
import Directory from '@/components/directory/directory'
import Journal from '@/components/journal/journal'
import JournalByCat from '@/components/journal/journal-by-cat'
import JournalSingle from '@/components/journal/journal-single'
import SignUp from '@/components/static-pages/sign-up'
import Weekender from '@/components/static-pages/weekender'
import PrivacyPolicy from '@/components/static-pages/privacy-policy'
import Disclaimer from '@/components/static-pages/disclaimer'
import Contact from '@/components/static-pages/contact'

Vue.use(Router)

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/about', name: 'About', component: About},
  {path: '/directory', name: 'Directory', component: Directory},
  {path: '/journal', name: 'Journal', component: Journal},
  {path: '/journal/category/:id/:slug', name: 'JournalByCat', component: JournalByCat},
  {path: '/journal/:id/:post', name: 'JournalSingle', component: JournalSingle},
  {path: '/sign-up', name: 'SignUp', component: SignUp},
  {path: '/justgotmade-weekender', name: 'Weekender', component: Weekender},
  {path: '/privacy-policy', name: 'PrivacyPolicy', component: PrivacyPolicy},
  {path: '/disclaimer', name: 'Disclaimer', component: Disclaimer},
  {path: '/contact', name: 'Contact', component: Contact}
]

export default new Router({
  routes,
  mode: 'history',
  linkActiveClass: 'is-active',
  base: __dirname,
  scrollBehavior: () => ({y: 0})
})
