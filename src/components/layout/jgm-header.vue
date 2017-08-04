<template>
  <header>
    <router-link to="/">
      <img id="jgm-logo" :src="logo"/>
    </router-link>
  </header>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'jgm-header',
    data () {
      return {
        logo: '/static/images/logo.png',
        pages: []
      }
    },
    mounted () {
      console.log('translations', this.translations)
    },
    computed: {
      ...mapGetters(['translations'])
    }
  }
</script>
