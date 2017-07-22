<template>
  <nav id="app-header" class="nav has-shadow">
    <div class="container">
      <router-link to="/category/blog/" class="nav-item">
        Just Got MAde
      </router-link>
      <a class="nav-toggle" v-on:click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </a>
      <div v-bind:class="{ 'nav-right nav-menu': true, 'is-active': isMenuActive }">
        <span v-on:click="closeMenu">
          <router-link  class="is-tab nav-item" to="/category/blog/">Blog</router-link>
        </span>
        <span v-on:click="closeMenu">
          <router-link  class="is-tab nav-item" to="/page/about-bill/">About</router-link>
        </span>
      </div>
    </div>
  </nav>
</template>
<script>
// import { mapGetters, mapActions } from 'vuex'
/* const fetchInitialData = store => {
  return store.dispatch(`menu/getMenu`)
} */
export default {
  name: 'app-header',
  data: () => {
    return {
      isMenuActive: false,
      siteName: '',
      blogItems: []
    }
  },
  // prefetch: fetchInitialData,
  /* computed: {
    ...mapGetters('menu', {
      blogItems: 'menuItems'
    })
  }, */
  methods: {
    /* ...mapActions('menu', {
      getMenu: 'getMenu'
    }), */
    toggleMenu () {
      this.isMenuActive = !this.isMenuActive
    },
    closeMenu () {
      this.isMenuActive = false
    },
    relativePath (url) {
      url = url.replace('https://', '')
      var domain = url.split('/')[0]
      return url.replace(domain, '')
    }
  },
  mounted () {
    // fetchInitialData(this.$store)
  }
}
</script>
<style>
  #vwp-logo{
     max-width:350px;
     max-height:3rem;
  }
  #app-header .nav-menu > span > a{
    line-height: 3rem;
    vertical-align: middle;
  }
  .nav-toggle{
    position:absolute;
    right:0;
  }
</style>
