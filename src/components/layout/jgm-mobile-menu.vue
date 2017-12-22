<template>
  <nav id="mobile-menu" :class="{'open': mobileMenuVisibile}">
    <div class="fixed-logo">
      <jgm-logo/>
    </div>
    <div id="mobile-directory-menu-links" v-if="isDirectoryLocation">
      <makeries-menu/>
      <hr>
    </div>
    <div id="mobile-journal-menu-links" v-if="isJournalLocation">
      <blog-menu :one-at-a-time="true" :acc-data="categories"/>
      <hr>
    </div>
    <div id="mobile-menu-links">
      <v-touch @tap="closeMobileMenu" v-for="(link, index) in mainMenu" :key="link.id" v-if="index > 0">
        <router-link class="mobile-nav-item" :to="link.url">{{link.title}}</router-link>
      </v-touch>
      <v-touch @tap="closeAndSignOut" v-if="authenticated">
        <a class="mobile-nav-item auth-nav-item logged-in" href="#" @click.prevent="auth.logout">logout</a>
      </v-touch>
      <span class="nav-item auth-nav-item" v-if="!authenticated">
        <router-link class="logged-out" to="/login">login</router-link>
        <small><router-link to="/register">or register</router-link></small>
      </span>
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
      let mobileMenu = document.querySelector('#mobile-menu')
      mobileMenu.addEventListener('scroll', () => {
        if (this.$el.scrollTop > 20) {
          mobileMenu.classList.add('shadowed')
        } else {
          mobileMenu.classList.remove('shadowed')
        }
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
      closeMobileMenu () {
        this.$store.commit('mutateMobileMenuVisibile', false)
      },
      closeAndSignOut () {
        this.closeMobileMenu()
        this.logout()
      }
    }
  }
</script>
