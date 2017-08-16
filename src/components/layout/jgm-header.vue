<template>
  <header>
    <router-link to="/">
      <img id="jgm-logo" :src="appLogo"/>
    </router-link>
    <jgm-mobile-menu v-if="isMobile"/>
  </header>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import jgmMobileMenu from '../layout/jgm-mobile-menu.vue'

  export default {
    name: 'jgm-header',
    components: {jgmMobileMenu},
    computed: {
      ...mapGetters(['isMobile']),
      appLogo () {
        return Config.appLogo
      }
    }
  }
</script>
