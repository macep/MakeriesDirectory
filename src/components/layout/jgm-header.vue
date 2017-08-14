<template>
  <header>
    <router-link to="/">
      <img id="jgm-logo" :src="appLogo"/>
    </router-link>
  </header>
</template>

<script>
  import Config from '../../api/app.config'
  export default {
    name: 'jgm-header',
    computed: {
      appLogo () {
        return Config.appLogo
      }
    }
  }
</script>
