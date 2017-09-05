<template>
  <header>
    <jgm-logo/>
    <!--<button class="btn btn-primary pull-right" v-if="!authenticated" @click="login()"> Log In </button>-->
    <!--<button class="btn btn-primary pull-right" v-if="authenticated" @click="logout()"> Log Out</button>-->
  </header>
</template>

<script>
  import jgmLogo from '../common/jgm-logo.vue'

  export default {
    name: 'jgm-header',
//    props: ['auth', 'authenticated'],
    components: {jgmLogo}
  }
</script>
