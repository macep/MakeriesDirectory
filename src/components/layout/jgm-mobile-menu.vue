<template>
  <nav id="mobile-menu" :class="{'open': mobileMenuVisibile}">
    <jgm-logo/>
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

  export default {
    name: 'jgm-menu',
    components: {jgmLogo},
    computed: {
      ...mapGetters(['mainMenu', 'mobileMenuVisibile']),
      appLogo () {
        return Config.appLogo
      }
    },
    methods: {
      closeMobileMenu () {
        this.$store.commit('mutateMobileMenuVisibile', false)
      }
    }
  }
</script>
