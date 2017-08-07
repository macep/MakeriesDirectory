<template>
  <header>
    <router-link to="/">
      <img id="jgm-logo" :src="logo"/>
    </router-link>
  </header>
</template>

<script>
  export default {
    name: 'jgm-header',
    data () {
      return {
        logo: '/static/images/logo.png'
      }
    }
  }
</script>
