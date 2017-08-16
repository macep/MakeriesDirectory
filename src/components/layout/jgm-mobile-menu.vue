<template>
  <nav id="mobile-menu" :class="{'open': mobileMenuVisibile}">
    <div class="fixed-logo">
      <jgm-logo/>
    </div>
    <div id="mobile-directory-menu-links" v-if="isDirectoryLocation">
      <makeries-menu/>
      <hr>
    </div>
    <div id="mobile-menu-links">
      <v-touch @tap="closeMobileMenu" v-for="(link, index) in mainMenu" :key="link.id" v-if="index > 0">
        <router-link  class="mobile-nav-item" :to="link.url">{{link.title}}</router-link>
      </v-touch>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import jgmLogo from '../common/jgm-logo.vue'
  import makeriesMenu from '../directory/menu.vue'

  export default {
    name: 'jgm-menu',
    components: {jgmLogo, makeriesMenu},
    computed: {
      ...mapGetters(['mainMenu', 'mobileMenuVisibile', 'route']),
      appLogo () {
        return Config.appLogo
      },
      isDirectoryLocation () {
        let directoryLocations = ['Directory', 'FilterBy', 'FilterAZ', 'Maker']
        return directoryLocations.indexOf(this.route.name) !== -1
      }
    },
    methods: {
      closeMobileMenu () {
        this.$store.commit('mutateMobileMenuVisibile', false)
      }
    }
  }
</script>
