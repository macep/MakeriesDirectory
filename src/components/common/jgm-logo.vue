<template>
  <router-link to="/">
    <v-touch tag="img" @tap="closeMobileMenu" class="jgm-logo" :src="appLogo"/>
  </router-link>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'

  export default {
    name: 'image-overlayed',
    data () {
      return {
        appLogo: Config.appLogo
      }
    },
    computed: {
      ...mapGetters(['isMobile', 'mobileMenuVisibile'])
    },
    methods: {
      closeMobileMenu () {
        if (this.isMobile && this.mobileMenuVisibile) {
          this.$store.commit('mutateMobileMenuVisibile', false)
        }
      }
    }
  }
</script>


