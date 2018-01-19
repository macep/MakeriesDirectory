<template>
  <nav id="mobile-menu" ref="mobileMenu" :class="{'open': mobileMenuVisibile}">
    <div class="fixed-logo">
      <jgm-logo/>
    </div>

    <div id="mobile-directory-menu-links" v-if="isDirectoryLocation">
      <makeries-menu/><br>
    </div>

    <div id="mobile-journal-menu-links" v-if="isJournalLocation">
      <blog-menu :one-at-a-time="true" :acc-data="categories"/><br>
    </div>

    <div id="mobile-menu-links">
      <v-touch @tap="closeMobileMenuAndGotoRoute(link.url)" v-for="(link, index) in mainMenu" :key="link.id" v-if="index > 0">
        <div class="mobile-nav-item">{{link.title}}</div>
      </v-touch>

      <v-touch @tap="closeAndSignOut" v-if="authenticated">
        <div class="mobile-nav-item auth-nav-item logged-in">logout</div>
      </v-touch>

      <v-touch @tap="closeMobileMenuAndGotoRoute('/login')" v-if="!authenticated">
        <div class="mobile-nav-item auth-nav-item login">Login</div>
      </v-touch>

      <v-touch @tap="closeMobileMenuAndGotoRoute('/register')" v-if="!authenticated">
        <small>or</small>
        <div class="mobile-nav-item auth-nav-item register">register</div>
      </v-touch>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import jgmLogo from '../common/jgm-logo.vue'
  import makeriesMenu from '../directory/directory-menu.vue'
  import blogMenu from '../common/blog-menu.vue'

  export default {
    name: 'jgm-menu',
    props: ['auth', 'authenticated'],
    components: {jgmLogo, makeriesMenu, blogMenu},
    mounted () {
      let mobileMenu = this.$refs.mobileMenu
      mobileMenu.addEventListener('scroll', () => {
        mobileMenu.classList[(this.$el.scrollTop > 20) ? 'add' : 'remove']('shadowed')
      })
    },
    computed: {
      ...mapGetters(['mainMenu', 'mobileMenuVisibile', 'route', 'categories']),
      appLogo () {
        return Config.appLogo
      },
      isDirectoryLocation () {
        let directoryLocations = ['Directory', 'FilterBy', 'FilterAZ', 'Maker']
        return directoryLocations.indexOf(this.route.name) !== -1
      },
      isJournalLocation () {
        let journalLocation = ['Journal', 'JournalByCat', 'JournalByYear', 'JournalSingle']
        return journalLocation.indexOf(this.route.name) !== -1
      }
    },
    methods: {
      closeMobileMenuAndGotoRoute (url) {
        this.$store.commit('mutateMobileMenuVisibile', false)
        this.$router.push(url)
      },
      closeAndSignOut () {
        this.auth.logout()
        this.closeMobileMenuAndGotoRoute()
      }
    }
  }
</script>
