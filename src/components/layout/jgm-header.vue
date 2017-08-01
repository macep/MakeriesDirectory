<template>
  <header>
    <img id="jgm-logo" :src="logo"/>
  </header>
</template>

<script>
  export default {
    name: 'jgm-header',
    data () {
      return {
        logo: './static/images/logo.png'
      }
    }
  }
</script>
