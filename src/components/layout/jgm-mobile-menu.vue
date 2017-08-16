<template>
  <nav id="mobile-menu" :class="{'open': mobileMenuVisibile}">
    <v-touch tag="i" @tap="toggleMobileMenuVisibility" :class="{'icon-dehaze': !mobileMenuVisibile, 'icon-close': mobileMenuVisibile}"/>

    <div id="mobile-menu-links">
      <v-touch @tap="closeMobileMenu" v-for="link in mainMenu" :key="link.id">
        <router-link class="mobile-nav-item" :to="link.url">{{link.title}}</router-link>
      </v-touch>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'jgm-menu',
    data () {
      return {
        mobileMenuVisibile: false
      }
    },
    computed: {
      ...mapGetters(['mainMenu'])
    },
    methods: {
      toggleMobileMenuVisibility () {
        this.mobileMenuVisibile = !this.mobileMenuVisibile
      },
      closeMobileMenu () {
        this.mobileMenuVisibile = false
      }
    }
  }
</script>
